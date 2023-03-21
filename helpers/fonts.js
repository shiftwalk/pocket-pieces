import localFont from 'next/font/local'

export const IBMPlexMono = localFont({
  src: [
    {
      path: '../public/fonts/IBMPlexMono.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexMono-Light.woff2',
      weight: '300',
      style: 'normal',
    }
  ],
  subsets: ['latin'],
  variable: '--font-IBMPlexMono',
})

export const GrifinitoL = localFont({
  src: [
    {
      path: '../public/fonts/GrifinitoL-Light.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  subsets: ['latin'],
  variable: '--font-GrifinitoL',
})