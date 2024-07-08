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
        'header-small': '4rem',
        'body': 'calc(100vh - 8rem)',
        'body-large': 'calc(100vh - 4rem)',
        'main': 'calc(100vh - 10rem',
        'options': 'calc(100vh - 28rem)',
        'options-small': 'calc(100vh - 25rem)',
      },
      width: {
        'powerups': 'calc(100vw - 10rem)',
      },
      keyframes: {
        freeze: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        freeze: 'freeze 30s linear forwards',
      },
    },
  },
  plugins: [],
}