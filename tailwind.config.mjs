/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#12161f',
        foreground: '#f1f5f9',
        muted: '#94a3b8',
        accent: '#38bdf8',
        'accent-dark': '#0284c7',
        card: '#1a202c',
        'card-elevated': '#222a3a',
        'card-border': 'rgba(148, 163, 184, 0.18)',
        copper: '#f59e0b',
        'copper-gold': '#fbbf24',
        'copper-line': 'rgba(245, 158, 11, 0.35)',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(94, 231, 255, 0.15)',
        'glow-md': '0 0 30px rgba(94, 231, 255, 0.25)',
        'glow-lg': '0 0 50px rgba(94, 231, 255, 0.35)',
      },
    },
  },
  plugins: [],
};
