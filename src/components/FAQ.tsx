import { useProfile } from "../contexts/ProfileContext";

export const PERSONAL_FAQ = [
  {
    question: "What does Jaai build?",
    answer:
      "Jaai builds Minecraft mods, web applications, developer tools, and open-source projects using Java, Fabric, TypeScript, React, and Python.",
  },
  {
    question: "Where can I find Jaai's Minecraft projects?",
    answer:
      "Published projects are available through the Modrinth and CurseForge profiles linked on this site. Source code and documentation are available on GitHub when the project is open source.",
  },
  {
    question: "Is Jaai available for collaborations?",
    answer:
      "Yes. For collaborations, custom work, or open-source discussions, use the contact links below to reach Jaai by email or Discord.",
  },
];

export const STUDIO_FAQ = [
  {
    question: "What does ArcticQuests offer?",
    answer:
      "ArcticQuests creates custom Minecraft mods, modern web applications, and open-source solutions for communities, creators, and game projects.",
  },
  {
    question: "Can ArcticQuests build a custom Minecraft mod?",
    answer:
      "Yes. ArcticQuests can discuss custom Fabric or Forge mod requirements, gameplay mechanics, integrations, and technical constraints for a project.",
  },
  {
    question: "How do I start a project with ArcticQuests?",
    answer:
      "Send a short description of your project, the intended platform, and your goals through the contact section. ArcticQuests will use those details to start the conversation.",
  },
];

export default function FAQ() {
  const { profile } = useProfile();
  const questions = profile === "business" ? STUDIO_FAQ : PERSONAL_FAQ;

  return (
    <section id="faq" className="relative px-6 py-16" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-primary dark:text-dark-primary">
          // faq
        </p>
        <h2
          id="faq-title"
          className="mb-3 text-center font-display text-4xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary md:text-5xl"
        >
          Common questions
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center font-mono text-sm text-text-dim dark:text-dark-text-dim">
          A quick guide to the work, projects, and ways to collaborate.
        </p>

        <div className="space-y-3">
          {questions.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group rounded-2xl border border-border bg-surface-2/40 px-5 transition-colors open:border-primary/40 dark:border-dark-border dark:bg-dark-surface-2/40 dark:open:border-dark-primary/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-base font-semibold text-text-primary outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-primary dark:text-dark-text-primary dark:focus-visible:ring-dark-primary [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-2xl font-light text-primary transition-transform duration-300 group-open:rotate-45 dark:text-dark-primary"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-5 pr-8 font-mono text-sm leading-relaxed text-text-dim dark:text-dark-text-dim">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
