import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, m, domMax } from 'framer-motion'
import { NextSeo } from 'next-seo'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import SignatureIcon from "@/icons/signature.svg";
import FilmStrip from '@/components/film-strip'
import MetaText from '@/components/meta-text'
import Polaroid from '@/components/polaroid'
import {PortableText} from '@portabletext/react'
import SanityPageService from '@/services/sanityPageService'
import { aboutQuery } from '@/helpers/queries'
import TestimonialRoller from '@/components/testimonial-roller'
import { useContext, useEffect } from 'react'
import { IntroContext } from '@/context/intro'
import Image from 'next/image'

const pageService = new SanityPageService(aboutQuery)

export default function Home(initialData) {
  const { data: { about }  } = pageService.getPreviewHook(initialData)()
  const [introContext, setIntroContext] = useContext(IntroContext);

  useEffect(() => {
    setIntroContext(true)
  },[]);
  return (
    <Layout>
      <NextSeo title={about.title} />

      <LazyMotion features={domMax}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <m.div variants={fade}>
            <main className="mb-8 md:mb-12 xl:mb-16 pt-14 lg:pt-16 overflow-hidden">

              <Container>
                <div className="pt-[8vw] lg:pt-[6vw] pb-[8.5vw]">
                  <div className="w-[60px] lg:w-[6vw] mx-auto mb-5">
                    <LogoMarkOutlinedIcon />
                  </div>
                  <h1 className="text-[18vw] md:text-[11vw] lg:text-[9.5vw] mb-4 leading-[0.75] md:leading-[0.75] lg:leading-[0.75] text-center px-[3vw] lg:px-[10vw]">{about.heroText}</h1>
                </div>
              </Container>

              {/* <FilmStripTest baseVelocity={1} image1={'/images/strip-01.jpg'} image2={'/images/strip-02.jpg'} image3={'/images/strip-03.jpg'} image4={'/images/strip-03.jpg'} /> */}

              <FilmStrip images={about.reelImages} />

              <div className="mt-[12vw] lg:mt-[7.5vw]">
                <div className="">
                  <Container className="relative z-[10]">
                    <MetaText text="About P.P" />
                    {about.aboutText && (
                      <h2 className="text-[15vw] md:text-[9vw] lg:text-[7.7vw] mb-4 leading-[0.75] md:leading-[0.75] lg:leading-[0.75] text-left max-w-[90%] lg:max-w-[85%]">{about.aboutText}</h2>
                    )}
                    {/* {JSON.stringify(about.polaroids)} */}
                  </Container>

                  <div className="flex flex-wrap mt-[12vw] lg:mt-[7.5vw]">
                    <div className="w-full lg:w-7/12 relative min-h-[70vw] lg:min-h-0 hidden lg:block">
                      <m.div 
                        drag
                        dragMomentum={false}
                        className="absolute top-[0%] lg:top-[20%] left-[-14%] w-[55%] lg:w-[45%] cursor-grab z-[5]"
                      >
                        <Polaroid
                          className="rotate-[-13deg] lg:rotate-[9deg]"
                          image={about.polaroids[0]?.images[0]}
                          hoverImage={about.polaroids[0]?.images[1] ? about.polaroids[0]?.images[1] : about.polaroids[0]?.images[0]}
                          // metaText={about.polaroids[0].text ? about.polaroids[0].text : false}
                          sanity
                        />
                      </m.div>
                      
                      {about.polaroids[1] && (
                        <m.div 
                          drag
                          dragMomentum={false}
                          className="absolute top-[-20%] lg:top-[0%] left-[65%] lg:left-[27%] w-[65%] lg:w-[45%] cursor-grab z-[4]"
                        >
                          <Polaroid
                            className="rotate-[9deg] lg:rotate-[-7deg]"
                            image={about.polaroids[1]?.images[0]}
                            hoverImage={about.polaroids[1]?.images[1] ? about.polaroids[1]?.images[1] : about.polaroids[1]?.images[0]}
                            // metaText={about.polaroids[1].text ? about.polaroids[1].text : false}
                            sanity
                          />
                        </m.div>
                      )}

                      { about.polaroids[2] && (
                        <m.div 
                          drag
                          dragMomentum={false}
                          className="absolute top-[7%] left-[35%] w-[45%] cursor-grab z-[3] hidden lg:block"
                        >
                          <Polaroid
                            className="rotate-[2deg]"
                            image={about.polaroids[2]?.images[0]}
                            hoverImage={about.polaroids[2]?.images[1] ? about.polaroids[2]?.images[1] : about.polaroids[2]?.images[0]}
                            // metaText={about.polaroids[2].text ? about.polaroids[2].text : false}
                            sanity
                          />
                        </m.div>
                      )}
                    </div>

                    <div className="w-full lg:w-7/12 relative min-h-[70vw] lg:min-h-0 block lg:hidden">
                      <m.div 
                        className="absolute top-[0%] lg:top-[20%] left-[-14%] w-[55%] lg:w-[45%]  z-[5]"
                      >
                        <Polaroid
                          className="rotate-[-13deg] lg:rotate-[9deg]"
                          image={about.polaroids[0]?.images[0]}
                          hoverImage={about.polaroids[0]?.images[1] ? about.polaroids[0]?.images[1] : about.polaroids[0]?.images[0]}
                          // metaText={about.polaroids[0].text ? about.polaroids[0].text : false}
                          sanity
                        />
                      </m.div>
                      
                      {about.polaroids[1] && (
                        <m.div 
                          className="absolute top-[-20%] lg:top-[0%] left-[65%] lg:left-[27%] w-[65%] lg:w-[45%]  z-[4]"
                        >
                          <Polaroid
                            className="rotate-[9deg] lg:rotate-[-7deg]"
                            image={about.polaroids[1]?.images[0]}
                            hoverImage={about.polaroids[1]?.images[1] ? about.polaroids[1]?.images[1] : about.polaroids[1]?.images[0]}
                            // metaText={about.polaroids[1].text ? about.polaroids[1].text : false}
                            sanity
                          />
                        </m.div>
                      )}

                      { about.polaroids[2] && (
                        <m.div 
                          className="absolute top-[7%] left-[35%] w-[45%]  z-[3] hidden lg:block"
                        >
                          <Polaroid
                            className="rotate-[2deg]"
                            image={about.polaroids[2]?.images[0]}
                            hoverImage={about.polaroids[2]?.images[1] ? about.polaroids[2]?.images[1] : about.polaroids[2]?.images[0]}
                            // metaText={about.polaroids[2].text ? about.polaroids[2].text : false}
                            sanity
                          />
                        </m.div>
                      )}
                    </div>

                    <div className="w-full lg:w-5/12 px-4 lg:px-6 max-w-[800px] lg:mx-auto">
                      <MetaText text="Bio" />
                      <div className="content lg:text-xl w-11/12 lg:w-10/12">
                        {about.bioText && (
                          <PortableText value={about.bioText} />
                        )}
                        
                        <span className="block w-5/12 max-w-[240px] mb-6 bg-off-white">
                          <Image src="/images/sig.png" alt="Phoebe Signature" width={424} height={132} className="mix-blend-darken" />
                        </span>

                        <p className="text-sm lg:text-base">Phoebe Pocket<br/>Founder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Container className="mt-[12vw] lg:mt-[10.25vw]">
                <TestimonialRoller items={about.testimonials} />
              </Container>
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

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return { 
    props: props
  };
}