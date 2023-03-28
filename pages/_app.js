import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import SEO from '@/helpers/seo.config';
import { IBMPlexMono, GrifinitoL } from '@/helpers/fonts';
import FancyLink from '@/components/fancyLink';
import Header from '@/components/header';
import FPSStats from "react-fps-stats";

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <DefaultSeo {...SEO} /> 
      {/* <FPSStats bottom={10} left={10} top="auto" /> */}
      {/* <div className={`grain fixed inset-0 z-[1000] pointer-events-none mix-blend-darken`}></div> */}

      <svg xmlns='http://www.w3.org/2000/svg' className="fixed inset-0 z-[500] pointer-events-none invert w-full h-screen object-cover opacity-[0.225]">
        <filter id='noiseFilter'>
          <feTurbulence 
            type='fractalNoise' 
            baseFrequency='2.52' 
            numOctaves='2' 
            stitchTiles='stitch'
          />
        </filter>
        
        <rect width='100%' height='100%' filter='url(#noiseFilter)' />
      </svg>

      <div className={`${IBMPlexMono.variable} ${GrifinitoL.variable} font-mono`}>
        <Header dark={router.asPath == '/info' ? true : false} />

        {/* <FancyLink nav active={ router.asPath.includes('/playground') ? true : false } destination="/playground" a11yText="Navigate to dev playground" className="fixed z-[100] bottom-0 right-0 block bg-black text-white uppercase p-3 m-3 text-sm" label="Dev Playground" /> */}

        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </div>
    </>
  )
}