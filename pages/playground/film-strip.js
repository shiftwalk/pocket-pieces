import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m, useScroll, useMotionValueEvent } from 'framer-motion'
import { NextSeo } from 'next-seo'
import CrosshairIcon from '@/icons/crosshair.svg'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function FilmStrip() {
  const { scrollY } = useScroll()
  const horiScroller = useRef(null)
  const horiScrollerItem1 = useRef(null)
  const horiScrollerItem2 = useRef(null)
  const horiScrollerItem3 = useRef(null)
  
  useEffect(() => {
    horiScroller.current.style.transform = `translateX(-20vw)`
  });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    horiScroller.current.style.transform = `translateX(-${(20) + latest / 100}vw)`;
    horiScrollerItem1.current.style.transform = `rotate(${(latest - 100) / 1000}deg), translateY(-20px)`;
    horiScrollerItem2.current.style.transform = `rotate(${(latest - 50) / 1000}deg)`;
    horiScrollerItem3.current.style.transform = `rotate(${latest / 1000}deg), translateY(20px)`;
  })
  
  return (
    <Layout>
      <NextSeo title="Film Strip Playground" />

      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <m.div variants={fade} className="bg-off-white">
            <main className="mb-12 md:mb-16 xl:mb-24 pt-14 lg:pt-16">
              <Container>
                <m.div variants={fade}>
                  <div className="pt-[8vw] pb-[9vw]">
                    <div className="w-[70px] lg:w-[90px] mx-auto mb-5">
                      <LogoMarkOutlinedIcon className="w-full" />
                    </div>
                    <h1 className="text-[13vw] md:text-[11.5vw] lg:text-[9vw] mb-4 leading-[0.75] md:leading-[0.75] lg:leading-[0.75] text-center px-[10vw]">Prestige, one-of-a-kind pieces to sustainably style out your wardrobe.</h1>
                  </div>
                </m.div>
              </Container>

              <m.div variants={fade} className="bg-black text-off-white">
                <div className="px-4 lg:px-6 pt-3 lg:pt-5 pb-3 lg:pb-6">
                  <div className="flex flex-wrap w-full items-center px-[5vw]">
                    <div className="relative block">
                      <span className="block scale-y-[50%] scale-x-[120%] text-4xl leading-none opacity-10 blur-[2px]" role="presentation" aria-hidden="true">►</span>
                      <span className="block scale-y-[50%] scale-x-[120%] text-4xl leading-none opacity-30 blur-[2px] absolute inset-0 translate-y-[3px] translate-x-[-3px] select-none" role="presentation" aria-hidden="true" tabIndex="-1">►</span>
                    </div>

                    <span className="block opacity-30 font-bold mx-auto pl-[20vw] text-sm lg:text-lg blur-[1px] select-none" role="presentation" aria-hidden="true" tabIndex="-1">KODAK FILM 400</span>
                  </div>
                </div>

                <div className="w-full overflow-hidden">
                  <m.div className="whitespace-nowrap py-8 lg:py-12 will-change-transform" ref={horiScroller}>
                    <div className="w-[45vw] lg:w-[35vw] h-[63vw] lg:h-[50vw] mx-[5.5vw] lg:mx-[7.5vw] overflow-hidden rounded-3xl inline-block rotate-2 blur-[2px] relative will-change-transform" ref={horiScrollerItem1}>
                      <div className="inner-shadow absolute inset-0 w-full h-full z-[1]"></div>
                      <Image src="https://placedog.net/700/940" width={700} height={940} className="block absolute inset-0 w-full h-full object-cover object-center z-[-1]" alt="placeholder" priority />
                    </div>

                    <div className="w-[45vw] lg:w-[35vw] h-[63vw] lg:h-[50vw] mx-[5.5vw] lg:mx-[7.5vw] overflow-hidden rounded-3xl inline-block relative group will-change-transform" ref={horiScrollerItem2}>
                      <div className="inner-shadow absolute inset-0 w-full h-full z-[3]"></div>
                      <Image src="https://placedog.net/700/940" width={700} height={940}  className="block absolute inset-0 w-full h-full object-cover object-center z-[-1]" alt="placeholder" priority />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-[330ms] z-[2]">
                        <div className="absolute inset-y-[6%] inset-x-[7%] border-white border flex items-center justify-center z-[2]">
                          <div className="w-[20%] lg:w-[10%] text-white">
                            <CrosshairIcon className="w-full pointer-events-none" />
                          </div>
                        </div>

                        <div className="absolute inset-0 z-[1]">
                          <Image src="https://placedog.net/700/900" width={700} height={900}  className="block w-full h-full pointer-events-none object-cover object-center" alt="placeholder" />
                        </div>
                      </div>
                    </div>

                    <div className="w-[45vw] lg:w-[35vw] h-[63vw] lg:h-[50vw] mx-[5.5vw] lg:mx-[7.5vw] overflow-hidden rounded-3xl inline-block rotate-1 blur-[2px] relative will-change-transform" ref={horiScrollerItem3}>
                      <div className="inner-shadow absolute inset-0 w-full h-full z-[1]"></div>
                        <Image src="https://placedog.net/700/940" width={700} height={940} className="block absolute inset-0 w-full h-full object-cover object-center z-[-1]" alt="placeholder" priority />
                    </div>
                  </m.div>
                </div>
                
                <div className="px-4 lg:px-6 pt-3 lg:pt-5 pb-3 lg:pb-6">
                  <div className="px-[10vw]">
                    <span className="block opacity-30 font-bold blur-[1px] text-sm lg:text-lg select-none" role="presentation" aria-hidden="true" tabIndex="-1">FF 1 2010 TX</span>
                  </div>
                </div>
              </m.div>
            </main>

            <m.div variants={fade}>
              <div className="mt-[200vw]">
                <Footer />
              </div>
            </m.div>
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}
