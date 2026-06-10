/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Bloque único de fontFamily fusionado
      fontFamily: {
        editorial: ['Fraunces', 'serif'],
        code: ['JetBrains Mono', 'monospace'],
        syne: ['Syne', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      colors: {
        'noct-bg': '#060413',
        'noct-card': '#0c0926',
        'noct-border': '#1b1440',
        'noct-purple': '#7b2cbf',
        'noct-neon': '#9d4edd',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}