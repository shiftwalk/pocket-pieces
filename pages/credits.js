import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domMax, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Polaroid from '@/components/polaroid'
import Button from '@/components/button'

export default function Credits() {
  const tickerItems = ['#223', '#113', '#19', '#94', '#211', '#65', '#3', '#122', '#10', '#113', '#84', '#43', '#29', '#223', '#113', '#19', '#94', '#211', '#65', '#3', '#122', '#10', '#113', '#84', '#43', '#29', '#223', '#113', '#19', '#94', '#211', '#65', '#3', '#122', '#10', '#113' ]

  return (
    <Layout>
      <NextSeo title="Credits" />

      <LazyMotion features={domMax}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <div className="pt-[78px] lg:pt-[90px] overflow-hidden">
            <div className="fixed inset-0 pointer-events-none scale-[1.15]"></div>
            <main className="mb-12 md:mb-16 xl:mb-24 relative z-[20]">
              <Container>
                <m.div variants={fade} className="mb-[15vw] lg:mb-[10vw]">
                  <div className="flex flex-wrap mb-[20vw] lg:mb-[15vw] xl:mb-[12.5vw] relative">
                    <div className="w-full lg:w-1/2 relative z-[20] pointer-events-none">
                      <h1 className="text-[30vw] lg:text-[20vw] mb-4 leading-[0.8] lg:leading-[0.8]">The Credits</h1>

                      <div className="content mb-[5vw]">
                        <p className="text-base lg:text-lg w-[80%] lg:w-[70%] max-w-3xl">A celebration of Pocket Pieces in the wild. Artefacts, accessories & fashion as snapshots in time.</p>
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                      <Image src="/images/credits-hero.jpg" width={1644 } height={1794} className="block w-full" alt="placeholder" priority />
                    </div>
                    
                    <m.div 
                      drag
                      dragMomentum={false}
                      className="absolute bottom-[-22vw] left-[-15vw] w-[35vw] cursor-grab"
                    >
                      <Polaroid
                        className="rotate-[13deg]"
                        image="/images/cleopatra.jpg"
                        imageWidth={911 }
                        imageHeight={1266}
                        hoverImage="/images/cleopatra.jpg"
                        hoverImageWidth={911 }
                        hoverImageHeight={1266}
                      />
                    </m.div>

                    <m.div 
                      drag
                      dragMomentum={false}
                      className="absolute bottom-[-15vw] lg:bottom-auto lg:top-[8vw] right-[-12vw] w-[33vw] lg:w-[20vw] cursor-grab"
                    >
                      <Polaroid
                        className="rotate-[13deg]"
                        image="/images/stitch.jpg"
                        imageWidth={1045}
                        imageHeight={1045}
                        hoverImage="/images/stitch.jpg"
                        hoverImageWidth={1045}
                        hoverImageHeight={1045}
                      />
                    </m.div>

                    <m.div 
                      drag
                      dragMomentum={false}
                      className="absolute bottom-[-12vw] lg:bottom-auto lg:top-[22vw] right-[33vw] lg:right-[40vw] w-[25vw] cursor-grab"
                    >
                      <Polaroid
                        className="rotate-[-13deg]"
                        image="/images/easy-rider.jpg"
                        imageWidth={1087}
                        imageHeight={1087}
                        hoverImage="/images/easy-rider.jpg"
                        hoverImageWidth={1087}
                        hoverImageHeight={1087}
                      />
                    </m.div>
                  </div>

                  <div className="flex flex-wrap justify-center">
                    <div className="w-[15vw] lg:w-[6vw] mb-6 lg:mb-10">
                      <Image
                        priority
                        src="/icons/logomark-outlined.svg"
                        height={366}
                        width={657}
                        alt="Pocket Pieces Logomark"
                        className="w-full"
                      />
                    </div>

                    <div className="w-full relative z-[20] mb-[10vw]">
                      <h2 className="block text-[12vw] lg:text-[9vw] text-center leading-[0.75]">A celebration of Pocket Pieces in the wild. Artefacts, accessories & fashion as snapshots in time.</h2>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-start p-10">
                    <m.div
                      drag
                      dragMomentum={false}
                      className="w-[65%] lg:w-[40%] cursor-grab"
                    >
                      <Polaroid
                        metaText="Pocket Piece #01"
                        metaHeading="A Pooch In Time"
                        image="https://placedog.net/720/720"
                        hoverImage="https://placedog.net/700/700"
                      />
                    </m.div>

                    <m.div
                      drag
                      dragMomentum={false}
                      className="w-[65%] lg:w-[40%] ml-auto mt-[7vw] cursor-grab"
                    >
                      <Polaroid
                        metaText="Pocket Piece #02"
                        metaHeading="Easy Poocher"
                        image="https://placedog.net/780/780"
                        hoverImage="https://placedog.net/800/800"
                        />
                    </m.div>

                    <m.div 
                      drag
                      dragMomentum={false}
                      className="mx-auto w-[65%] lg:w-[40%] mt-[7vw] cursor-grab"
                    >
                      <Polaroid
                        metaText="Pocket Piece #03"
                        metaHeading="The Pooch Wears Prada"
                        image="https://placedog.net/900/900"
                        hoverImage="https://placedog.net/920/920"
                      />
                    </m.div>
                  </div>
                </m.div>
              </Container>

              <m.div variants={fade}>
                <div className="bg-off-black text-off-white">
                  <div class="relative flex overflow-x-hidden opacity-75 text-sm leading-none">
                    <div class="animate-marquee whitespace-nowrap py-2 will-change-transform">
                      {tickerItems.map((e, i) => {
                        return (
                          <span class="mx-1" key={i}>{e},</span>
                        )
                      })}
                    </div>

                    <div class="absolute top-0 animate-marquee2 whitespace-nowrap py-2 will-change-transform">
                      {tickerItems.map((e, i) => {
                        return (
                          <span class="mx-1" key={i}>{e},</span>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="py-[16vw] lg:py-[12vw] 2xl:py-48">
                    <Container>
                      <div className="mb-20 md:mb-24 lg:mb-32 2xl:mb-48">
                        <h2 className="text-[22vw] lg:text-[17vw] mb-4 leading-[0.8] lg:leading-[0.8] text-center mx-auto">The Archives</h2>
                        <p className="w-10/12 lg:w-1/2 max-w-[620px] mx-auto text-center text-base lg:text-lg">Previous Pocket Pieces from the history books that have since moved on to new owners. 2019 —</p>
                      </div>
                    </Container>

                      <div class="relative flex overflow-x-hidden mb-20 md:mb-24 lg:mb-32 2xl:mb-40 overflow-y-hidden">
                        <div class="animate-marqueeSlow whitespace-nowrap will-change-transform">
                          {Array.from(Array(6), (e, i) => {
                            return (
                              <span className="inline-block mx-4 md:mx-8 2xl:mx-12" key={i}>
                                <span class="inline-block bg-red-600 w-[50vw] md:w-[38vw] lg:w-[25vw] h-[66vw] md:h-[52vw] lg:h-[33vw] relative"><Image src="/images/strip-01.jpg" fill className="absolute inset-0 block w-full cover-image border-[2vw] border-white" alt="placeholder" /></span>
                                
                                <span className="block mt-2">
                                  <span className="block uppercase text-xs lg:text-sm">&quot;Easy Rider&quot;</span>

                                  <span className="font-display text-[10vw] md:text-[6.5vw] lg:text-[4.25vw] 2xl:text-[70px] leading-[0.85] md:leading-[0.85] lg:leading-[0.85] 2xl:leading-[0.85]">1980s Pink Blazer</span>
                                </span>
                              </span>
                            )
                          })}
                        </div>

                        <div class="absolute top-0 animate-marqueeSlow2 whitespace-nowrap will-change-transform">
                          {Array.from(Array(6), (e, i) => {
                            return (
                              <span className="inline-block mx-4 md:mx-8 2xl:mx-12" key={i}>
                                <span class="inline-block bg-red-600 w-[50vw] md:w-[38vw] lg:w-[25vw] h-[66vw] md:h-[52vw] lg:h-[33vw] relative"><Image src="/images/strip-01.jpg" fill className="absolute inset-0 block w-full cover-image border-[2vw] border-white" alt="placeholder" /></span>
                                
                                <span className="block mt-2">
                                  <span className="block uppercase text-xs lg:text-sm">&quot;Easy Rider&quot;</span>

                                  <span className="font-display text-[10vw] md:text-[6.5vw] lg:text-[4.25vw] 2xl:text-[70px] leading-[0.85] md:leading-[0.85] lg:leading-[0.85] 2xl:leading-[0.85]">1980s Pink Blazer</span>
                                </span>
                              </span>
                            )
                          })}
                        </div>
                      </div>

                      <Container>
                      <div className="flex justify-center">
                        <Button href="/shop" label="See latest pieces" outlineWhite className="block" />
                      </div>
                    </Container>
                  </div>
                </div>
              </m.div>
            </main>

            <m.div variants={fade}>
              <Footer />
            </m.div>
          </div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}
