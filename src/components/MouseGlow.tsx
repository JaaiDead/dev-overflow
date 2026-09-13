import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks";

/**
 * A soft radial glow that follows the cursor, updated via a single
 * rAF-throttled transform (GPU-composited, no layout cost). Desktop-only:
 * skipped on touch devices and under reduced motion.
 */
export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const apply = () => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(x - centerX, y - centerY);
        const radius = 210;

        if (distance < radius) {
          const influence = 1 - distance / radius;
          element.style.translate = `${(x - centerX) * influence * 0.1}px ${(y - centerY) * influence * 0.1}px`;
        } else {
          element.style.translate = "0 0";
        }
      });
      rafId = 0;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
        element.style.translate = "0 0";
      });
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.2] blur-[65px] dark:opacity-[0.28] md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(195,138,157,0.9) 0%, rgba(107,63,82,0.5) 45%, transparent 70%)",
        transform: "translate3d(50vw, 50vh, 0) translate(-50%, -50%)",
      }}
    />
  );
}
