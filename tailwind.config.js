/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        bg: '#080A0F',
        surface: '#0E1117',
        card: '#111520',
        accent: '#00FFA3',
        'accent-dim': '#00cc82',
        'accent-hover': '#00E590',
        purple: '#8B5CF6',
        'purple-dim': '#6D28D9',
        pink: '#EC4899',
        cyan: '#06B6D4',
        muted: '#3a3f52',
        'text-dim': '#6b7280',
        'glow-subtle': 'rgba(0,255,163,0.06)',
      },
      animation: {
        'cursor-blink': 'blink 1.1s step-end infinite',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'float': 'float 4s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scale-up': 'scaleUp 0.3s ease-out forwards',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        scan: { from: { transform: 'translateY(-100%)' }, to: { transform: 'translateY(100vh)' } },
        glowPulse: { '0%,100%': { opacity: '0.8', boxShadow: '0 0 20px rgba(0,255,163,0.2)' }, '50%': { opacity: '1', boxShadow: '0 0 40px rgba(0,255,163,0.4)' } },
        scaleUp: { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.05)' } },
      },
    },
  },
  plugins: [],
}
