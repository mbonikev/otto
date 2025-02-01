/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        Inter: ["Inter", "sans-serif"],
        Kanit: ["Kanit", "sans-serif"],
      },
      colors:{
        "main-color": "#0066ff",
        "dark-text": "#111111",
        "dark-text-weak": "#5d5d5d",
        "": "",
      },
    },
  },
  plugins: [],
};
