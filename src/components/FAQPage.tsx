import { useEffect } from "react";
import { useProfile } from "../contexts/ProfileContext";
import { PERSONAL_FAQ, STUDIO_FAQ } from "./FAQ";
import FAQ from "./FAQ";

export default function FAQPage() {
  const { profile } = useProfile();

  useEffect(() => {
    const questions = profile === "business" ? STUDIO_FAQ : PERSONAL_FAQ;
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://arcticquests.dev/faq/#faq",
      mainEntity: questions.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    document.title =
      profile === "business"
        ? "FAQ · ArcticQuests Game Dev Studio"
        : "FAQ · Jaai Developer & Modder";

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://arcticquests.dev/faq/";

    let script = document.getElementById("faq-structured-data");
    if (!script) {
      script = document.createElement("script");
      script.id = "faq-structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      script?.remove();
    };
  }, [profile]);

  return (
    <div className="min-h-screen bg-bg text-text-primary transition-colors duration-300 dark:bg-dark-bg dark:text-dark-text-primary">
      <header className="content-gutter mx-auto flex max-w-5xl items-center justify-between pt-6">
        <a
          href="/"
          className="font-mono text-xs text-text-dim transition-colors hover:text-primary dark:text-dark-text-dim dark:hover:text-dark-primary"
        >
          ← back to site
        </a>
        <span className="font-mono text-xs uppercase tracking-widest text-text-muted dark:text-dark-text-muted">
          FAQ
        </span>
      </header>
      <main>
        <FAQ />
      </main>
    </div>
  );
}
