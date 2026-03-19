import { ExternalLink, Star } from 'lucide-react'
import { useReveal } from '../hooks'
import { PROJECTS, BUSINESS_PROJECTS } from '../data'
import { useProfile } from '../contexts/ProfileContext'

export default function Projects() {
  const { ref, visible } = useReveal()
  const { profile } = useProfile()
  const isPersonal = profile === 'personal'
  const projects = isPersonal ? PROJECTS : BUSINESS_PROJECTS

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
          <h2 className="font-display text-6xl md:text-7xl text-text-primary dark:text-dark-text-primary tracking-wide">
            {isPersonal ? "WHAT I'VE BUILT" : 'OUR SERVICES'}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-clay group relative flex flex-col p-6 overflow-hidden transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Hover glow - enhanced */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-purple/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Featured badge */}
              {p.featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1 font-mono text-[10px] text-accent clay-accent px-2 py-1">
                  <Star size={9} /> featured
                </div>
              )}

              {/* Icon with glow */}
              <div className="relative w-10 h-10 glass-sm flex items-center justify-center mb-4 overflow-hidden group-hover:shadow-glass-accent transition-all">
                <img src={p.img} alt={p.title} className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>

              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-body font-semibold text-text-primary dark:text-dark-text-primary group-hover:text-accent transition-colors">{p.title}</h3>
                <ExternalLink size={13} className="text-text-dim dark:text-dark-text-dim/40 group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
              </div>

              <p className="font-mono text-xs text-text-dim dark:text-dark-text-dim leading-relaxed mb-5 flex-1">{p.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(t => (
                  <span key={t} className="glass-sm font-mono text-[10px] px-2 py-0.5 text-text-dim dark:text-dark-text-dim">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className={`mt-10 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {isPersonal ? (
            <>
              <p className="font-mono text-xs text-text-dim dark:text-dark-text-dim mb-4">more shipping soon -</p>
              <a href="https://github.com/JaaiDead" target="_blank" rel="noopener noreferrer"
                className="clay-button inline-flex items-center gap-2 font-mono text-xs text-text-primary dark:text-dark-text-primary px-5 py-2 transition-all hover:scale-105 active:scale-95">
                see all on GitHub ↗
              </a>
            </>
          ) : (
            <>
              <p className="font-mono text-xs text-text-dim dark:text-dark-text-dim mb-4">ready to start your project? -</p>
              <a href="mailto:arcticquests.dev@gmail.com?subject=Project%20Inquiry" target="_blank" rel="noopener noreferrer"
                className="clay-button inline-flex items-center gap-2 font-mono text-xs text-text-primary dark:text-dark-text-primary px-5 py-2 transition-all hover:scale-105 active:scale-95">
                get in touch ↗
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
