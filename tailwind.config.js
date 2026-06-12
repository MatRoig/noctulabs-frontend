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
        syne: ['Syne', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'noct-bg': '#060413',
        'noct-card': '#0c0926',
        'noct-border': '#1b1440',
        'noct-purple': '#7b2cbf',
        'noct-neon': '#9d4edd',
      },
      animation: {},
      keyframes: {}
    },
  },
  plugins: [],
}