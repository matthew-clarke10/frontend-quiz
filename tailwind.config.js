/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'header': '8rem',
        'body': 'calc(100vh - 8rem)',
        'main': 'calc(100vh - 10rem',
      },
    },
  },
  plugins: [],
}