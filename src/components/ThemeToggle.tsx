import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const bounds = button.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const maxDistance = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    document.documentElement.style.setProperty("--theme-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-y", `${y}px`);
    document.documentElement.style.setProperty("--theme-radius", `${maxDistance}px`);

    const documentWithTransitions = document as Document & {
      startViewTransition?: (callback: () => void) => unknown;
    };

    if (documentWithTransitions.startViewTransition) {
      documentWithTransitions.startViewTransition(() => toggleTheme());
    } else {
      toggleTheme();
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="flex h-8 w-8 items-center justify-center rounded-full text-text-dim transition-colors hover:bg-surface-2 hover:text-text-primary dark:text-dark-text-dim dark:hover:bg-dark-surface-2 dark:hover:text-dark-text-primary"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
