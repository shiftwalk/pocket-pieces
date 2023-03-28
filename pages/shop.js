import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m, useScroll, useMotionValueEvent } from 'framer-motion'
import { NextSeo } from 'next-seo'
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
                <span className="block uppercase text-sm mb-2">Reel / Gallery</span>
                <span className="text-[12vw] lg:text-[5vw] font-display leading-[0.65] lg:leading-[0.65] flex">
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
              <div className="w-9/12 md:w-7/12 lg:w-5/12 mx-auto relative z-[50]" ref={scrollWrapper}>
                {Array.from(Array(16), (e, i) => {
                  return (
                    <div className="min-h-screen flex items-center py-28 lg:py-32" key={i}>
                      <Polaroid
                        noShadow
                        product
                        className="lg:mb-16 max-w-[55vh] mx-auto"
                        metaText="Some Meta Info"
                        metaHeading="Vintage Burberry Black Heels"
                        price={500}
                        image="/images/easy-rider.jpg"
                        imageWidth={1087}
                        imageHeight={1087}
                        hoverImage="/images/easy-rider.jpg"
                        hoverImageWidth={1087}
                        hoverImageHeight={1087}
                      />
                    </div>
                  )
                })}
              </div>

              <div className={`fixed bottom-0 w-full z-[51] hidden lg:flex justify-center transition-transform ease-in-out duration-[450ms] ${filtersHidden ? 'translate-y-[100%]' : '' }`}>
                <div className="mx-auto w-auto relative inline-block pt-16 lg:pt-16 p-3 lg:p-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-100 via-neutral-100 to-transparent z-[20]"></div>
                  <span className="text-[12vw] lg:text-[6vw] font-display leading-[0.65] lg:leading-[0.65] flex justify-center relative z-[21]">
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
