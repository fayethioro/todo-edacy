/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {},
    colors: {
      bleu: '#0ea5e9',
      bleuhover: '#0585c8'

      // Ajoutez d'autres couleurs ici selon le même schéma...
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
