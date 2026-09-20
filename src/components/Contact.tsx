import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Github, Mail, MessageCircle, Package, Swords } from "lucide-react";
import { CONNECT, createGmailComposeUrl } from "../data";
import { usePrefersReducedMotion } from "../hooks";

const iconMap: Record<string, typeof Github> = {
  GitHub: Github,
  Email: Mail,
  Discord: MessageCircle,
  Modrinth: Package,
  CurseForge: Swords,
};

type InquiryType = "New project" | "Collaboration" | "Mod or support request" | "General question";
type FormState = "idle" | "submitting" | "success" | "error";

interface Inquiry {
  type: InquiryType;
  name: string;
  email: string;
  details: string;
  budget: string;
}

const initialInquiry: Inquiry = {
  type: "New project",
  name: "",
  email: "",
  details: "",
  budget: "",
};

const inputClass =
  "mt-2 min-h-11 w-full rounded-xl border border-border bg-bg/70 px-4 py-3 font-body text-base text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-primary dark:border-dark-border dark:bg-dark-bg/70 dark:text-dark-text-primary dark:placeholder:text-dark-text-muted dark:focus:border-dark-primary";

export default function Contact() {
  const reducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(1);
  const [inquiry, setInquiry] = useState<Inquiry>(initialInquiry);
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const transition = reducedMotion
    ? { duration: 0.01 }
    : { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const };

  const canReview = useMemo(
    () =>
      inquiry.name.trim().length > 1 &&
      /\S+@\S+\.\S+/.test(inquiry.email) &&
      inquiry.details.trim().length > 9,
    [inquiry],
  );

  const update = (field: keyof Inquiry, value: string) => {
    setInquiry((current) => ({ ...current, [field]: value }));
    setError("");
    setFormState("idle");
  };

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canReview) {
      setError(
        "Add your name, a valid email, and at least a few project details before continuing.",
      );
      setStep(2);
      return;
    }

    setFormState("submitting");
    window.setTimeout(
      () => {
        const subject = `${inquiry.type} from ${inquiry.name}`;
        const body = `Hi Jaai,\n\nInquiry type: ${inquiry.type}\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nBudget: ${inquiry.budget || "Not specified"}\n\nDetails:\n${inquiry.details}\n\nThanks!`;
        const draftWindow = window.open(
          createGmailComposeUrl(subject, body),
          "_blank",
          "noopener,noreferrer",
        );
        if (!draftWindow) {
          setFormState("error");
          setError(
            "Your browser blocked the email draft. Allow pop-ups or use the Email link below to continue.",
          );
          return;
        }
        setFormState("success");
      },
      reducedMotion ? 10 : 180,
    );
  };

  const reset = () => {
    setInquiry(initialInquiry);
    setStep(1);
    setFormState("idle");
    setError("");
  };

  return (
    <section id="contact" className="content-gutter section-space relative">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
          className="mb-10 text-center"
        >
          <h2 className="mb-3 font-display text-4xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary md:text-5xl">
            Let&apos;s talk
          </h2>
          <p className="mx-auto max-w-xl font-mono text-sm text-text-dim dark:text-dark-text-dim">
            Tell me what you&apos;re building. No payment or commitment required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...transition, delay: reducedMotion ? 0 : 0.05 }}
          className="rounded-3xl border border-border bg-surface-2/70 p-5 shadow-sm dark:border-dark-border dark:bg-dark-surface-2/70 md:p-8"
        >
          <div
            className="mb-7 flex items-center justify-between gap-4"
            aria-label={`Inquiry step ${step} of 3`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-text-primary dark:text-dark-text-primary">
              {[1, 2, 3].map((item) => (
                <span
                  key={item}
                  aria-current={item === step ? "step" : undefined}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-full border px-2 ${item === step ? "border-primary bg-primary text-white dark:border-dark-primary dark:bg-dark-primary dark:text-dark-bg" : item < step ? "border-primary/40 text-primary dark:border-dark-primary/40 dark:text-dark-primary" : "border-border text-text-muted dark:border-dark-border dark:text-dark-text-muted"}`}
                >
                  {item}
                </span>
              ))}
            </div>
            <span className="font-mono text-xs text-text-muted dark:text-dark-text-muted">
              {step === 1
                ? "What can I help with?"
                : step === 2
                  ? "Tell me about it"
                  : "Review and send"}
            </span>
          </div>

          {formState === "error" && error && (
            <p
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200"
              role="alert"
            >
              {error}
            </p>
          )}

          {formState === "success" ? (
            <div className="py-8 text-center" role="status">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary">
                <CheckCircle2 size={24} aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-display text-2xl font-semibold text-text-primary dark:text-dark-text-primary">
                Your email draft is ready
              </h3>
              <p className="mx-auto mb-6 max-w-md font-body text-sm leading-relaxed text-text-dim dark:text-dark-text-dim">
                Your details were added to a message draft. Review it, add anything missing, and
                send when you&apos;re ready.
              </p>
              <button
                type="button"
                onClick={reset}
                className="min-h-11 rounded-full border border-border px-5 py-3 font-mono text-xs text-text-primary transition-colors hover:border-primary hover:text-primary dark:border-dark-border dark:text-dark-text-primary dark:hover:border-dark-primary dark:hover:text-dark-primary"
              >
                Start another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submitInquiry} noValidate>
              {step === 1 && (
                <fieldset>
                  <legend className="mb-4 font-display text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                    What are you looking to do?
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(
                      [
                        "New project",
                        "Collaboration",
                        "Mod or support request",
                        "General question",
                      ] as InquiryType[]
                    ).map((type) => (
                      <label
                        key={type}
                        className={`flex min-h-14 cursor-pointer items-center rounded-2xl border px-4 py-3 font-body text-sm transition-colors ${inquiry.type === type ? "border-primary bg-primary/10 text-primary dark:border-dark-primary dark:bg-dark-primary/10 dark:text-dark-primary" : "border-border text-text-dim hover:border-primary/50 dark:border-dark-border dark:text-dark-text-dim dark:hover:border-dark-primary/50"}`}
                      >
                        <input
                          type="radio"
                          name="inquiry-type"
                          value={type}
                          checked={inquiry.type === type}
                          onChange={() => update("type", type)}
                          className="sr-only"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-6 min-h-11 w-full rounded-full bg-primary px-6 py-3 font-mono text-sm font-medium text-white transition-colors hover:brightness-110 dark:bg-dark-primary dark:text-dark-bg"
                  >
                    Continue
                  </button>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset>
                  <legend className="mb-4 font-display text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                    A little context goes a long way
                  </legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="font-mono text-xs text-text-dim dark:text-dark-text-dim">
                      Name
                      <input
                        required
                        value={inquiry.name}
                        onChange={(event) => update("name", event.target.value)}
                        className={inputClass}
                        autoComplete="name"
                      />
                    </label>
                    <label className="font-mono text-xs text-text-dim dark:text-dark-text-dim">
                      Email
                      <input
                        required
                        type="email"
                        value={inquiry.email}
                        onChange={(event) => update("email", event.target.value)}
                        className={inputClass}
                        autoComplete="email"
                      />
                    </label>
                  </div>
                  <label className="mt-4 block font-mono text-xs text-text-dim dark:text-dark-text-dim">
                    Project details
                    <textarea
                      required
                      minLength={10}
                      value={inquiry.details}
                      onChange={(event) => update("details", event.target.value)}
                      className={`${inputClass} min-h-32 resize-y`}
                      placeholder="What are you building, and what would you like help with?"
                    />
                  </label>
                  <label className="mt-4 block font-mono text-xs text-text-dim dark:text-dark-text-dim">
                    Budget or timeline{" "}
                    <span className="text-text-muted dark:text-dark-text-muted">(optional)</span>
                    <input
                      value={inquiry.budget}
                      onChange={(event) => update("budget", event.target.value)}
                      className={inputClass}
                      placeholder="Anything useful to know"
                    />
                  </label>
                  {error && (
                    <p className="mt-3 text-sm text-red-700 dark:text-red-300" role="alert">
                      {error}
                    </p>
                  )}
                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="min-h-11 rounded-full border border-border px-5 py-3 font-mono text-xs text-text-primary transition-colors hover:border-primary hover:text-primary dark:border-dark-border dark:text-dark-text-primary dark:hover:border-dark-primary dark:hover:text-dark-primary"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        canReview
                          ? setStep(3)
                          : setError(
                              "Add your name, a valid email, and at least a few project details before continuing.",
                            )
                      }
                      className="min-h-11 rounded-full bg-primary px-6 py-3 font-mono text-sm font-medium text-white transition-colors hover:brightness-110 dark:bg-dark-primary dark:text-dark-bg"
                    >
                      Review inquiry
                    </button>
                  </div>
                </fieldset>
              )}

              {step === 3 && (
                <fieldset>
                  <legend className="mb-4 font-display text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                    Ready to send?
                  </legend>
                  <dl className="space-y-3 rounded-2xl border border-border bg-bg/50 p-4 text-sm dark:border-dark-border dark:bg-dark-bg/50">
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-muted dark:text-dark-text-muted">Type</dt>
                      <dd className="text-right text-text-primary dark:text-dark-text-primary">
                        {inquiry.type}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-muted dark:text-dark-text-muted">From</dt>
                      <dd className="break-all text-right text-text-primary dark:text-dark-text-primary">
                        {inquiry.name} · {inquiry.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-text-muted dark:text-dark-text-muted">Details</dt>
                      <dd className="whitespace-pre-wrap break-words text-text-primary dark:text-dark-text-primary">
                        {inquiry.details}
                      </dd>
                    </div>
                  </dl>
                  {error && (
                    <p className="mt-3 text-sm text-red-700 dark:text-red-300" role="alert">
                      {error}
                    </p>
                  )}
                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="min-h-11 rounded-full border border-border px-5 py-3 font-mono text-xs text-text-primary transition-colors hover:border-primary hover:text-primary dark:border-dark-border dark:text-dark-text-primary dark:hover:border-dark-primary dark:hover:text-dark-primary"
                    >
                      Edit details
                    </button>
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="min-h-11 rounded-full bg-primary px-6 py-3 font-mono text-sm font-medium text-white transition-colors hover:brightness-110 disabled:cursor-wait disabled:opacity-60 dark:bg-dark-primary dark:text-dark-bg"
                    >
                      {formState === "submitting" ? "Opening draft…" : "Open email draft"}
                    </button>
                  </div>
                </fieldset>
              )}
            </form>
          )}
        </motion.div>

        <details className="mt-8 border-t border-border pt-5 dark:border-dark-border">
          <summary className="cursor-pointer list-none text-center font-mono text-xs text-text-muted transition-colors hover:text-primary dark:text-dark-text-muted dark:hover:text-dark-primary">
            Prefer a direct contact?
          </summary>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {CONNECT.filter(
              (contact) => contact.label === "Email" || contact.label === "Discord",
            ).map((c) => {
              const Icon = iconMap[c.label] ?? Mail;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-14 items-center gap-3 rounded-2xl border border-border bg-surface-2/40 p-4 text-left transition-colors hover:border-primary/50 dark:border-dark-border dark:bg-dark-surface-2/40 dark:hover:border-dark-primary/50"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary">
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-widest text-text-muted dark:text-dark-text-muted">
                      {c.label}
                    </span>
                    <span
                      className={`block font-mono text-sm text-text-primary dark:text-dark-text-primary ${c.label === "Email" ? "break-all" : "truncate"}`}
                    >
                      {c.value}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </details>
      </div>
    </section>
  );
}
