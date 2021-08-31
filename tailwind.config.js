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
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: ['"Press Start 2P"'],
            },
            h2: {
              fontFamily: ['"Press Start 2P"'],
            },
            h3: {
              fontFamily: ['"Press Start 2P"'],
            },
            h4: {
              fontFamily: ['"Press Start 2P"'],
            },
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
