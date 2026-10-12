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
        background: '#050b12',
        foreground: '#e8f7ff',
        muted: '#8ca8b8',
        accent: '#5ee7ff',
        'accent-dark': '#0ea5e9',
        card: '#0a1522',
        'card-border': 'rgba(94, 231, 255, 0.15)',
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
