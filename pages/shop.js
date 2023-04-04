import Layout from '@/components/layout'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m, useScroll, useMotionValueEvent } from 'framer-motion'
import { NextSeo } from 'next-seo'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import Polaroid from '@/components/polaroid'
import { useEffect, useRef, useState } from 'react'

export default function Shop() {
  const scrollWrapper = useRef(null)
  const textRoller = useRef(null)
  const [filtersHidden, setFiltersHidden] = useState(false)

  const { scrollYProgress } = useScroll()
  
  useEffect(() => {
    textRoller.current.style.transform = `translateY(0)`
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    textRoller.current.style.transform = `translateY(-${latest * 93.75}%)`;
    console.log(latest)

    setFiltersHidden(latest > 0.98)
  })

  return (
    <Layout>
      <NextSeo title="Shop" />

      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <main className="pb-12 md:pb-16 xl:pb-24">
            <m.div variants={fade}>
              <div className="fixed top-0 left-0 pt-[70px] lg:pt-[85px] px-4 lg:px-6 z-[100]">
                <span className="block uppercase text-xs md:text-sm leading-none md:leading-none mb-2">Reel / Gallery</span>
                <span className="text-5xl lg:text-[5vw] font-display leading-[0.65] lg:leading-[0.65] flex">
                  <span className="block tabular-nums">
                    <span className="block overflow-hidden relative">
                      <span className="opacity-0">01</span>
                      <span className="block absolute top-0 left-0" ref={textRoller}>
                        {Array.from(Array(16), (e, i) => {
                          return (
                            <span key={i} className="block">{i+1 < 10 ? '0' : ''}{i + 1}</span>
                          )
                        })}
                      </span>
                    </span>
                  </span>
                  <span className="block">/16</span>
                </span>
              </div>

              <div className="fixed top-0 right-0 pt-[70px] lg:pt-[85px] px-4 lg:px-6 z-[100]">
                <div className="w-[55px] lg:w-[6vw] max-w-[80px] mx-auto mb-5">
                  <LogoMarkOutlinedIcon />
                </div>
              </div>
              
              <h1 className="text-[22vw] md:text-[23vw] lg:text-[24vw] leading-[0.65] pt-[120px] md:pt-[150px] lg:pt-[87px] 2xl:text-[360px] text-center mb-10 md:mb-12 lg:mb-28">The Pieces</h1>

              <div className="w-10/12 md:w-7/12 lg:w-5/12 lg:max-w-[650px] mx-auto relative z-[50]" ref={scrollWrapper}>
                {Array.from(Array(16), (e, i) => {
                  return (
                    <div className="flex items-center pb-16 md:pb-20 lg:pb-32" key={i}>
                      <Polaroid
                        noShadow
                        thin
                        product
                        className="max-w-[55vh] mx-auto"
                        metaText="Some Meta Info"
                        metaHeading="Vintage Burberry Black Heels"
                        price={500}
                        image="/images/testimonial-01.jpg"
                        imageWidth={1087}
                        imageHeight={1087}
                        hoverImage="/images/testimonial-02.jpg"
                        hoverImageWidth={1087}
                        hoverImageHeight={1087}
                      />
                    </div>
                  )
                })}
              </div>

              <div className={`fixed bottom-0 w-full z-[51] hidden lg:flex justify-center transition-transform ease-in-out duration-[450ms] ${filtersHidden ? 'translate-y-[100%]' : '' }`}>
                <div className="mx-auto w-auto relative inline-block pt-16 lg:pt-16 p-3 lg:p-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-100 via-zinc-100 to-transparent z-[20]"></div>
                  <span className="text-[12vw] lg:text-[6.25vw] 2xl:text-[100px] font-display leading-[0.65] lg:leading-[0.65] flex justify-center relative z-[21]">
                    <span className="block line-through">All,</span>
                    <span className="block">Showstoppers,</span>
                    <span className="block line-through">Accessories,</span>
                    <span className="block line-through">Clothing,</span>
                    <span className="block line-through">Last Look</span>
                  </span>
                </div>
              </div>
            </m.div>
          </main>

          <m.div variants={fade}>
            <Footer />
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}
