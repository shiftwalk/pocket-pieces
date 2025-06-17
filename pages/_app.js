import "@/styles/main.css";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import Header from "@/components/header";
import SEO from "@/helpers/seo.config";
import { CartProvider } from "@/context/cartProvider";
import { CartOpenContext } from "@/context/cart";
import { ViewContext } from "@/context/view";
import { IntroContext } from "@/context/intro";
import { Lenis as ReactLenis } from "@studio-freight/react-lenis";
import { IBMPlexMono, GrifinitoL, FTCalhern } from "@/helpers/fonts";
import { useState } from "react";
import LogoIcon from "@/icons/logo.svg";
import LogoMarkIcon from "@/icons/logomark.svg";
import CrosshairIcon from "@/icons/crosshair.svg";
import StarIcon from "@/icons/star.svg";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [cartIsOpenContext, setCartIsOpenContext] = useState(false);
  const [currentView, setCurrentView] = useState("gallery");
  const [introContext, setIntroContext] = useState(false);

  let bgColor = "bg-zinc-100";
  router.asPath == "/" && (bgColor = "bg-zinc-100");
  router.asPath.includes("/hire") && (bgColor = "bg-off-white");
  router.asPath.includes("/about") && (bgColor = "bg-off-white");
  router.asPath.includes("/faqs") && (bgColor = "bg-black");
  router.asPath.includes("/menu") && (bgColor = "bg-black");

  const introEnd = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const revealDown = {
    visible: { y: 0 },
    hidden: { y: "100%" },
  };

  const revealUp = {
    visible: { y: 0 },
    hidden: { y: "-100%" },
  };

  const introBackdrop = {
    visible: {
      backdropFilter: "blur(40px)",
    },
    hidden: {
      backdropFilter: ["blur(40px)", "blur(10px)", "blur(25px)", "blur(0px)"],
    },
  };

  const introFullEnd = {
    visible: { visibility: "block" },
    hidden: { visibility: "hidden" },
  };

  return (
    <ReactLenis root>
      <div id="app">
        <DefaultSeo {...SEO} />
        <IntroContext.Provider value={[introContext, setIntroContext]}>
          {/* <FPSStats bottom={10} left={10} top="auto" /> */}
          {/* <div className={`grain fixed inset-0 z-[1000] pointer-events-none mix-blend-darken`}></div> */}

          {pageProps.preview && (
            <div
              className={
                "fixed bottom-0 left-0 w-auto px-3 py-2 bg-red-600 text-white justify-center flex z-[200] uppercase font-mono text-sm m-3"
              }
            >
              Preview Mode -{" "}
              <a
                className={"px-1 underline"}
                href={`/api/exit-preview?currentRoute=${router.route}`}
              >
                Click To Exit
              </a>
            </div>
          )}

          <CartProvider>
            <ViewContext.Provider value={[currentView, setCurrentView]}>
              <CartOpenContext.Provider
                value={[cartIsOpenContext, setCartIsOpenContext]}
              >
                <LazyMotion features={domAnimation}>
                  {!introContext && router.asPath == "/" && (
                    <>
                      <m.div
                        initial="visible"
                        animate="hidden"
                        variants={introBackdrop}
                        transition={{ duration: 2, ease: [0.83, 0, 0.17, 1] }}
                        className="bg-zinc-100 bg-opacity-0 text-black fixed inset-0 z-[9999] pointer-events-none w-full h-screen"
                      ></m.div>
                      <m.div
                        initial="visible"
                        animate="hidden"
                        variants={introFullEnd}
                        transition={{
                          delay: 1.75,
                          duration: 0.5,
                          ease: [0.83, 0, 0.17, 1],
                        }}
                        className="w-full h-full cursor-wait absolute inset-0 flex items-center justify-center z-[9999]"
                      >
                        <m.div
                          initial="visible"
                          animate="hidden"
                          variants={introEnd}
                          transition={{
                            delay: 1.33,
                            duration: 0.5,
                            ease: [0.83, 0, 0.17, 1],
                          }}
                          className="absolute inset-0"
                        >
                          <div className="h-full w-full lg:w-8/12 max-w-[65vh] 2xl:max-w-[720px] pt-[130px] pb-[50px] relative z-20 mx-auto px-4 lg:px-6">
                            <div className="flex flex-wrap w-full h-full p-4 mx-auto lg:p-6">
                              <div className="w-full">
                                <div className="relative h-full mx-auto">
                                  <div className="absolute inset-0 border-black border flex items-center justify-center z-[20]">
                                    <div className="absolute top-0 left-0 text-black py-3 px-3 leading-none z-[20]">
                                      <div className="relative overflow-hidden">
                                        <m.span
                                          initial="visible"
                                          animate="hidden"
                                          variants={revealUp}
                                          transition={{
                                            delay: 1.33,
                                            duration: 0.33,
                                            ease: [0.83, 0, 0.17, 1],
                                          }}
                                          className={`block uppercase text-sm`}
                                        >
                                          <LogoMarkIcon className="w-[30px]" />
                                        </m.span>
                                      </div>
                                    </div>

                                    <div className="block absolute top-0 right-0 text-sm uppercase text-black py-2 px-3 leading-none z-[20]">
                                      <div className="relative overflow-hidden">
                                        <m.span
                                          initial="visible"
                                          animate="hidden"
                                          variants={revealUp}
                                          transition={{
                                            delay: 1.33,
                                            duration: 0.33,
                                            ease: [0.83, 0, 0.17, 1],
                                          }}
                                          className={`block uppercase text-sm`}
                                        >
                                          LOADING_SITE
                                        </m.span>
                                      </div>
                                    </div>

                                    <div className="flex flex-wrap justify-center w-full text-black">
                                      <m.div
                                        initial="visible"
                                        animate="hidden"
                                        variants={introEnd}
                                        transition={{
                                          delay: 0.99,
                                          duration: 0.33,
                                          ease: [0.83, 0, 0.17, 1],
                                        }}
                                        className="w-[20%] lg:w-[10%] text-black max-w-[40px]"
                                      >
                                        <CrosshairIcon
                                          className={`w-full pointer-events-none animate-blink--delay`}
                                        />
                                      </m.div>
                                      <div className="relative w-full mt-4 overflow-hidden">
                                        <m.span
                                          initial="hidden"
                                          animate="visible"
                                          variants={revealDown}
                                          transition={{
                                            delay: 0.3,
                                            duration: 0.33,
                                            ease: [0.83, 0, 0.17, 1],
                                          }}
                                          className={`block uppercase text-sm text-center`}
                                        >
                                          P_P_READY
                                        </m.span>
                                      </div>
                                    </div>

                                    <div className="block absolute bottom-0 left-0 text-sm uppercase text-black py-2 px-3 leading-none z-[20]">
                                      <div className="relative overflow-hidden">
                                        <m.span
                                          initial="visible"
                                          animate="hidden"
                                          variants={revealDown}
                                          transition={{
                                            delay: 1.33,
                                            duration: 0.33,
                                            ease: [0.83, 0, 0.17, 1],
                                          }}
                                          className={`block uppercase text-sm`}
                                        >
                                          P_P_001
                                        </m.span>
                                      </div>
                                    </div>

                                    <div className="block absolute bottom-0 right-0 text-sm uppercase text-black py-3 px-3 leading-none z-[20]">
                                      <div className="relative overflow-hidden">
                                        <m.span
                                          initial="visible"
                                          animate="hidden"
                                          variants={revealDown}
                                          transition={{
                                            delay: 1.33,
                                            duration: 0.33,
                                            ease: [0.83, 0, 0.17, 1],
                                          }}
                                          className={`block uppercase text-sm`}
                                        >
                                          <StarIcon className={`w-10`} />
                                        </m.span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
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

                <div
                  className={`${IBMPlexMono.variable} ${GrifinitoL.variable} ${FTCalhern.variable} font-mono transition-colors ease-[cubic-bezier([0.83,0,0.17,1])] duration-[1000ms] ${bgColor}`}
                >
                  <Header
                    dark={
                      router.asPath.includes("/faqs") ||
                      router.asPath == "/menu"
                        ? true
                        : false
                    }
                  />

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
  );
}
