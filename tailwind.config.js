/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'india-saffron': '#FF9933',
        'india-green': '#138808',
        'india-blue': '#000080',
      }
    },
  },
  plugins: [],
}
