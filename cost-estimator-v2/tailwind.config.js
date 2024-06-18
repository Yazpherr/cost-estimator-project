/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryBlue': '#007BFF',
        'primarySkyBlue': '#6C757D',
        'custom-green': '#28A745',

      }, 
    },
  },
  plugins: [],
}

