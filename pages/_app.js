import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import SEO from '@/helpers/seo.config';
import { IBMPlexMono, GrifinitoL, FTCalhern } from '@/helpers/fonts';

export default function App({ Component, pageProps }) {
  const router = useRouter()
  return (

      <div id="app">
        <DefaultSeo {...SEO} /> 
        <div className="grainn"></div>

        <div className={`${IBMPlexMono.variable} ${GrifinitoL.variable} ${FTCalhern.variable} font-mono`}>
          <AnimatePresence mode="wait" initial={false}>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </div>
              
      </div>

  )
}