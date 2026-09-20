import { motion } from "framer-motion";
import { ArrowDown, Github, Mail, Package } from "lucide-react";
import { MODRINTH_USERNAME, STATS, TAGLINE } from "../data";
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
      className="content-gutter relative flex min-h-0 items-center justify-center overflow-hidden py-[clamp(7rem,16vw,10rem)]"
    >
      <AuroraBackground />
      <ParticleField className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg dark:to-dark-bg" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.h1
          variants={item}
          className="font-display text-[clamp(56px,12vw,120px)] font-extrabold leading-[0.95] tracking-tight text-text-primary dark:text-dark-text-primary"
        >
          {isPersonal ? "Jaai" : "ArcticQuests"}
        </motion.h1>

        {isPersonal && (
          <motion.img
            variants={item}
            src="/images/jaai-github.png"
            alt="Jaai's GitHub profile"
            className="mx-auto mt-5 h-16 w-16 rounded-full border-2 border-primary/40 object-cover shadow-glow-primary dark:border-dark-primary/40"
            width="64"
            height="64"
          />
        )}

        <motion.p
          variants={item}
          className="mt-5 font-display text-2xl font-semibold tracking-tight text-text-primary dark:text-dark-text-primary md:text-3xl"
        >
          {TAGLINE[isPersonal ? "personal" : "business"]}
        </motion.p>

        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-text-dim dark:text-dark-text-dim md:text-lg"
        >
          {isPersonal
            ? "Building Minecraft mods, software, open-source projects, and experiments—then sharing the useful parts."
            : "Custom Minecraft mods, web applications, and open-source solutions for ambitious projects."}
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
          {isPersonal && (
            <a
              href={`https://modrinth.com/user/${MODRINTH_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <Package size={15} /> Modrinth
            </a>
          )}
        </motion.div>

        {isPersonal && (
          <motion.div
            variants={item}
            className="mx-auto mt-12 grid max-w-xl grid-cols-3 divide-x divide-border/80 border-y border-border/80 py-5 dark:divide-dark-border/80 dark:border-dark-border/80"
            aria-label="Portfolio highlights"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="px-3 text-center">
                <p className="font-display text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase leading-relaxed tracking-wider text-text-muted dark:text-dark-text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}
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
