/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Kanit: ["Kanit", "sans-serif"],
      },
      colors: {
        "main-color": "#3d8bff",
        "dark-text": "#111111",
        "dark-text-weak": "#5d5d5d",
        "body-dark": "#212121",
        "": "",
        "": "",
        "": "",
      },
      animation: {
        spinLoader: "spin .5s linear infinite",
        spinSlow: "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
