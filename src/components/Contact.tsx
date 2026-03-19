import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useReveal } from '../hooks'
import { CONNECT } from '../data'

type Status = 'idle' | 'sending' | 'ok' | 'err'

export default function Contact() {
  const { ref, visible } = useReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus('err'); setTimeout(() => setStatus('idle'), 3000); return
    }
    setStatus('sending')
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    window.location.href = `mailto:arcticquests.dev@gmail.com?subject=Hey from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(body)}`
    setTimeout(() => {
      setStatus('ok')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 800)
  }

  const input = 'w-full clay-input px-4 py-3 font-mono text-sm text-text-primary dark:text-dark-text-primary placeholder-text-dim dark:placeholder-dark-text-dim focus:outline-none transition-all'

  const reveal = (d: number) => `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} [transition-delay:${d}ms]`

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement>} className="py-32 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div className={reveal(0) + ' mb-16'}>
          <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-3">// contact</p>
          <h2 className="font-display text-6xl md:text-7xl text-text-primary dark:text-dark-text-primary tracking-wide">GET IN TOUCH</h2>
          <p className="font-mono text-sm text-text-dim dark:text-dark-text-dim mt-3">Got a project, collab, or just want to chat?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className={reveal(100)}>
            {status === 'ok' && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/10 border border-accent/25 font-mono text-xs text-accent mb-5">
                <CheckCircle size={14} /> Email app should've opened — thanks!
              </div>
            )}
            {status === 'err' && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20 font-mono text-xs text-red-500 mb-5">
                <AlertCircle size={14} /> Invalid email. Please try again.
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="font-mono text-xs text-text-dim dark:text-dark-text-dim uppercase tracking-widest block mb-2">name</label>
                <input type="text" name="name" value={form.name} onChange={change} placeholder="Your name" required className={input} />
              </div>
              <div>
                <label className="font-mono text-xs text-text-dim dark:text-dark-text-dim uppercase tracking-widest block mb-2">email</label>
                <input type="email" name="email" value={form.email} onChange={change} placeholder="you@example.com" required className={input} />
              </div>
              <div>
                <label className="font-mono text-xs text-text-dim dark:text-dark-text-dim uppercase tracking-widest block mb-2">message</label>
                <textarea name="message" value={form.message} onChange={change} placeholder="What's up?" rows={5} required className={input + ' resize-none'} />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="clay-button w-full flex items-center justify-center gap-2 py-3 font-mono font-bold text-sm text-text-primary dark:text-dark-text-primary transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-text-primary dark:border-dark-text-primary/40 border-t-text-primary dark:border-t-dark-text-primary rounded-full animate-spin" />
                    sending...
                  </span>
                ) : (
                  <><Send size={14} /> send_message</>
                )}
              </button>
            </form>
          </div>

          {/* Right - connect links */}
          <div className={reveal(200)}>
            <p className="font-mono text-xs text-text-dim dark:text-dark-text-dim uppercase tracking-widest mb-6">// or find me at</p>
            <div className="space-y-3">
              {CONNECT.map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="glass-clay group flex items-center justify-between p-4 transition-all hover:shadow-glass-hover hover:-translate-y-1">
                  <div>
                    <p className="font-mono text-xs text-text-dim dark:text-dark-text-dim uppercase tracking-widest mb-0.5">{c.label}</p>
                    <p className="font-mono text-sm text-text-primary dark:text-dark-text-primary group-hover:text-accent transition-colors">{c.value}</p>
                  </div>
                  <span className="text-text-dim dark:text-dark-text-dim group-hover:text-accent transition-colors text-sm">↗</span>
                </a>
              ))}
            </div>

            {/* Discord note */}
            <p className="font-mono text-xs text-text-dim dark:text-dark-text-dim mt-6 leading-relaxed">
              Prefer Discord? Hit me at{' '}
              <a href="https://discord.com/users/730700346069876776" target="_blank" rel="noopener noreferrer"
                className="text-accent hover:underline">Jaai.</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
