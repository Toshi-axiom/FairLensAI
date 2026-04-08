/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: 'var(--bg-900)',
          800: 'var(--bg-800)',
          700: 'var(--bg-700)',
        },
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
        border: 'var(--border-color)',
        neon: {
          blue: 'var(--neon-blue)',
          violet: 'var(--neon-violet)',
          cyan: 'var(--neon-cyan)',
        }
      },
      fontFamily: {
        sans: ['"Exo 2"', 'sans-serif'],
        display: ['"Chakra Petch"', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 25s infinite alternate',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.2)' },
          '66%': { transform: 'translate(-40px, 20px) scale(0.8)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
