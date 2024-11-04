const { url } = require('inspector');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xxs: '299px',
      xs: '399px',
      sm: '499px',
      md: '599px',
      lg: '799px',
      xl: '1499px',
    },
    colors: {
      'wrapper': '#dde1e7',
      'lowBlack': '#595959',
      'black': '#23262F',
      // 'blue': '#3062D4',
      'blue': '#5F259E',
      'border': '#717377'
    },
    fontFamily: {
      poppins: ["poppins", "sans sarif"]
    },
    extend: {
      backgroundImage: {
        'chatPage': "url('/src/assets/chat.jpg')" 
      }
    },
  },
  plugins: [],
}
