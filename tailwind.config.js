/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-color)",
        interface: "var(--interface-color)",
        "interface-hover": "var(--interface-hover-color)",
        "primary-text-color": "var(--text-color)",
        "second-text-color": "var(--text-second-color)",
        "calendar-red": "var(--calendar-red)",
      },
    },
  },
  plugins: [],
};
