import { useEffect, useState } from 'react'
import { useReveal } from '../hooks'
import { SKILLS, STATS } from '../data'
import { useProfile } from '../contexts/ProfileContext'
import ScrollingRibbon from './ScrollingRibbon'

const catLabel: Record<string, string> = {
  lang: 'language', fw: 'framework', tool: 'tool', learning: 'learning ↗',
}
const catColor: Record<string, string> = {
  lang: 'text-accent border-accent/30 bg-accent/[0.06]',
  fw: 'text-purple border-purple/30 bg-purple/[0.06]',
  tool: 'text-cyan border-cyan/30 bg-cyan/[0.06]',
  learning: 'text-yellow-400/70 border-yellow-400/20 bg-yellow-400/[0.04]',
}
const barColor: Record<string, string> = {
  lang: 'bg-accent', fw: 'bg-purple', tool: 'bg-cyan', learning: 'bg-yellow-400/60',
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
      <div className="font-mono text-xs text-text-dim dark:text-dark-text-dim uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default function About() {
  const { ref, visible } = useReveal()
  const { profile } = useProfile()
  const isPersonal = profile === 'personal'
  
  const personalFacts = [
    { icon: '🧩', text: 'Puzzle addict (the harder the better)' },
    { icon: '⛏', text: 'Minecraft modder at heart' },
    { icon: '💡', text: "If it's interesting, I'll build it" },
    { icon: '🎮', text: 'Gaming enthusiast and problem solver' },
  ]

  const businessFacts = [
    { icon: '🎮', text: 'Expert in Fabric & Forge modding' },
    { icon: '💻', text: 'Modern tech stack (React, TypeScript, Tailwind)' },
    { icon: '📦', text: 'Open-source contributions & expertise' },
    { icon: '⚡', text: 'Fast delivery, clean code, ongoing support' },
  ]
  
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
          <h2 className="font-display text-6xl md:text-7xl text-text-primary dark:text-dark-text-primary tracking-wide">WHO AM I</h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Left col - bio + stats */}
          <div className="md:col-span-2 space-y-8">
            <div className={reveal(100)}>
              {isPersonal ? (
                <>
                  <p className="text-text-dim dark:text-dark-text-dim leading-relaxed mb-4">
                    I'm <span className="text-text-primary dark:text-dark-text-primary font-medium">Jaai</span> - a developer and student
                    passionate about building clean, creative software. Started with shaping Minecraft
                    worlds, grew into full-stack web dev.
                  </p>
                  <p className="text-text-dim dark:text-dark-text-dim leading-relaxed mb-4">
                    Founder of <span className="text-accent">ArcticQuests</span>, Fabric community
                    contributor, open-source advocate.
                  </p>
                  <p className="text-text-dim dark:text-dark-text-dim leading-relaxed">
                    Off-keyboard: puzzles, gaming, and anything that makes me think.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-text-dim dark:text-dark-text-dim leading-relaxed mb-4">
                    <span className="text-text-primary dark:text-dark-text-primary font-medium">ArcticQuests</span> is a professional game development 
                    and modding studio founded by Jaai. We specialize in creating custom Minecraft modifications, 
                    modern web applications, and open-source solutions.
                  </p>
                  <p className="text-text-dim dark:text-dark-text-dim leading-relaxed mb-4">
                    With years of experience in the <span className="text-accent">Fabric modding ecosystem</span> and 
                    modern web technologies, we deliver high-quality, maintainable code that exceeds expectations.
                  </p>
                  <p className="text-text-dim dark:text-dark-text-dim leading-relaxed">
                    From custom server mods to full-stack web apps - we turn your ideas into reality.
                  </p>
                </>
              )}
            </div>

            {/* Stats */}
            <div className={reveal(150) + ' grid grid-cols-3 gap-4 p-5 glass-clay hover:shadow-clay-hover transition-all'}>
              {STATS.map(s => (
                <StatCount key={s.label} value={s.value} suffix={s.suffix} label={s.label} run={visible} />
              ))}
            </div>

            {/* GitHub Stats Card */}
            <div className={reveal(175) + ' p-5 glass-lg hover:shadow-clay-hover transition-all group'}>
              <p className="font-mono text-xs text-text-dim dark:text-dark-text-dim uppercase tracking-widest mb-4">// GitHub Activity</p>
              <a href="https://github.com/JaaiDead" target="_blank" rel="noopener noreferrer" className="block">
                <img 
                  src="https://github-readme-stats.vercel.app/api?username=JaaiDead&show_icons=true&theme=default&hide_border=true&bg_color=00000000&title_color=10B981&icon_color=10B981&text_color=6C757D&ring_color=10B981" 
                  alt="GitHub Stats" 
                  className="w-full rounded opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Right col - skill bars */}
          <div className="md:col-span-3">
            <div className={reveal(120) + ' mb-6'}>
              <p className="font-mono text-xs text-text-dim dark:text-dark-text-dim uppercase tracking-widest mb-5">// skills & tools</p>
              <div className="space-y-4">
                {SKILLS.map((s, i) => (
                  <div key={s.name}
                    className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    style={{ transitionDelay: `${200 + i * 60}ms` }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-text-primary dark:text-dark-text-primary">{s.name}</span>
                        <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${catColor[s.cat]}`}>
                          {catLabel[s.cat]}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-text-dim dark:text-dark-text-dim">{s.level}%</span>
                    </div>
                    <div className="h-1 bg-border dark:border-dark-border rounded-full overflow-hidden shadow-clay-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${barColor[s.cat]}`}
                        style={{ 
                          width: visible ? `${s.level}%` : '0%', 
                          transitionDelay: `${300 + i * 60}ms`,
                          boxShadow: visible ? `0 0 10px ${s.cat === 'lang' ? 'rgba(14,165,233,0.4)' : s.cat === 'fw' ? 'rgba(139,92,246,0.4)' : 'rgba(0,0,0,0.2)'}` : 'none'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Ribbon - Full Width */}
        <div className={reveal(250) + ' mt-16'}>
          <p className="font-mono text-xs text-text-dim dark:text-dark-text-dim uppercase tracking-widest mb-4 text-center">
            // {isPersonal ? 'fun facts' : 'why choose us'}
          </p>
          <ScrollingRibbon items={isPersonal ? personalFacts : businessFacts} speed={25} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </section>
  )
}
