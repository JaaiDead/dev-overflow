import { motion } from "framer-motion";
import { EXPERIENCE } from "../data";

export default function Experience() {
  return (
    <section
      id="experience"
      className="content-gutter section-space relative"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2
            id="experience-title"
            className="font-display text-4xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary md:text-5xl"
          >
            From learning to contributing
          </h2>
          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-text-dim dark:text-dark-text-dim">
            A short timeline of how Minecraft modding became a way to learn, publish, and contribute
            back.
          </p>
        </motion.div>

        <div className="relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-transparent dark:from-dark-primary dark:via-dark-secondary" />

          <div className="space-y-10">
            {EXPERIENCE.map((entry, i) => (
              <motion.div
                key={entry.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative"
              >
                <span className="absolute -left-8 top-1.5 flex h-3.5 w-3.5 items-center justify-center">
                  <span className="absolute h-3.5 w-3.5 animate-pulse-glow rounded-full bg-primary/50 dark:bg-dark-primary/50" />
                  <span className="relative h-2 w-2 rounded-full bg-primary shadow-glow-primary dark:bg-dark-primary" />
                </span>

                <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-primary dark:text-dark-primary">
                  {entry.period}
                </p>
                <h3 className="mb-1.5 font-display text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                  {entry.title}
                </h3>
                <p className="max-w-xl font-body text-sm leading-relaxed text-text-dim dark:text-dark-text-dim">
                  {entry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
