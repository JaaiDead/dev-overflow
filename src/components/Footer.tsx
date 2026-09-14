import { motion } from "framer-motion";
import { GMAIL_COMPOSE_URL } from "../data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-display text-xs font-bold text-white shadow-glow-primary dark:from-dark-primary dark:to-dark-secondary dark:text-dark-bg"
        >
          J
        </motion.div>

        <p className="font-mono text-xs text-text-dim dark:text-dark-text-dim">
          © {year} Jaai. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          <a
            href="/faq/"
            className="font-mono text-xs text-text-dim transition-colors hover:text-primary dark:text-dark-text-dim dark:hover:text-dark-primary"
          >
            faq
          </a>
          {[
            { label: "github", href: "https://github.com/JaaiDead" },
            { label: "modrinth", href: "https://modrinth.com/user/JaaiDead" },
            { label: "curseforge", href: "https://www.curseforge.com/members/jaaidead/projects" },
            { label: "email", href: GMAIL_COMPOSE_URL },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-dim transition-colors hover:text-primary dark:text-dark-text-dim dark:hover:text-dark-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/privacy/"
            className="font-mono text-xs text-text-dim transition-colors hover:text-primary dark:text-dark-text-dim dark:hover:text-dark-primary"
          >
            privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
