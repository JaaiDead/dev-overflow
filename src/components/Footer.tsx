export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <div className="glass-sm w-7 h-7 flex items-center justify-center font-mono text-accent text-xs font-bold">
            J
          </div>
          <span className="font-mono text-xs text-text-dim dark:text-dark-text-dim">jaai.dev</span>
        </div>

        <p className="font-mono text-xs text-text-dim dark:text-dark-text-dim text-center">
          <span className="text-accent">©</span> {year} Jaai -{' '}
          built with{' '}
          <a href="https://viteplus.dev" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Vite+</a>
          {' · '}
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">React</a>
          {' · '}
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Tailwind</a>
        </p>

        <div className="flex items-center gap-4">
          {[
            { label: 'github', href: 'https://github.com/JaaiDead' },
            { label: 'modrinth', href: 'https://modrinth.com/user/JaaiDead' },
            { label: 'email', href: 'mailto:arcticquests.dev@gmail.com' },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-text-dim dark:text-dark-text-dim hover:text-accent transition-colors">
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
