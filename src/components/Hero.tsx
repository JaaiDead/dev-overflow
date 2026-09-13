import { motion } from "framer-motion";
import { ArrowDown, Github, Mail } from "lucide-react";
import { TAGLINE } from "../data";
import { useProfile } from "../contexts/ProfileContext";
import { cn } from "../lib/utils";
import AuroraBackground from "./AuroraBackground";
import ParticleField from "./ParticleField";
import Button, { buttonVariants } from "./ui/Button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const { profile } = useProfile();
  const isPersonal = profile === "personal";

  return (
    <section
      id="home"
      className="relative flex min-h-0 items-center justify-center overflow-hidden px-6 py-32 md:py-40"
    >
      <AuroraBackground />
      <div className="grid-bg absolute inset-0 animate-grid-pan opacity-60" />
      <ParticleField className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg dark:to-dark-bg" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.div
          variants={item}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-text-dim dark:text-dark-text-dim"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow-primary dark:bg-dark-primary" />
          {isPersonal ? "open to opportunities" : "available for new projects"}
        </motion.div>

        <motion.h1
          variants={item}
          className="gradient-text animate-gradient-x font-display text-[clamp(56px,12vw,120px)] font-extrabold leading-[0.95] tracking-tight"
        >
          {isPersonal ? "Jaai" : "ArcticQuests"}
        </motion.h1>

        {isPersonal && (
          <motion.img
            variants={item}
            src="https://github.com/JaaiDead.png?size=256"
            alt="Jaai's GitHub profile"
            className="mx-auto mt-5 h-16 w-16 rounded-full border-2 border-primary/40 object-cover shadow-glow-primary dark:border-dark-primary/40"
            width="64"
            height="64"
          />
        )}

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl font-mono text-sm text-text-dim dark:text-dark-text-dim md:text-base"
        >
          {isPersonal ? TAGLINE.personal : TAGLINE.business}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            variant="primary"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Projects
          </Button>
          <a
            href="https://github.com/JaaiDead"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Github size={15} /> GitHub
          </a>
          <Button
            variant="ghost"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Mail size={15} /> Contact
          </Button>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-text-muted transition-colors hover:text-primary dark:text-dark-text-muted dark:hover:text-dark-primary"
        aria-label="Scroll to projects"
      >
        <ArrowDown size={18} />
      </motion.button>
    </section>
  );
}
