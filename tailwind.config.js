/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    fontFamily: {
      'biz': ['BIZ UDGothic', 'sans-serif'],
      'amatic': ['Amatic SC', 'cursive']
    },

    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },

    extend: {
      animation: {
        tilt: "tilt 2s infinite linear",
        animation: "bounce 1s infinite"
      },

      keyframes: {
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate (0deg)",
          },
          "25%": {
            transform: "rotate(2deg)",
          },
          "75%": {
            transform: "rotate(-2deg)",
          },
        },
      },
      
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
