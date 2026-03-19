import { useTypewriter } from '../hooks'
import { ArrowDown } from 'lucide-react'
import { ROLES } from '../data'

export default function Hero() {
  const role = useTypewriter(ROLES)

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Grid bg */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,163,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,255,163,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow centre */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.04)_0%,transparent_65%)]" />

      {/* Corner accents */}
      <div className="absolute top-20 left-8 w-px h-24 bg-gradient-to-b from-accent/50 to-transparent" />
      <div className="absolute top-20 left-8 w-24 h-px bg-gradient-to-r from-accent/50 to-transparent" />
      <div className="absolute bottom-20 right-8 w-px h-24 bg-gradient-to-t from-accent/50 to-transparent" />
      <div className="absolute bottom-20 right-8 w-24 h-px bg-gradient-to-l from-accent/50 to-transparent" />

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
        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent/70 mb-6 border border-accent/20 rounded px-3 py-1.5 bg-accent/[0.04]">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>jaai@dev:~$</span>
          <span className="text-white/40">whoami</span>
        </div>

        {/* Name — massive Bebas with gradient */}
        <h1 className="font-display text-[clamp(80px,16vw,160px)] leading-none tracking-wide mb-2 text-gradient-accent animate-glow-pulse">
          JAAI
        </h1>

        {/* Typewriter role */}
        <div className="h-8 flex items-center justify-center mb-8">
          <p className="font-mono text-base md:text-lg text-text-dim">
            <span className="text-accent">›</span>{' '}
            <span className="text-white">{role}</span>
            <span className="animate-cursor-blink text-accent ml-0.5">█</span>
          </p>
        </div>

        {/* Bio one-liner */}
        <p className="font-body text-text-dim max-w-lg mx-auto mb-10 text-base leading-relaxed">
          Building clean, creative software — Minecraft mods, web apps, open source.
          Based in code, fuelled by chess puzzles.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-accent text-bg font-mono font-bold text-sm rounded hover:bg-accent-hover transition-all hover:scale-110 active:scale-95 glow-strong shadow-lg shadow-accent/20"
          >
            ./view-projects
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 border-2 border-accent/30 text-text-dim font-mono text-sm rounded hover:border-accent hover:text-white hover:bg-accent/5 transition-all hover:scale-105"
          >
            ./contact-me
          </button>
        </div>

        {/* Quick links row */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {[
            { label: 'github', href: 'https://github.com/JaaiDead' },
            { label: 'modrinth', href: 'https://modrinth.com/user/JaaiDead' },
            { label: 'email', href: 'mailto:arcticquests.dev@gmail.com' },
          ].map((l, i) => (
            <span key={l.label} className="flex items-center gap-6">
              {i > 0 && <span className="text-white/10">·</span>}
              <a href={l.href} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-text-dim hover:text-accent transition-colors">
                {l.label} ↗
              </a>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll arrow */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 hover:text-accent transition-colors animate-float"
      >
        <ArrowDown size={18} />
      </button>
    </section>
  )
}
