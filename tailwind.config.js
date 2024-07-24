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
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
        marqueeSlow: 'marquee 15s linear infinite',
        marqueeSlow2: 'marquee2 15s linear infinite',
        marqueeDoubleSlow: 'marquee 250s linear infinite',
        marqueeDoubleSlow2: 'marquee2 250s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      colors: {
        'black': '#030303',
        'off-black': '#171717',
        'white': '#FFF',
        'off-white': '#E3DCD7',
      },
      fontFamily: {
        display: ['var(--font-GrifinitoL)', ...fontFamily.sans],
        mono: ['var(--font-IBMPlexMono)', ...fontFamily.mono],
        credits: ['var(--font-FTCalhern)', ...fontFamily.sans]
      },
    },
  },
  plugins: []
}