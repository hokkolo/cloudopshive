// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Merriweather", "ui-serif", "Georgia"],
      },
      typography: {
        DEFAULT: {
          css: {
            h1: { fontFamily: "Inter, sans-serif" },
            h2: { fontFamily: "Inter, sans-serif" },
            h3: { fontFamily: "Inter, sans-serif" },
            p: { fontFamily: "Merriweather, serif" },
            li: { fontFamily: "Merriweather, serif" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

