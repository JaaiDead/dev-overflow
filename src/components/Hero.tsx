import { ArrowDown } from "lucide-react";
import { ROLES, BUSINESS_ROLES } from "../data";
import { useProfile } from "../contexts/ProfileContext";
import InteractiveTerminal from "./InteractiveTerminal";

export default function Hero() {
  const { profile } = useProfile();
  const isPersonal = profile === "personal";
  const role = isPersonal ? ROLES[0] : BUSINESS_ROLES[0]; // Just display first role statically

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,163,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,255,163,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow centre */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.04)_0%,transparent_65%)]" />

      {/* Corner accents - curved */}
      <div className="absolute top-20 left-8">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-accent/50">
          <path d="M 0 100 Q 0 0 100 0" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-8">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-accent/50">
          <path d="M 100 0 Q 100 100 0 100" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Floating decorative code */}
      <pre className="absolute top-32 right-12 hidden xl:block font-mono text-[10px] text-white/[0.04] leading-relaxed pointer-events-none select-none text-right">
        {`while (alive) {
  learn()
  build()
  ship()
  playChess()
}`}
      </pre>

      {/* Main */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Terminal prompt */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent/80 mb-6 glass px-4 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-clay-accent" />
          <span className="text-text-primary dark:text-dark-text-primary">jaai@dev:~$</span>
          <span className="text-text-dim dark:text-dark-text-dim">whoami</span>
        </div>

        {/* Name - massive Bebas with gradient */}
        <h1 className="font-display text-[clamp(80px,16vw,160px)] leading-none tracking-wide mb-2 text-gradient-accent animate-glow-pulse">
          {isPersonal ? "JAAI" : "ARCTICQUESTS"}
        </h1>

        {/* Role subtitle */}
        <div className="h-8 flex items-center justify-center mb-8">
          <p className="font-mono text-base md:text-lg text-text-dim dark:text-dark-text-dim">
            <span className="text-accent">›</span>{" "}
            <span className="text-text-primary dark:text-dark-text-primary">{role}</span>
          </p>
        </div>

        {/* Bio one-liner */}
        <p className="font-body text-text-dim dark:text-dark-text-dim max-w-lg mx-auto mb-10 text-base leading-relaxed">
          {isPersonal
            ? "Building clean, creative software - Minecraft mods, web apps, open source. Based in code, fuelled by curiosity."
            : "Professional game development and modding studio. Custom Minecraft mods, web applications, and open-source solutions tailored to your needs."}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="clay-button px-6 py-3 text-white font-mono font-bold text-sm hover:scale-105 active:scale-95 transition-all"
          >
            ./view-projects
          </button>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="glass px-6 py-3 text-text-primary dark:text-dark-text-primary font-mono text-sm hover:text-accent hover:shadow-clay-hover transition-all hover:scale-105"
          >
            ./contact-me
          </button>
        </div>

        {/* Quick links row */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {[
            { label: "github", href: "https://github.com/JaaiDead" },
            { label: "modrinth", href: "https://modrinth.com/user/JaaiDead" },
            { label: "email", href: "mailto:arcticquests.dev@gmail.com" },
          ].map((l, i) => (
            <span key={l.label} className="flex items-center gap-6">
              {i > 0 && <span className="text-border dark:border-dark-border">·</span>}
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-dim dark:text-dark-text-dim hover:text-accent transition-colors"
              >
                {l.label} ↗
              </a>
            </span>
          ))}
        </div>

        <div className="mt-10 flex justify-start pl-2 md:pl-6">
          <InteractiveTerminal />
        </div>
      </div>

      {/* Scroll arrow */}
      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted dark:text-dark-text-muted hover:text-accent transition-colors animate-float"
      >
        <ArrowDown size={18} />
      </button>
    </section>
  );
}
