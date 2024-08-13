/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightgreen: "#3BB273",
        gray: "#8D909B",
        blue: "#D6EEFF",
        purple: "#7768AE",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
