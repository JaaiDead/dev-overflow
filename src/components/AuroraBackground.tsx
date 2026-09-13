import { usePrefersReducedMotion } from "../hooks";

/**
 * Soft, monochrome-purple blurred blobs (pure CSS transform animation,
 * GPU-composited). Purely decorative background layer.
 */
export default function AuroraBackground({ className = "" }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion();
  const anim = (name: string) => (reducedMotion ? "" : name);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`aurora-blob left-[-10%] top-[-15%] h-[55vw] w-[55vw] max-h-[560px] max-w-[560px] bg-primary/20 dark:bg-dark-primary/20 ${anim("animate-aurora-1")}`}
      />
      <div
        className={`aurora-blob right-[-15%] top-[0%] h-[48vw] w-[48vw] max-h-[520px] max-w-[520px] bg-primary/10 dark:bg-dark-primary/10 ${anim("animate-aurora-2")}`}
      />
      <div
        className={`aurora-blob left-[20%] bottom-[-20%] h-[42vw] w-[42vw] max-h-[480px] max-w-[480px] bg-primary/[0.08] dark:bg-dark-primary/[0.08] ${anim("animate-aurora-3")}`}
      />
    </div>
  );
}
