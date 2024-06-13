/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS, JSX, TS, and TSX files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        "primary":"#50A5EF",
        "primary-light":"#B9DBF9",
        "secondary":"#1687E9",
        "accent":"#8AC3F4",
        "background":"#F8FCF9",
        "text":"#030704",

        uc:{
          "l":"#F6CD90",
          "d":"#ECA130",
        },

        mc:{
          "l":"#BDD9B9",
          "d":"#5C9553",
        },

        me:{
          "l":"#B9D9D1",
          "d":"#539D8B",
        },

        tm:{
          "l":"#B5BDD6",
          "d":"#536295",
        },

        fe:{
          "l":"#D8C8EC",
          "d":"#713CB4",
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'], // Add custom font
        'archivo': ['Archivo', 'sans-serif'],
      },
      fontWeight: {
        'normal': 400,
        'bold': 700
      },
      animation: {
        blob: "blob 7s infinite",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
      keyframes: {
        blob:{
          "0%" : {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%" : {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%" : {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%" : {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

