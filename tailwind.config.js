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
        bg: "#E8E5DF",
        surface: "#F5F3EF",
        "surface-2": "#D7D2CA",
        "text-primary": "#262427",
        "text-dim": "#5E5A5F",
        "text-muted": "#8B858C",
        border: "rgba(0, 0, 0, 0.1)",
        primary: "#6B3F52",
        "primary-dim": "#552F40",
        secondary: "#6B3F52",
        "secondary-dim": "#552F40",
        accent: "#6B3F52",

        // Dark theme, charcoal surfaces with warm ivory text
        "dark-bg": "#252321",
        "dark-surface": "#302D2A",
        "dark-surface-2": "#3B3733",
        "dark-text-primary": "#F1EEE8",
        "dark-text-dim": "#C3BCB3",
        "dark-text-muted": "#918981",
        "dark-border": "rgba(241, 238, 232, 0.14)",
        "dark-primary": "#D09AA8",
        "dark-primary-dim": "#B77B8D",
        "dark-secondary": "#D09AA8",
        "dark-secondary-dim": "#B77B8D",
        "dark-accent": "#D09AA8",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.06)",
        "glass-dark": "0 8px 32px rgba(0, 0, 0, 0.5)",
        "glow-primary": "0 0 24px rgba(107, 63, 82, 0.3)",
        "glow-primary-lg": "0 0 48px rgba(107, 63, 82, 0.35), 0 0 96px rgba(107, 63, 82, 0.12)",
        "glow-secondary": "0 0 24px rgba(107, 63, 82, 0.3)",
        "glow-accent": "0 0 24px rgba(195, 138, 157, 0.25)",
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
