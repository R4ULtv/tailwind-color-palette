/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          "light-blue": "#9CDCFE",
          purple: "#C586C0",
          blue: "#4FC1FF",
          yellow: "#ffd700",
          tan: "#CE9178",
          green: "#6A9955",
        },
      },
    },
  },
  plugins: [],
};
