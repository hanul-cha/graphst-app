const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    colors: {
      ...colors,
      origin: '#5a469f',
    },
    extend: {},
  },
  plugins: [],
}
