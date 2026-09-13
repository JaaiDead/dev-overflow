import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data";
import { useScrollProgress } from "../hooks";
import ThemeToggle from "./ThemeToggle";
import ProfileSwitch from "./ProfileSwitch";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const progress = useScrollProgress();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary dark:from-dark-primary dark:via-dark-accent dark:to-dark-secondary"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <header className="fixed top-4 left-1/2 z-50 w-[94vw] max-w-3xl -translate-x-1/2">
        <nav className="glass flex items-center justify-between gap-2 rounded-full px-3 py-2">
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2 rounded-full px-2 py-1 font-mono text-sm font-semibold gradient-text"
          >
            jaai.dev
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href} className="relative">
                <button
                  onClick={() => go(l.href)}
                  className={`relative z-10 rounded-full px-3.5 py-1.5 font-mono text-xs capitalize transition-colors ${
                    active === l.href
                      ? "text-text-primary dark:text-dark-text-primary"
                      : "text-text-dim hover:text-text-primary dark:text-dark-text-dim dark:hover:text-dark-text-primary"
                  }`}
                >
                  {active === l.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2 dark:bg-dark-surface-2"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <ProfileSwitch />
            <ThemeToggle />
          </div>

          <button
            className="flex h-8 w-8 items-center justify-center text-text-dim hover:text-text-primary dark:text-dark-text-dim dark:hover:text-dark-text-primary md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
            >
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className={`rounded-lg px-3 py-2 text-left font-mono text-sm capitalize ${
                    active === l.href
                      ? "text-primary dark:text-dark-primary"
                      : "text-text-dim dark:text-dark-text-dim"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-border px-1 pt-3 dark:border-dark-border">
                <ProfileSwitch />
                <ThemeToggle />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
