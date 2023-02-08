/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,tsx,jsx}',
    './components/**/*.{js,ts,tsx,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#231955',
        secondary: '#90AACB',
        terciary: '#F9D5A7'
      }
    }
  },
  plugins: []
}
