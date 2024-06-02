// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14A800',
        negro: '#1F1F1F',
        badged: '#E7FFEC',
        plomo: '#5E6D55',
        blackCustom: '#858585',
      }
    },
  },
  darkMode: "class",
  plugins: [],
  animation: {
    'infinite-scroll': 'infinite-scroll 25s linear infinite',
  },
  keyframes: {
    'infinite-scroll': {
      from: { transform: 'translateX(0)' },
      to: { transform: 'translateX(-100%)' },
    }
  }
};
