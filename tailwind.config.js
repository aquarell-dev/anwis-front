/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      screens: {
        usm: "320px",
        sm: "425px",
        md: "768px",
        lg: "1024px",
        sxl: "1440px",
        xl: "1920px",
      },
    },
  },
  plugins: [],
};
