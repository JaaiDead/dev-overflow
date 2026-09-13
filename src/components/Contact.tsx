import { motion } from "framer-motion";
import { Github, Mail, MessageCircle, Package, Swords } from "lucide-react";
import { CONNECT } from "../data";

const iconMap: Record<string, typeof Github> = {
  GitHub: Github,
  Email: Mail,
  Discord: MessageCircle,
  Modrinth: Package,
  CurseForge: Swords,
};

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary dark:text-dark-primary">
            // contact
          </p>
          <h2 className="mb-3 font-display text-4xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary md:text-5xl">
            Let's talk
          </h2>
          <p className="mb-10 font-mono text-sm text-text-dim dark:text-dark-text-dim">
            Got a project, a collab, or just want to say hi?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-3xl p-6 md:p-8"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {CONNECT.map((c, i) => {
              const Icon = iconMap[c.label] ?? Mail;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-surface-2/50 p-4 text-left transition-colors hover:border-primary/50 hover:shadow-glow-primary dark:border-dark-border dark:bg-dark-surface-2/50 dark:hover:border-dark-primary/50"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary">
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-text-muted dark:text-dark-text-muted">
                      {c.label}
                    </span>
                    <span
                      className={`block font-mono text-sm text-text-primary dark:text-dark-text-primary ${
                        c.label === "Email" ? "break-all sm:text-sm" : "truncate"
                      }`}
                    >
                      {c.value}
                    </span>
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
