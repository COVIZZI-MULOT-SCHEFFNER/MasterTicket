/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'night-blue': '#0a192f',
        'sky-300': '#7fadff',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

