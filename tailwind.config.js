module.exports = {
  purge: [
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_posts/*.md",
    "./*.html",
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        "press-start": ['"Press Start 2P"', "serif"],
        sans: ['"Inter"', "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
