/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,tsx,jsx}",
    "./components/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6d659c',
        'secondary': '#89888e'
      },
    },
  },
  plugins: [],
}
