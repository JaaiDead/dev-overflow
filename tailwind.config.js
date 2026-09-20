/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class", // dark is the default state (class applied on <html> on load)
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', "sans-serif"],
        body: ['"Bricolage Grotesque"', "sans-serif"],
        mono: ['"Geist Mono"', '"DM Mono"', "monospace"],
      },
      colors: {
        // Light paper theme (base / unprefixed), used when .dark is absent
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        "text-primary": "var(--color-text-primary)",
        "text-dim": "var(--color-text-dim)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
        "primary-dim": "var(--color-primary-dim)",
        secondary: "var(--color-secondary)",
        "secondary-dim": "var(--color-secondary-dim)",
        accent: "var(--color-accent)",

        // Dark theme, charcoal surfaces with warm ivory text
        "dark-bg": "var(--color-bg)",
        "dark-surface": "var(--color-surface)",
        "dark-surface-2": "var(--color-surface-2)",
        "dark-text-primary": "var(--color-text-primary)",
        "dark-text-dim": "var(--color-text-dim)",
        "dark-text-muted": "var(--color-text-muted)",
        "dark-border": "var(--color-border)",
        "dark-primary": "var(--color-primary)",
        "dark-primary-dim": "var(--color-primary-dim)",
        "dark-secondary": "var(--color-secondary)",
        "dark-secondary-dim": "var(--color-secondary-dim)",
        "dark-accent": "var(--color-accent)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.06)",
        "glass-dark": "0 8px 32px rgba(0, 0, 0, 0.5)",
        "glow-primary": "0 0 24px var(--color-glow-primary)",
        "glow-primary-lg":
          "0 0 48px var(--color-glow-primary), 0 0 96px var(--color-glow-primary-soft)",
        "glow-secondary": "0 0 24px var(--color-glow-primary)",
        "glow-accent": "0 0 24px var(--color-glow-accent)",
      },
      animation: {
        "aurora-1": "aurora1 22s ease-in-out infinite",
        "aurora-2": "aurora2 26s ease-in-out infinite",
        "aurora-3": "aurora3 30s ease-in-out infinite",
        "grid-pan": "gridPan 60s linear infinite",
        "gradient-x": "gradientX 6s ease infinite",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fadeIn 0.2s ease forwards",
        "dialog-in": "dialogIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-glow": "pulseGlow 2.4s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        aurora1: {
          "0%,100%": { transform: "translate(-10%, -10%) scale(1)" },
          "50%": { transform: "translate(8%, 6%) scale(1.15)" },
        },
        aurora2: {
          "0%,100%": { transform: "translate(10%, 8%) scale(1.05)" },
          "50%": { transform: "translate(-6%, -8%) scale(0.95)" },
        },
        aurora3: {
          "0%,100%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(-8%, 10%) scale(1.1)" },
        },
        gridPan: {
          from: { backgroundPosition: "0px 0px" },
          to: { backgroundPosition: "0px 64px" },
        },
        gradientX: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        dialogIn: {
          from: { opacity: "0", transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.25)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      borderRadius: {
        "4xl": "28px",
        "5xl": "36px",
      },
    },
  },
  plugins: [],
};
