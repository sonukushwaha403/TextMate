/** @type {import('tailwindcss').Config} */
module.exports = {
  //which files needed to be compiled
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors:{
        red_1: "red",
      }
    },
  },
  plugins: [],
}
 
