import { useState, useEffect, useRef } from 'react'

export function useTypewriter(texts: string[], speed = 85, deleteSpeed = 40, pause = 1800) {
  const [out, setOut] = useState('')
  const [ti, setTi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const cur = texts[ti]
    const delay = del ? deleteSpeed : ci === cur.length ? pause : speed
    const id = setTimeout(() => {
      if (!del) {
        setOut(cur.slice(0, ci + 1))
        if (ci + 1 === cur.length) setDel(true)
        else setCi(c => c + 1)
      } else {
        setOut(cur.slice(0, ci - 1))
        if (ci - 1 === 0) { setDel(false); setTi(t => (t + 1) % texts.length) }
        else setCi(c => c - 1)
      }
    }, delay)
    return () => clearTimeout(id)
  }, [ci, del, ti, texts, speed, deleteSpeed, pause])

  return out
}

export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}
