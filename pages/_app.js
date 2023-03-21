import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import SEO from '@/helpers/seo.config';
import localFont from 'next/font/local'

const IBMPlexMono = localFont({
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

const GrifinitoL = localFont({
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


export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <DefaultSeo {...SEO} /> 

      <div className={`${IBMPlexMono.variable} ${GrifinitoL.variable} font-mono`}>
        <AnimatePresence mode="wait" initial={true}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </div>
    </>
  )
}