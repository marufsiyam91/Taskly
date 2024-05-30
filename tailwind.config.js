/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      primary: ["Raleway", "sans-serif"],
      outfit: ["Outfit", "sans-serif"]
    },
    screens: {
      'esm': '450px',
      'sm': '640px',
      'smd': '768px',
      'md': '920px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
  },
  plugins: [],
}

