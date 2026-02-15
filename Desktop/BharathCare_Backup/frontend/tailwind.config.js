/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#1C2F5E',
        'teal-blue': '#49B6C6',
        'light-aqua': '#7EDCE2',
        'light-bg': '#F4F7FB',
        'dark-gray': '#1F2937',
        'muted-gray': '#6B7280',
      },
    },
  },
  plugins: [],
}