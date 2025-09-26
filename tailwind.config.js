// tailwind.config.js
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
        brand: {
          gold: "#DEA15E",
          maroon: "#844443",
          plum: "#3B2533",
          navy: "#0D1427",
          blue: "#0C2B4A",
          steel: "#356184",
        }
      },
    },
  },
  plugins: [],
}
