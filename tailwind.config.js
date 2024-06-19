/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    container : {
      center: true,
    },
    fontFamily: {
      san : ["Montserrat", "sans-serif"]
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

