import { useProfile } from "../contexts/ProfileContext";

export default function ProfileSwitch() {
  const { profile, setProfile } = useProfile();

  return (
    <div
      role="tablist"
      aria-label="Portfolio profile"
      className="glass relative flex items-center overflow-hidden rounded-full p-0.5 font-mono text-[11px]"
    >
      {(["personal", "business"] as const).map((mode) => {
        const active = profile === mode;
        return (
          <button
            key={mode}
            role="tab"
            aria-selected={active}
            onClick={() => setProfile(mode)}
            className={`relative z-10 rounded-full px-3 py-1.5 transition-colors ${
              active
                ? "bg-white/20 text-text-primary shadow-inner backdrop-blur-md dark:bg-white/15 dark:text-dark-text-primary"
                : "text-text-dim hover:text-text-primary dark:text-dark-text-dim dark:hover:text-dark-text-primary"
            }`}
          >
            {mode === "personal" ? "dev" : "studio"}
          </button>
        );
      })}
    </div>
  );
}
