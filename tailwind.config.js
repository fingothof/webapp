/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "brand": {
        "50": "#EBEBFF",
        "100": "#D2D2FE",
        "200": "#A6A4FE",
        "300": "#7E7CFD",
        "400": "#524FFD",
        "500": "#2522FC",
        "600": "#0703E2",
        "700": "#0502AB",
        "800": "#03026F",
        "900": "#020137"
      }
    }
  },
  plugins: [],
}