import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="flex h-8 w-8 items-center justify-center rounded-full text-text-dim transition-colors hover:bg-surface-2 hover:text-text-primary dark:text-dark-text-dim dark:hover:bg-dark-surface-2 dark:hover:text-dark-text-primary"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
