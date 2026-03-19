import { ExternalLink, Star } from 'lucide-react'
import { useReveal } from '../hooks'
import { PROJECTS } from '../data'

export default function Projects() {
  const { ref, visible } = useReveal()

  return (
    <section id="projects" ref={ref as React.RefObject<HTMLElement>} className="py-32 relative">
      <div className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,163,0.015) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,255,163,0.015) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6">

        {/* Heading */}
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-3">// projects</p>
          <h2 className="font-display text-6xl md:text-7xl text-white tracking-wide">WHAT I'VE BUILT</h2>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {PROJECTS.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col p-6 bg-card card-border rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Hover glow - enhanced */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-purple/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-purple/20 to-cyan/20 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

              {/* Featured badge */}
              {p.featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1 font-mono text-[10px] text-accent bg-accent/10 border border-accent/25 rounded px-2 py-0.5">
                  <Star size={9} /> featured
                </div>
              )}

              {/* Icon with glow */}
              <div className="relative w-10 h-10 rounded-lg bg-bg border border-white/[0.06] flex items-center justify-center mb-4 overflow-hidden group-hover:border-accent/40 transition-all group-hover:shadow-lg group-hover:shadow-accent/20">
                <img src={p.img} alt={p.title} className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>

              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-body font-semibold text-white group-hover:text-accent transition-colors">{p.title}</h3>
                <ExternalLink size={13} className="text-white/20 group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
              </div>

              <p className="font-mono text-xs text-text-dim leading-relaxed mb-5 flex-1">{p.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(t => (
                  <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border border-white/[0.08] text-text-dim bg-white/[0.03]">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className={`mt-10 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-mono text-xs text-text-dim mb-4">more shipping soon —</p>
          <a href="https://github.com/JaaiDead" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-accent border-2 border-accent/30 hover:border-accent hover:bg-accent/10 rounded px-5 py-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20">
            see all on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}
