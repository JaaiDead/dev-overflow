import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { threshold: 0.4 })
    NAV_LINKS.forEach(l => { const el = document.getElementById(l.href); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg/80 backdrop-blur-xl' : ''}`}>
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => go('home')} className="flex items-center gap-2 group">
          <div className="clay-sm w-8 h-8 flex items-center justify-center font-mono text-accent text-sm font-bold group-hover:shadow-clay-accent transition-all">J</div>
          <span className="font-mono text-xs text-text-dim group-hover:text-accent transition-colors">jaai.dev</span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <button
                onClick={() => go(l.href)}
                className={`px-4 py-1.5 font-mono text-xs rounded-lg transition-all ${
                  active === l.href
                    ? 'text-accent clay-accent'
                    : 'text-text-dim hover:text-white'
                }`}
              >
                {active === l.href && <span className="mr-1 text-accent">›</span>}
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <a href="https://github.com/JaaiDead" target="_blank" rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 font-mono text-xs text-accent clay-accent px-3 py-1.5 transition-all hover:shadow-clay-accent-lg">
          GitHub ↗
        </a>

        <button className="md:hidden text-text-dim hover:text-white" onClick={() => setOpen(o => !o)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden clay-lg px-6 py-6 mx-4 mb-4 flex flex-col gap-4">
          {NAV_LINKS.map(l => (
            <button key={l.href} onClick={() => go(l.href)}
              className={`text-left font-mono text-sm ${active === l.href ? 'text-accent' : 'text-text-dim'}`}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
