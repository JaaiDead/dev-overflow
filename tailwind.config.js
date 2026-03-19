/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"DM Mono"', "monospace"],
      },
      colors: {
        // Light Professional Theme
        bg: "#F8F9FA",
        surface: "#FFFFFF",
        card: "#F1F3F5",
        accent: "#10B981", // Green accent
        "accent-dim": "#059669",
        "accent-hover": "#34D399",
        purple: "#8B5CF6",
        "purple-dim": "#7C3AED",
        pink: "#EC4899",
        cyan: "#06B6D4",
        muted: "#E9ECEF",
        "text-primary": "#212529",
        "text-dim": "#6C757D",
        "text-muted": "#ADB5BD",
        border: "#DEE2E6",
        "glow-subtle": "rgba(16,185,129,0.1)",
        // Dark theme colors (via dark: variants in components)
        "dark-bg": "#080A0F",
        "dark-surface": "#0E1117",
        "dark-card": "#111520",
        "dark-muted": "#1a1f2e",
        "dark-text-primary": "#e2e8f0",
        "dark-text-dim": "#94a3b8",
        "dark-border": "#1e293b",
      },
      boxShadow: {
        // Light mode claymorphism shadows
        clay: "8px 8px 16px rgba(0, 0, 0, 0.08), -4px -4px 12px rgba(255, 255, 255, 0.9)",
        "clay-sm": "4px 4px 8px rgba(0, 0, 0, 0.06), -2px -2px 6px rgba(255, 255, 255, 0.8)",
        "clay-lg": "12px 12px 24px rgba(0, 0, 0, 0.1), -6px -6px 16px rgba(255, 255, 255, 0.95)",
        "clay-xl": "16px 16px 32px rgba(0, 0, 0, 0.12), -8px -8px 20px rgba(255, 255, 255, 1)",
        "clay-inner":
          "inset 4px 4px 8px rgba(0, 0, 0, 0.06), inset -2px -2px 6px rgba(255, 255, 255, 0.9)",
        "clay-accent":
          "8px 8px 16px rgba(14, 165, 233, 0.2), -4px -4px 12px rgba(255, 255, 255, 0.9)",
        "clay-accent-lg":
          "12px 12px 24px rgba(14, 165, 233, 0.25), -6px -6px 16px rgba(255, 255, 255, 0.95)",
        "clay-hover": "10px 10px 20px rgba(0, 0, 0, 0.1), -5px -5px 14px rgba(255, 255, 255, 0.95)",
      },
      animation: {
        "cursor-blink": "blink 1.1s step-end infinite",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        float: "float 4s ease-in-out infinite",
        scan: "scan 3s linear infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "scale-up": "scaleUp 0.3s ease-out forwards",
        "clay-press": "clayPress 0.15s ease-out",
        "clay-lift": "clayLift 0.2s ease-out forwards",
        "slide-carousel": "slideCarousel 0.3s ease-out",
      },
      keyframes: {
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scan: { from: { transform: "translateY(-100%)" }, to: { transform: "translateY(100vh)" } },
        glowPulse: {
          "0%,100%": { opacity: "0.9", boxShadow: "0 0 20px rgba(14,165,233,0.3)" },
          "50%": { opacity: "1", boxShadow: "0 0 40px rgba(14,165,233,0.5)" },
        },
        scaleUp: { from: { transform: "scale(1)" }, to: { transform: "scale(1.05)" } },
        clayPress: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(2px)" },
          "100%": { transform: "translateY(0)" },
        },
        clayLift: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-4px)" },
        },
        slideCarousel: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
