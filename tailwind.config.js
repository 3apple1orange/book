/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#fafaf8",
        ink: "#0f0f0f",
        muted: "#6b6b6b",
        border: "#e4e4e0",
        blood: "#B3121B",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        script: ["var(--font-allura)", "cursive"],
        cinzel: ["var(--font-cinzel)", "serif"],
        grotesk: ["var(--font-grotesk)", "sans-serif"],
      },
    },
  },
  plugins: [],
};