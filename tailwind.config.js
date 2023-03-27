const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'camera-focus-hover',
    'camera-focus-hover--image'
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
      "3xl": "1920px"
    },
    extend: {
      colors: {
        'black': '#171717',
        'white': '#FFF',
        'off-white': '#E3DCD7',
      },
      fontFamily: {
        display: ['var(--font-GrifinitoL)', ...fontFamily.sans],
        mono: ['var(--font-IBMPlexMono)', ...fontFamily.mono],
      },
    },
  },
  plugins: []
}