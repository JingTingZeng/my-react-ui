/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { width: '0%' },
          '70%, 100%': { width: '100%' },
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

