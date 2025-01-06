/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#0F172A",
        themeGrey: "#393A40",
        warnYellow: "#FFDC2A",
      },
    },
  },
  plugins: [],
};
