/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/screens/*.tsx',
    './src/components/*.tsx' 
  ],
  theme: {
    extend: {},
    colors:{
      "intense-sky-blue":"#78b5fa",
      "deep-eletric-blue":"#19589e"
    }
  },
  plugins: [],
}