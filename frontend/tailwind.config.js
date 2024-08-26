import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f97316",
        secondary: "#243373"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    defaultTheme: "light",
    defaultExtendTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#f97316",
          secondary: "#243373"
        },
      },
      dark: {
        colors: {
          primary: "#243373",
          secondary: "#f97316"
        },
      },
    },
  }),],
};
