import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, m, domMax } from 'framer-motion'
import { NextSeo } from 'next-seo'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import SignatureIcon from "@/icons/signature.svg";
import Image from 'next/image'
import FilmStrip from '@/components/film-strip'
import MetaText from '@/components/meta-text'
import Polaroid from '@/components/polaroid'
import {PortableText} from '@portabletext/react'
import SanityPageService from '@/services/sanityPageService'
import { aboutQuery } from '@/helpers/queries'
import SanityImage from '@/components/sanity-image'

const pageService = new SanityPageService(aboutQuery)

export default function Home(initialData) {
  const { data: { about }  } = pageService.getPreviewHook(initialData)()
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
            <main className="mb-12 md:mb-16 xl:mb-24 pt-14 lg:pt-16 overflow-hidden">

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
                    <div className="w-full lg:w-7/12 relative min-h-[70vw] lg:min-h-0">
                      <m.div 
                        drag
                        dragMomentum={false}
                        className="absolute top-[-25%] lg:top-[-20%] left-[-33%] w-[55%] lg:w-[45%] cursor-grab z-[5]"
                      >
                        <Polaroid
                          className="rotate-[-13deg] lg:rotate-[9deg]"
                          image={about.polaroids[0].images[0]}
                          hoverImage={about.polaroids[0].images[1] ? about.polaroids[0].images[1] : about.polaroids[0].images[0]}
                          // metaText={about.polaroids[0].text ? about.polaroids[0].text : false}
                          sanity
                        />
                      </m.div>

                      <m.div 
                        drag
                        dragMomentum={false}
                        className="absolute top-[-20%] lg:top-[0%] left-[65%] lg:left-[27%] w-[65%] lg:w-[45%] cursor-grab z-[4]"
                      >
                        <Polaroid
                          className="rotate-[9deg] lg:rotate-[-7deg]"
                          image={about.polaroids[1].images[0]}
                          hoverImage={about.polaroids[1].images[1] ? about.polaroids[1].images[1] : about.polaroids[1].images[0]}
                          // metaText={about.polaroids[1].text ? about.polaroids[1].text : false}
                          sanity
                        />
                      </m.div>

                      <m.div 
                        drag
                        dragMomentum={false}
                        className="absolute top-[7%] left-[35%] w-[45%] cursor-grab z-[3] hidden lg:block"
                      >
                        <Polaroid
                          className="rotate-[2deg]"
                          image={about.polaroids[2].images[0]}
                          hoverImage={about.polaroids[2].images[1] ? about.polaroids[2].images[1] : about.polaroids[2].images[0]}
                          // metaText={about.polaroids[2].text ? about.polaroids[2].text : false}
                          sanity
                        />
                      </m.div>
                    </div>

                    <div className="w-full lg:w-5/12 px-4 lg:px-6 max-w-[800px] lg:mx-auto">
                      <MetaText text="Bio" />
                      <div className="content lg:text-xl w-11/12 lg:w-10/12">
                        {about.bioText && (
                          <PortableText value={about.bioText} />
                        )}
                        
                        <span className="block w-4/12 max-w-[200px] mb-6">
                          <SignatureIcon />
                        </span>

                        <p className="text-sm lg:text-base">Phoebe Pocket<br/>Founder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Container className="mt-[12vw] lg:mt-[10.25vw]">
                <div className="flex flex-wrap lg:justify-center">
                  <MetaText text="Kind Words" className="w-full lg:text-center order-1 lg:order-1" />
                  <blockquote className="font-display text-[15vw] md:text-[9vw] lg:text-[7.7vw] mb-[6vw] lg:mb-[4vw] leading-[0.8] md:leading-[0.8] lg:leading-[0.8] max-w-[90%] lg:max-w-[80%] lg:text-center w-full order-3 lg:order-2">“{about.testimonials[0].text}”</blockquote>

                  <div className="bg-black w-full max-w-[70%] lg:max-w-[75%] p-[3vw] mb-[6vw] lg:mb-[2vw] order-2 lg:order-3">
                    <div className="flex space-x-[3vw]">
                      {about.testimonials[0].images.map((e, i) => {
                        return (
                          <div className={`w-full lg:w-1/3 ${i == 0 ? 'block' : 'hidden lg:block' }`} key={i}>
                            <SanityImage image={e} alt="Placeholder" className="w-full" sizes="(min-width: 1024px) 33vw, 66vw" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="w-full lg:text-center order-4 lg:order-4">
                    {about.testimonials[0].instagramHandle && (
                      <p>{about.testimonials[0].instagramHandle}</p>
                    )}
                  </div>
                </div>
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