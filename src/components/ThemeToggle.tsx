import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="glass-clay p-3 hover:shadow-clay-hover transition-all hover:scale-105 active:scale-95"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <div className="relative w-5 h-5">
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            !isDark
              ? "opacity-100 rotate-0 scale-100 text-accent"
              : "opacity-0 rotate-90 scale-50 text-text-dim"
          }`}
        />
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            isDark
              ? "opacity-100 rotate-0 scale-100 text-accent"
              : "opacity-0 -rotate-90 scale-50 text-text-dim"
          }`}
        />
      </div>
    </button>
  );
}
