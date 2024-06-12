/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      // Create your own at: https://javisperez.github.io/tailwindcolorshades
      colors: {
        primary: colors.red,
        secondary: colors.emerald,
        tertiary: colors.blue,
        success: colors.green,
        danger: colors.rose,
        gray: colors.neutral,
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
     
    require('flowbite/plugin')
  ]
}

