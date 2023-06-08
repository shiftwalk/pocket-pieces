import '@/styles/main.css'
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import Header from '@/components/header';
import SEO from '@/helpers/seo.config';
import { CartProvider } from '@/context/store'
import { CartOpenContext } from '@/context/cart'
import { ViewContext } from '@/context/view'
import { IntroContext } from '@/context/intro'
import { Lenis as ReactLenis } from '@studio-freight/react-lenis'
import { IBMPlexMono, GrifinitoL, FTCalhern } from '@/helpers/fonts';
import { useState } from 'react';
import LogoIcon from '@/icons/logo.svg'
import LogoMarkIcon from "@/icons/logomark.svg";
import CrosshairIcon from '@/icons/crosshair.svg'
import StarIcon from '@/icons/star.svg';

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [cartIsOpenContext, setCartIsOpenContext] = useState(false);
  const [currentView, setCurrentView] = useState('reel');
  const [introContext, setIntroContext] = useState(false);

  let bgColor = 'bg-zinc-100'
  router.asPath == '/' && (bgColor = 'bg-zinc-100')
  router.asPath.includes('/hire') && (bgColor = 'bg-off-white')
  router.asPath.includes('/about') && (bgColor = 'bg-off-white')
  router.asPath.includes('/faqs') && (bgColor = 'bg-black')
  router.asPath.includes('/menu') && (bgColor = 'bg-black')

  const introEnd = {
    visible: { opacity:  1 },
    hidden: { opacity: 0 }
  }

  const revealDown = {
    visible: { y: 0 },
    hidden: { y: '100%' }
  }

  const revealUp = {
    visible: { y: 0 },
    hidden: { y: '-100%' }
  }

  const introBackdrop = {
    visible: {
      backdropFilter: "blur(50px)",
      opacity: 0
    },
    hidden: {
      backdropFilter: ["blur(30px)","blur(5px)","blur(25px)", "blur(40px)","blur(0px)","blur(0px)"],
      opacity: [1,1,1,1,1,0]
    }
  }

  const introFullEnd = {
    visible: { visibility: 'block' },
    hidden: { visibility: 'hidden' }
  }

  return (
    <ReactLenis root>
      <div id="app">
        <DefaultSeo {...SEO} /> 
        <IntroContext.Provider value={[introContext, setIntroContext]}>
          {/* <FPSStats bottom={10} left={10} top="auto" /> */}
          {/* <div className={`grain fixed inset-0 z-[1000] pointer-events-none mix-blend-darken`}></div> */}
          
          { pageProps.preview && (<div className={'fixed bottom-0 left-0 w-auto px-3 py-2 bg-red-600 text-white justify-center flex z-[200] uppercase font-mono text-sm m-3'}>Preview Mode - <a className={'px-1 underline'} href={`/api/exit-preview?currentRoute=${router.route}`}>Click To Exit</a></div>)}
          
          <CartProvider>
            <ViewContext.Provider value={[currentView, setCurrentView]}>
              <CartOpenContext.Provider value={[cartIsOpenContext, setCartIsOpenContext]}>

                <LazyMotion features={domAnimation}>
                  { !introContext && (
                    <>
                      <m.div 
                        initial="visible"
                        animate="hidden"
                        variants={introBackdrop}
                        transition={{ duration: 3, ease: [0.83, 0, 0.17, 1] }}
                        className="bg-black bg-opacity-80 text-white fixed inset-0 z-[999] pointer-events-none w-full h-screen"
                      ></m.div>
                      <m.div 
                        initial="visible"
                        animate="hidden"
                        variants={introFullEnd}
                        transition={{ delay: 2.5, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
                        className="w-full h-full cursor-wait absolute inset-0 flex items-center justify-center z-[1000]"
                      >
                        <m.div 
                          initial="visible"
                          animate="hidden"
                          variants={introEnd}
                          transition={{ delay: 1.5, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
                          className="absolute inset-0"
                        >
                          <div className="w-full">
                            <div className="mx-auto max-w-[700px]">
                              <div className="absolute inset-y-[20%] inset-x-[10%] border-white border flex items-center justify-center z-[20]">
                                <div className="absolute top-0 left-0 text-white py-3 px-3 leading-none z-[20]" >
                                  <div className="relative overflow-hidden">
                                  <m.span 
                                    initial="visible"
                                    animate="hidden"
                                    variants={revealUp}
                                    transition={{ delay: 1.5, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
                                    className={`block uppercase text-sm`}
                                  >
                                      <LogoMarkIcon className="w-[30px]" />
                                    </m.span>
                                  </div>
                                </div>

                                <div className="block absolute top-0 right-0 text-sm uppercase text-white py-2 px-3 leading-none z-[20]" >
                                  <div className="relative overflow-hidden">
                                    <m.span 
                                    initial="visible"
                                    animate="hidden"
                                    variants={revealUp}
                                    transition={{ delay: 1.5, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
                                    className={`block uppercase text-sm`}>LOADING_SITE</m.span>
                                  </div>
                                </div>

                                <div className="w-[20%] lg:w-[10%] text-white max-w-[55px]">
                                  <CrosshairIcon className={`w-full pointer-events-none animate-blink`} />
                                </div>

                                <div className="block absolute bottom-0 left-0 text-sm uppercase text-white py-2 px-3 leading-none z-[20]" >
                                  <div className="relative overflow-hidden">
                                    <m.span 
                                    initial="visible"
                                    animate="hidden"
                                    variants={revealDown}
                                    transition={{ delay: 1.5, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
                                    className={`block uppercase text-sm`}>P_P_001</m.span>
                                  </div>
                                </div>

                                <div className="block absolute bottom-0 right-0 text-sm uppercase text-white py-3 px-3 leading-none z-[20]" >
                                  <div className="overflow-hidden relative">
                                    <m.span 
                                      initial="visible"
                                      animate="hidden"
                                      variants={revealDown}
                                      transition={{ delay: 1.5, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
                                      className={`block uppercase text-sm`}
                                    >
                                      <StarIcon className={`w-10`} />
                                    </m.span>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="w-9/12 lg:w-10/12 mx-auto">
                                <LogoMarkOutlinedIcon className={`w-[75px] lg:w-[100px] mb-8 mx-auto text-zinc-100`} />
                                <LogoIcon className={`w-full mb-8 text-zinc-100`} />
                              </div>

                              <div className="w-10/12 lg:w-10/12 mx-auto">
                                <p className="text-base lg:text-lg xl:text-xl text-zinc-100 text-center">Prestige, one-of-a-kind pieces to sustainably style out your wardrobe.</p>
                              </div> */}
                            </div>
                          </div>
                        </m.div>
                      </m.div>
                    </>
                  )}
                </LazyMotion>

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

                <div className={`${IBMPlexMono.variable} ${GrifinitoL.variable} ${FTCalhern.variable} font-mono transition-colors ease-[cubic-bezier([0.83,0,0.17,1])] duration-[1000ms] ${bgColor}`}>
                  <Header dark={(router.asPath.includes('/faqs') || router.asPath == '/menu') ? true : false} />

                  <AnimatePresence mode="wait" initial={false}>
                    <Component {...pageProps} key={router.asPath} />
                  </AnimatePresence>
                </div>

                
              </CartOpenContext.Provider>
            </ViewContext.Provider>
          </CartProvider>
        </IntroContext.Provider>
      </div>
    </ReactLenis>
  )
}