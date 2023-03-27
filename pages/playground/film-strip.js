import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Button from '@/components/button'
import CrosshairIcon from '@/icons/crosshair.svg'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";

export default function Buttons() {
  return (
    <Layout>
      <NextSeo title="Buttons Playground" />

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
                      <span className="block scale-y-[50%] scale-x-[120%] text-4xl leading-none opacity-10 blur-[2px]">►</span>
                      <span className="block scale-y-[50%] scale-x-[120%] text-4xl leading-none opacity-30 blur-[2px] absolute inset-0 translate-y-[3px] translate-x-[-3px]">►</span>
                    </div>

                    <span className="block opacity-30 font-bold mx-auto pl-[20vw] text-sm lg:text-lg blur-[1px]">KODAK FILM 400</span>
                  </div>
                </div>

                <div className="w-full overflow-hidden">
                  <div className="whitespace-nowrap py-8 lg:py-12 translate-x-[-33.3vw] lg:translate-x-[-25vw]">
                    <div className="w-[45vw] lg:w-[35vw] h-[63vw] lg:h-[50vw] mx-[5.5vw] lg:mx-[7.5vw] overflow-hidden rounded-3xl inline-block rotate-2 blur-[2px] translate-y-[-20px] relative">
                      <div className="inner-shadow absolute inset-0 w-full h-full z-[1]"></div>
                      <img src="https://placedog.net/700/940" className="block absolute inset-0 w-full h-full object-cover object-center z-[-1]" />
                    </div>

                    <div className="w-[45vw] lg:w-[35vw] h-[63vw] lg:h-[50vw] mx-[5.5vw] lg:mx-[7.5vw] overflow-hidden rounded-3xl inline-block relative group">
                      <div className="inner-shadow absolute inset-0 w-full h-full z-[3]"></div>
                      <img src="https://placedog.net/700/940" className="block absolute inset-0 w-full h-full object-cover object-center z-[-1]" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-[330ms] z-[2]">
                        <div className="absolute inset-y-[6%] inset-x-[7%] border-white border flex items-center justify-center z-[2]">
                          <div className="w-[20%] lg:w-[10%] text-white">
                            <CrosshairIcon className="w-full pointer-events-none" />
                          </div>
                        </div>

                        <div className="absolute inset-0 z-[1]">
                          <img src="https://placedog.net/700/900" className="block w-full h-full pointer-events-none object-cover object-center" />
                        </div>
                      </div>
                    </div>

                    <div className="w-[45vw] lg:w-[35vw] h-[63vw] lg:h-[50vw] mx-[5.5vw] lg:mx-[7.5vw] overflow-hidden rounded-3xl inline-block rotate-1 blur-[2px] translate-y-[20px] relative">
                      <div className="inner-shadow absolute inset-0 w-full h-full z-[1]"></div>
                      <img src="https://placedog.net/700/940" className="block absolute inset-0 w-full h-full object-cover object-center z-[-1]" />
                    </div>
                  </div>
                </div>
                
                <div className="px-4 lg:px-6 pt-3 lg:pt-5 pb-3 lg:pb-6">
                  <div className="px-[10vw]">
                    <span className="block opacity-30 font-bold blur-[1px] text-sm lg:text-lg">FF 1 2010 TX</span>
                  </div>
                </div>
              </m.div>
            </main>

            <m.div variants={fade}>
              <Footer />
            </m.div>
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}
