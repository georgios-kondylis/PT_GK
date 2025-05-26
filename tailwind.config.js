/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainOrange: '#ff5b2d',
        hoverOrange: '#fd8240',
      }
    },
  },
  plugins: [],
}
