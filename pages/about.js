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

export default function About() {
  return (
    <Layout>
      <NextSeo title="Film Strip Playground" />

      <LazyMotion features={domMax}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <m.div variants={fade} className="bg-off-white">
            <main className="mb-12 md:mb-16 xl:mb-24 pt-14 lg:pt-16 overflow-hidden">
              <Container>
                <div className="pt-[8vw] lg:pt-[6vw] pb-[8.5vw]">
                  <div className="w-[60px] lg:w-[6vw] mx-auto mb-5">
                    <LogoMarkOutlinedIcon />
                  </div>
                  <h1 className="text-[18vw] md:text-[11vw] lg:text-[9.5vw] mb-4 leading-[0.75] md:leading-[0.75] lg:leading-[0.75] text-center px-[3vw] lg:px-[10vw]">Prestige, one-of-a-kind pieces to sustainably style out your wardrobe.</h1>
                </div>
              </Container>

              <FilmStrip />

              <div className="mt-[12vw] lg:mt-[7.5vw]">
                <div className="">
                  <Container className="relative z-[10]">
                    <MetaText text="About P.P" />
                    <h2 className="text-[15vw] md:text-[9vw] lg:text-[7.7vw] mb-4 leading-[0.75] md:leading-[0.75] lg:leading-[0.75] text-left max-w-[90%] lg:max-w-[85%]">Think scene-stealing, prestige, designer vintage pieces sourced from around the globe, in a range of sizes, for all genders, so keep an eye for a piece to pocket.</h2>
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
                          image="/images/testimonial-01.jpg"
                          imageWidth={1087}
                          imageHeight={1087}
                          hoverImage="/images/testimonial-02.jpg"
                          hoverImageWidth={1087}
                          hoverImageHeight={1087}
                        />
                      </m.div>

                      <m.div 
                        drag
                        dragMomentum={false}
                        className="absolute top-[-20%] lg:top-[0%] left-[65%] lg:left-[27%] w-[65%] lg:w-[45%] cursor-grab z-[4]"
                      >
                        <Polaroid
                          className="rotate-[9deg] lg:rotate-[-7deg]"
                          image="/images/testimonial-02.jpg"
                          imageWidth={1087}
                          imageHeight={1087}
                          hoverImage="/images/testimonial-01.jpg"
                          hoverImageWidth={1087}
                          hoverImageHeight={1087}
                        />
                      </m.div>

                      <m.div 
                        drag
                        dragMomentum={false}
                        className="absolute top-[7%] left-[35%] w-[45%] cursor-grab z-[3] hidden lg:block"
                      >
                        <Polaroid
                          className="rotate-[2deg]"
                          image="/images/testimonial-03.jpg"
                          imageWidth={1087}
                          imageHeight={1087}
                          hoverImage="/images/testimonial-02.jpg"
                          hoverImageWidth={1087}
                          hoverImageHeight={1087}
                        />
                      </m.div>
                    </div>

                    <div className="w-full lg:w-5/12 px-4 lg:px-6 max-w-[800px] lg:mx-auto">
                      <MetaText text="Bio" />
                      
                      <div className="content lg:text-xl w-11/12 lg:w-10/12">
                        <p>Hello you! I&apos;m Phoebe, founder of Pocket Pieces, here to fill you in on what to expect with this online store specialising in prestige vintage pieces. I love the hunt - the finds that catch you off guard, the unpredictability, the chance encounters. I&apos;ve shopped vintage for years - for myself and for friends - between film production jobs, which is what I do by day.</p>
                        
                        <p>You&apos;re here because you love a good vintage find, especially if it&apos;s pre-loved, designer, or something extra special. That&apos;s what Pocket Pieces is dedicated to - in the name of polka dots, leopard print and sequins. Bookmark us for one-of-a-kind to-die-for items too good to not pocket. Welcome to our slice of screen-worthy on the gram. I&apos;ve personally sourced all the pieces you&apos;ll see here, not just in London, but all over the globe, wherever my work (and play!) takes me.</p>
                        
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
                  <blockquote className="font-display text-[15vw] md:text-[9vw] lg:text-[7.7vw] mb-[6vw] lg:mb-[4vw] leading-[0.8] md:leading-[0.8] lg:leading-[0.8] max-w-[90%] lg:max-w-[80%] lg:text-center w-full order-3 lg:order-2">“Love it! The perfect party blazer. Pocket Pieces is my go-to when I need something a little unusual.”</blockquote>

                  <div className="bg-black w-full max-w-[70%] lg:max-w-[75%] p-[3vw] mb-[6vw] lg:mb-[2vw] order-2 lg:order-3">
                    <div className="flex space-x-[3vw]">
                      <div className="w-full lg:w-1/3">
                        <Image src="/images/testimonial-01.jpg" width={668} height={668} alt="Placeholder" className="w-full" />
                      </div>
                      <div className="w-1/3 hidden lg:block">
                        <Image src="/images/testimonial-02.jpg" width={668} height={668} alt="Placeholder" className="w-full" />
                      </div>
                      <div className="w-1/3 hidden lg:block">
                        <Image src="/images/testimonial-03.jpg" width={668} height={668} alt="Placeholder" className="w-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full lg:text-center order-4 lg:order-4">
                    <p>@luckyluv_86</p>
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
