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
    }
  },
  plugins: [],
}

