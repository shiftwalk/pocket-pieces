import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import LogoIcon from '@/icons/logo.svg'

export default function Home() {
  return (
    <Layout>
      <NextSeo title="Home" />
      
      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <main className="mb-12 md:mb-16 xl:mb-24 pt-14 lg:pt-16">
            <Container>
              <m.article variants={fade}>
                <div className="absolute inset-0 h-screen">
                  <div className="cover-image">
                    <Image src="/images/home-hero.jpg" fill className="w-full h-full" alt="Placeholder" />
                    <div className="absolute inset-0 z-10 bg-black/20"></div>
                    <div className="absolute inset-0 z-[11] flex flex-wrap items-center justify-center py-4 lg:py-6">
                      <div className="w-full mt-auto">
                        <div className="mx-auto max-w-[700px]">
                          <div className="w-9/12 lg:w-10/12 mx-auto">
                            <LogoIcon className={`w-full mb-8 text-zinc-100`} />
                          </div>

                          <div className="w-10/12 lg:w-full mx-auto">
                            <p className="text-base lg:text-xl xl:text-2xl text-zinc-100 text-center">Prestige, one-of-a-kind pieces to sustainably style out your wardrobe.</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto text-zinc-100/90 w-full text-center uppercase leading-none lg:leading-none font-credits tracking-normal">
                        <div>
                          <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Phoebe Pocket</span>
                          <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Presents A</span>
                          <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Pocket Pieces</span>
                          <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">And</span>
                          <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Enid.fm</span>
                          <span className="inline-block pl-[2px] pr-[13px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Production</span>

                          <div className="block md:inline-block">
                            <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">A Website By</span>
                            <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">ShiftWalk</span>
                            <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Branding By</span>
                            <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Gabi Fountain</span>
                            <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Strategic Direction By</span>
                            <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Enid.fm</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Curation by</span>
                          <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Phoebe Pocket</span>
                          <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Photography By</span>
                          <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Armando Nucci</span>
                          <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Written And Directed by</span>
                          <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Phoebe Pocket</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </m.article>
            </Container>
          </main>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}
