import { User, Briefcase } from "lucide-react";
import { useProfile } from "../contexts/ProfileContext";

export default function ProfileSwitch() {
  const { profile, toggleProfile } = useProfile();
  const isPersonal = profile === "personal";

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleProfile}
        className="glass-clay group flex items-center gap-3 px-4 py-2.5 hover:shadow-glass-hover transition-all hover:scale-105 active:scale-95"
        aria-label={`Switch to ${isPersonal ? "business" : "personal"} profile`}
      >
        {/* Icon container */}
        <div className="relative w-5 h-5">
          <User
            size={20}
            className={`absolute inset-0 transition-all duration-300 ${
              isPersonal
                ? "opacity-100 rotate-0 scale-100 text-accent"
                : "opacity-0 -rotate-90 scale-50 text-text-dim"
            }`}
          />
          <Briefcase
            size={20}
            className={`absolute inset-0 transition-all duration-300 ${
              !isPersonal
                ? "opacity-100 rotate-0 scale-100 text-accent"
                : "opacity-0 rotate-90 scale-50 text-text-dim"
            }`}
          />
        </div>

        {/* Label */}
        <div className="relative overflow-hidden h-5">
          <span
            className={`absolute whitespace-nowrap font-mono text-xs transition-all duration-300 ${
              isPersonal
                ? "translate-y-0 opacity-100 text-text-primary dark:text-dark-text-primary"
                : "-translate-y-full opacity-0 text-text-dim dark:text-dark-text-dim"
            }`}
          >
            Personal
          </span>
          <span
            className={`absolute whitespace-nowrap font-mono text-xs transition-all duration-300 ${
              !isPersonal
                ? "translate-y-0 opacity-100 text-text-primary dark:text-dark-text-primary"
                : "translate-y-full opacity-0 text-text-dim dark:text-dark-text-dim"
            }`}
          >
            Business
          </span>
        </div>

        {/* Toggle indicator */}
        <div className="relative w-10 h-5 rounded-full overflow-hidden shadow-clay-inner">
          <div className="absolute inset-0 bg-white/[0.06]" />
          <div
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-accent shadow-clay-accent transition-all duration-300 ${
              isPersonal ? "left-0.5" : "left-5"
            }`}
          />
        </div>
      </button>
    </div>
  );
}
