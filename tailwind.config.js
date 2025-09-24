/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        sage: "#A3B18A",
        beige: "#F2E8CF",
        smoke: "#FAFAFA",
        terra: "#D68C45",
        charcoal: "#2F3E46",
      },
    },
  },
  plugins: [],
}
