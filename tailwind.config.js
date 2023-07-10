const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    colors: {
      ...colors,
      current: '#5a469f',
    },
    extend: {},
  },
  plugins: [],
}
