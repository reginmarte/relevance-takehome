const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.js",
      "nuxt.config.js"
    ]
  },
  darkMode: false,
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#0D162F",
      white: colors.white,
      pink: colors.pink,
      yellow: colors.yellow,
      red: colors.red,
      green: colors.emerald,
      gray: colors.blueGray,
      blue: {
        50: "#EFF6FF",
        100: "#E8EEFF",
        200: "#CBD8FF",
        300: "#A9BEFD",
        400: "#80A1FF",
        500: "#4B79FE",
        600: "#1854FF",
        700: "#1A4CDC",
        800: "#183FB0",
        900: "#1C398B"
      }
    },
    extend: {
      fontFamily: {
        sans: ["Euclid Circular A", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {
      margin: ["hover", "group-hover"]
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
