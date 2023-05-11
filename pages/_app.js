import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import Header from '@/components/header';
import SEO from '@/helpers/seo.config';
import { CartProvider } from '@/context/store'
import { CartOpenContext } from '@/context/cart'
import { IBMPlexMono, GrifinitoL, FTCalhern } from '@/helpers/fonts';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [cartIsOpenContext, setCartIsOpenContext] = useState(false);

  return (
    <>
      <DefaultSeo {...SEO} /> 
      {/* <FPSStats bottom={10} left={10} top="auto" /> */}
      {/* <div className={`grain fixed inset-0 z-[1000] pointer-events-none mix-blend-darken`}></div> */}
      
      { pageProps.preview && (<div className={'fixed bottom-0 left-0 w-auto px-3 py-2 bg-red-600 text-white justify-center flex z-[200] uppercase font-mono text-sm m-3'}>Preview Mode - <a className={'px-1 underline'} href={`/api/exit-preview?currentRoute=${router.route}`}>Click To Exit</a></div>)}

      <CartProvider>
        <CartOpenContext.Provider value={[cartIsOpenContext, setCartIsOpenContext]}>
          <div className="grainn"></div>
          {/* <svg xmlns='http://www.w3.org/2000/svg' className="fixed inset-0 z-[1000] pointer-events-none invert w-full h-screen object-cover opacity-[0.14]">
            <filter id='noiseFilter'>
              <feTurbulence 
                type='fractalNoise' 
                baseFrequency='2.52' 
                numOctaves='2' 
                stitchTiles='stitch'
              />
            </filter>
            
            <rect width='100%' height='100%' filter='url(#noiseFilter)' />
          </svg> */}

          <div className={`${IBMPlexMono.variable} ${GrifinitoL.variable} ${FTCalhern.variable} font-mono`}>
            <Header dark={(router.asPath.includes('/faqs') || router.asPath == '/menu') ? true : false} />

            <AnimatePresence mode="wait" initial={false}>
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
          </div>
        </CartOpenContext.Provider>
      </CartProvider>
    </>
  )
}