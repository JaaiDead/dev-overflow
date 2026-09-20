import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/**
 * Very lightweight vanilla-canvas particle field. No libraries, capped particle
 * count, pauses when the tab is hidden, and skipped entirely under reduced motion
 * or on coarse-pointer (touch) devices to keep mobile/low-end perf high.
 */
export default function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const isLowPower =
      prefersReducedData ||
      connection?.saveData === true ||
      (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4);
    const count = isLowPower ? 12 : isCoarse ? 18 : 42;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const frameInterval = isLowPower ? 1000 / 24 : 1000 / 30;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let running = true;
    let lastFrame = 0;

    function resize() {
      width = parent!.clientWidth;
      height = parent!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isLowPower ? 0.28 : 0.22),
        vy: (Math.random() - 0.5) * (isLowPower ? 0.28 : 0.22),
        r: Math.random() * 1.3 + 0.5,
      }));
    }

    function tick(timestamp: number) {
      if (!running) return;
      if (timestamp - lastFrame < frameInterval) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      lastFrame = timestamp;
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim();
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      rafId = requestAnimationFrame(tick);
    }

    resize();
    init();
    rafId = requestAnimationFrame(tick);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) rafId = requestAnimationFrame(tick);
      else cancelAnimationFrame(rafId);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
