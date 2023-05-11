import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domMax, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Polaroid from '@/components/polaroid'
import Button from '@/components/button'

import SanityPageService from '@/services/sanityPageService'
import { creditsQuery } from '@/helpers/queries'
import SanityImage from '@/components/sanity-image'
import SanityImageTest from '@/components/sanity-image-test'

const pageService = new SanityPageService(creditsQuery)

export default function Hire(initialData) {
  const { data: { credits, archives }  } = pageService.getPreviewHook(initialData)()

  const tickerItems = ['#223', '#113', '#19', '#94', '#211', '#65', '#3', '#122', '#10', '#113', '#84', '#43', '#29', '#223', '#113', '#19', '#94', '#211', '#65', '#3', '#122', '#10', '#113', '#84', '#43', '#29', '#223', '#113', '#19', '#94', '#211', '#65', '#3', '#122', '#10', '#113' ]

  return (
    <Layout>
      <NextSeo title={credits.title} />

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
                      <h1 className="text-[30vw] lg:text-[20vw] mb-4 leading-[0.8] lg:leading-[0.8]">{credits.title}</h1>

                      <div className="content mb-[5vw]">
                        {credits.heroText && (
                          <p className="text-base lg:text-lg w-[80%] lg:w-[70%] max-w-3xl">{credits.heroText}</p>
                        )}
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                      <div className="aspect-[10/11] relative overflow-hidden">
                        <SanityImageTest eager image={credits.heroBackgroundImage} className="block w-full scale-[1.015]" alt="placeholder" />
                      </div>
                    </div>
                    
                    <m.div 
                      drag
                      dragMomentum={false}
                      className="absolute bottom-[-22vw] left-[-15vw] w-[35vw] cursor-grab"
                    >
                      <Polaroid
                        className="rotate-[13deg]"
                        image={credits.heroPolaroids[0].images[0]}
                        hoverImage={credits.heroPolaroids[0].images[1] ? credits.heroPolaroids[0].images[1] : credits.heroPolaroids[0].images[0]}
                        // metaText={credits.heroPolaroids[0].text ? credits.heroPolaroids[0].text : false}
                        sanity
                        eager
                      />
                    </m.div>

                    <m.div 
                      drag
                      dragMomentum={false}
                      className="absolute bottom-[-15vw] lg:bottom-auto lg:top-[8vw] right-[-12vw] w-[33vw] lg:w-[20vw] cursor-grab"
                    >
                      <Polaroid
                        className="rotate-[13deg]"
                        image={credits.heroPolaroids[2].images[0]}
                        hoverImage={credits.heroPolaroids[2].images[1] ? credits.heroPolaroids[2].images[1] : credits.heroPolaroids[2].images[0]}
                        // metaText={credits.heroPolaroids[2].text ? credits.heroPolaroids[2].text : false}
                        sanity
                        eager
                      />
                    </m.div>

                    <m.div 
                      drag
                      dragMomentum={false}
                      className="absolute bottom-[-12vw] lg:bottom-auto lg:top-[22vw] right-[33vw] lg:right-[40vw] w-[25vw] cursor-grab"
                    >
                      <Polaroid
                        className="rotate-[-13deg]"
                        image={credits.heroPolaroids[1].images[0]}
                        hoverImage={credits.heroPolaroids[1].images[1] ? credits.heroPolaroids[1].images[1] : credits.heroPolaroids[1].images[0]}
                        // metaText={credits.heroPolaroids[1].text ? credits.heroPolaroids[1].text : false}
                        sanity
                        eager
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
                    
                    {credits.contentHeadingText && (
                      <div className="w-full relative z-[20] mb-[10vw] lg:mb-[7.5vw]">
                        <h2 className="block text-[12vw] lg:text-[9vw] text-center leading-[0.75]">{credits.contentHeadingText}</h2>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-start p-[6.66vw] max-w-screen-2xl mx-auto">
                    {credits.contentPolaroids[0] && (
                      <m.div
                        drag
                        dragMomentum={false}
                        className="w-[90%] lg:w-[45%] mb-[10vw] lg:mb-0 lg:mt-[12vw] cursor-grab rotate-[1deg]"
                      >
                        <Polaroid
                          metaText="Pocket Piece #01"
                          image={credits.contentPolaroids[0].images[0]}
                          hoverImage={credits.contentPolaroids[0].images[1] ? credits.contentPolaroids[0].images[1] : credits.contentPolaroids[0].images[0]}
                          metaHeading={credits.contentPolaroids[0].text ? credits.contentPolaroids[0].text : false}
                          sanity
                        />
                      </m.div>
                    )}

                    {credits.contentPolaroids[1] && (
                      <m.div
                        drag
                        dragMomentum={false}
                        className="w-[90%] lg:w-[45%] mb-[10vw] lg:mb-0 ml-auto cursor-grab rotate-[-1deg]"
                      >
                        <Polaroid
                          metaText="Pocket Piece #02"
                          image={credits.contentPolaroids[1].images[0]}
                          hoverImage={credits.contentPolaroids[1].images[1] ? credits.contentPolaroids[1].images[1] : credits.contentPolaroids[1].images[0]}
                          metaHeading={credits.contentPolaroids[1].text ? credits.contentPolaroids[1].text : false}
                          sanity
                          />
                      </m.div>
                    )}
                    
                    {credits.contentPolaroids[2] && (
                      <m.div 
                        drag
                        dragMomentum={false}
                        className="w-[90%] lg:w-[45%] mb-[10vw] lg:mb-0 lg:mt-[12vw] cursor-grab rotate-[-1deg]"
                      >
                        <Polaroid
                          metaText="Pocket Piece #03"
                          image={credits.contentPolaroids[2].images[0]}
                          hoverImage={credits.contentPolaroids[2].images[1] ? credits.contentPolaroids[2].images[1] : credits.contentPolaroids[2].images[0]}
                          metaHeading={credits.contentPolaroids[2].text ? credits.contentPolaroids[2].text : false}
                          sanity
                        />
                      </m.div>
                    )}

                    {credits.contentPolaroids[3] && (
                      <m.div
                        drag
                        dragMomentum={false}
                        className="w-[90%] lg:w-[45%] mb-[10vw] lg:mb-0 ml-auto lg:mt-[-4vw] cursor-grab rotate-[1deg]"
                      >
                        <Polaroid
                          metaText="Pocket Piece #04"
                          image={credits.contentPolaroids[3].images[0]}
                          hoverImage={credits.contentPolaroids[3].images[1] ? credits.contentPolaroids[3].images[1] : credits.contentPolaroids[3].images[0]}
                          metaHeading={credits.contentPolaroids[3].text ? credits.contentPolaroids[3].text : false}
                          sanity
                        />
                      </m.div>
                    )}
                  </div>
                </m.div>
              </Container>

              <m.div variants={fade}>
                <div className="bg-off-black text-off-white">
                  <div className="relative flex overflow-x-hidden opacity-75 text-sm leading-none">
                    <div className="animate-marquee whitespace-nowrap py-2 will-change-transform">
                      {tickerItems.map((e, i) => {
                        return (
                          <span className="mx-1" key={i}>{e},</span>
                        )
                      })}
                    </div>

                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-2 will-change-transform">
                      {tickerItems.map((e, i) => {
                        return (
                          <span className="mx-1" key={i}>{e},</span>
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

                      <div className="relative flex overflow-x-hidden mb-20 md:mb-24 lg:mb-32 2xl:mb-40 overflow-y-hidden">
                        <div className="animate-marqueeSlow whitespace-nowrap will-change-transform">
                          {archives.map((e, i) => {
                            return (
                              <span className="inline-block mx-4 md:mx-8 2xl:mx-12" key={i}>
                                <span className="inline-block w-[50vw] md:w-[38vw] lg:w-[25vw] relative"><SanityImageTest image={e.image} className="w-full " alt="placeholder" /></span>
                                
                                <span className="block mt-4">
                                  <span className="block uppercase text-xs lg:text-sm">&quot;{e.metaTitle}&quot;</span>

                                  <span className="font-display text-[10vw] md:text-[6.5vw] lg:text-[4.25vw] 2xl:text-[70px] leading-[0.95] md:leading-[0.95] lg:leading-[0.95] 2xl:leading-[0.95]">{e.title}</span>
                                </span>
                              </span>
                            )
                          })}
                        </div>

                        <div className="absolute top-0 animate-marqueeSlow2 whitespace-nowrap will-change-transform">
                          {archives.map((e, i) => {
                            return (
                              <span className="inline-block mx-4 md:mx-8 2xl:mx-12" key={i}>
                                <span className="inline-block w-[50vw] md:w-[38vw] lg:w-[25vw] relative"><SanityImageTest image={e.image} className="w-full " alt="placeholder" /></span>
                                
                                <span className="block mt-4">
                                  <span className="block uppercase text-xs lg:text-sm">&quot;{e.metaTitle}&quot;</span>

                                  <span className="font-display text-[10vw] md:text-[6.5vw] lg:text-[4.25vw] 2xl:text-[70px] leading-[0.95] md:leading-[0.95] lg:leading-[0.95] 2xl:leading-[0.95]">{e.title}</span>
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

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return { 
    props: props
  };
}