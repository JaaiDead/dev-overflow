import { useEffect, useState } from 'react'
import { useReveal } from '../hooks'
import { SKILLS, STATS } from '../data'

const catLabel: Record<string, string> = {
  lang: 'language', fw: 'framework', tool: 'tool', learning: 'learning ↗',
}
const catColor: Record<string, string> = {
  lang: 'text-accent border-accent/30 bg-accent/[0.06]',
  fw: 'text-purple border-purple/30 bg-purple/[0.06]',
  tool: 'text-white/40 border-white/10 bg-white/[0.03]',
  learning: 'text-yellow-400/70 border-yellow-400/20 bg-yellow-400/[0.04]',
}
const barColor: Record<string, string> = {
  lang: 'bg-accent', fw: 'bg-purple', tool: 'bg-white/30', learning: 'bg-yellow-400/60',
}

function StatCount({ value, suffix, label, run }: { value: number; suffix: string; label: string; run: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    let cur = 0
    const id = setInterval(() => {
      cur = Math.min(cur + Math.ceil(value / 25), value)
      setN(cur)
      if (cur >= value) clearInterval(id)
    }, 50)
    return () => clearInterval(id)
  }, [run, value])
  return (
    <div className="text-center">
      <div className="font-display text-5xl text-accent leading-none mb-1">{run ? n : 0}{suffix}</div>
      <div className="font-mono text-xs text-text-dim uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default function About() {
  const { ref, visible } = useReveal()
  const reveal = (delay: number) =>
    `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}` +
    ` [transition-delay:${delay}ms]`

  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="py-32 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <div className={reveal(0) + ' mb-16'}>
          <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-3">// about</p>
          <h2 className="font-display text-6xl md:text-7xl text-white tracking-wide">WHO AM I</h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Left col — bio + stats */}
          <div className="md:col-span-2 space-y-8">
            <div className={reveal(100)}>
              <p className="text-text-dim leading-relaxed mb-4">
                I'm <span className="text-white font-medium">Jaai</span> — a developer and student
                passionate about building clean, creative software. Started with shaping Minecraft
                worlds, grew into full-stack web dev.
              </p>
              <p className="text-text-dim leading-relaxed mb-4">
                Paid dev at <span className="text-accent">Lumlyte Network</span>, Fabric community
                contributor, open-source advocate.
              </p>
              <p className="text-text-dim leading-relaxed">
                Off-keyboard: chess (always), puzzles, and anything that makes me think.
              </p>
            </div>

            {/* Stats */}
            <div className={reveal(150) + ' grid grid-cols-3 gap-4 p-5 bg-card border border-white/[0.06] rounded-xl hover:border-accent/20 transition-all'}>
              {STATS.map(s => (
                <StatCount key={s.label} value={s.value} suffix={s.suffix} label={s.label} run={visible} />
              ))}
            </div>

            {/* GitHub Stats Card */}
            <div className={reveal(175) + ' p-5 bg-gradient-to-br from-card via-card to-surface border border-white/[0.06] rounded-xl hover:border-accent/20 transition-all group'}>
              <p className="font-mono text-xs text-text-dim uppercase tracking-widest mb-4">// GitHub Activity</p>
              <a href="https://github.com/JaaiDead" target="_blank" rel="noopener noreferrer" className="block">
                <img 
                  src="https://github-readme-stats.vercel.app/api?username=JaaiDead&show_icons=true&theme=github_dark&hide_border=true&bg_color=00000000&title_color=00FFA3&icon_color=00FFA3&text_color=6b7280&ring_color=00FFA3" 
                  alt="GitHub Stats" 
                  className="w-full rounded opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </a>
            </div>

            {/* Fun facts */}
            <div className={reveal(200)}>
              <p className="font-mono text-xs text-text-dim uppercase tracking-widest mb-3">// fun facts</p>
              <ul className="space-y-2">
                {[
                  '♟ Chess enthusiast — always up for a match',
                  '🧩 Puzzle addict (the harder the better)',
                  '⛏ Minecraft modder at heart',
                  '💡 If it\'s interesting, I\'ll build it',
                ].map(f => (
                  <li key={f} className="font-mono text-xs text-text-dim flex items-start gap-2">
                    <span className="text-accent mt-0.5">›</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right col — skill bars */}
          <div className="md:col-span-3">
            <div className={reveal(120) + ' mb-6'}>
              <p className="font-mono text-xs text-text-dim uppercase tracking-widest mb-5">// skills & tools</p>
              <div className="space-y-4">
                {SKILLS.map((s, i) => (
                  <div key={s.name}
                    className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    style={{ transitionDelay: `${200 + i * 60}ms` }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-white">{s.name}</span>
                        <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${catColor[s.cat]}`}>
                          {catLabel[s.cat]}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-text-dim">{s.level}%</span>
                    </div>
                    <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 shadow-lg ${barColor[s.cat]}`}
                        style={{ 
                          width: visible ? `${s.level}%` : '0%', 
                          transitionDelay: `${300 + i * 60}ms`,
                          boxShadow: visible ? `0 0 10px ${s.cat === 'lang' ? 'rgba(0,255,163,0.4)' : s.cat === 'fw' ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.2)'}` : 'none'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </section>
  )
}
