import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_CATEGORIES, SKILLS_BY_CATEGORY, type SkillCategory } from "../data";

export default function Skills() {
  const [category, setCategory] = useState<SkillCategory>(SKILL_CATEGORIES[0]);
  const skills = SKILLS_BY_CATEGORY[category];

  return (
    <section id="skills" className="content-gutter section-space relative">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary md:text-5xl">
            The current toolkit
          </h2>
          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-text-dim dark:text-dark-text-dim">
            Languages, frameworks, and tools that show up in the mods, sites, and open-source work
            above.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap gap-2">
          {SKILL_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
                category === c
                  ? "border-primary/50 bg-primary/10 text-primary dark:border-dark-primary/50 dark:bg-dark-primary/10 dark:text-dark-primary"
                  : "border-border text-text-dim hover:text-text-primary dark:border-dark-border dark:text-dark-text-dim dark:hover:text-dark-text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass rounded-xl p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-sm text-text-primary dark:text-dark-text-primary">
                    {s.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted dark:text-dark-text-muted">
                    working stack
                    <span className="sr-only">, self-assessed proficiency {s.level}%</span>
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-2 dark:bg-dark-surface-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent dark:from-dark-primary dark:to-dark-accent"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
