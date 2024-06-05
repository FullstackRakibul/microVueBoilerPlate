/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3A83F1",
          DEFAULT: "#1E3A8A",
          dark: "#1E2B8A",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
