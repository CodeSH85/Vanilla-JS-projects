/** @type {import('tailwindcss').Config} */

for(let i = 0; i <= 360; i++) {
  if(i % 30 === 0 && i != 0) {
    let obj = {
      
    }
  }
  if(i%6 === 0 && i!==0) {
  }
}

module.exports = {
  // content: ["./src/**/*.{html,js}"],
  content: [
    "./src/**/*.{html,js}",
    "./*.{html,js}",
  ],
  theme: {
    // colors: {

    // },
    fontFamily: {
      sans: ['Helvetica','sans-serif'],
      serif: ['serif']
    },
    extend: {
      rotate: {
        '30': '30deg',
        '60': '60deg',
        '90': '90deg',
        '120': '120deg',
        '150': '150deg',
        '180': '180deg',
        '210': '210deg',
        '240': '240deg',
        '270': '270deg',
        '300': '300deg',
        '330': '330deg',
        '360': '360deg',
      }
    },
  },
  plugins: [],
}
