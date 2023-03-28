import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m, useScroll, useMotionValueEvent } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Polaroid from '@/components/polaroid'
import { useEffect, useRef } from 'react'

export default function Shop() {
  const scrollWrapper = useRef(null)
  const textRoller = useRef(null)

  const { scrollYProgress } = useScroll()
  
  useEffect(() => {
    textRoller.current.style.transform = `translateY(0)`
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    textRoller.current.style.transform = `translateY(-${latest * 93}%)`;
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
          <main className="mb-12 md:mb-16 xl:mb-24 pt-28 lg:pt-32">
            <Container>
              <m.div variants={fade}>
                <div className="fixed top-0 left-0 pt-[70px] lg:pt-[85px] px-4 lg:px-6">
                  <span className="block uppercase text-sm mb-2">Reel / Gallery</span>
                  <span className="text-[12vw] lg:text-[5vw] font-display leading-[0.65] lg:leading-[0.65] flex">
                    <span className="block tabular-nums">
                      <span className="block overflow-hidden relative">
                        <span className="opacity-0">01</span>
                        <span className="block absolute top-0 left-0" ref={textRoller}>
                          {Array.from(Array(14), (e, i) => {
                            return (
                              <span key={i} className="block">{i+1 < 10 ? '0' : ''}{i + 1}</span>
                            )
                          })}
                        </span>
                      </span>
                    </span>
                    <span className="block">/14</span>
                  </span>
                </div>
                <div className="w-5/12 mx-auto" ref={scrollWrapper}>
                  {Array.from(Array(14), (e, i) => {
                    return (
                      <Polaroid
                        key={i}
                        className=" mb-[12vw]"
                        metaText="Some Meta Info"
                        metaHeading="Product Name"
                        image="/images/easy-rider.jpg"
                        imageWidth={1087}
                        imageHeight={1087}
                        hoverImage="/images/easy-rider.jpg"
                        hoverImageWidth={1087}
                        hoverImageHeight={1087}
                      />
                    )
                  })}
                </div>
              </m.div>
            </Container>
          </main>

          <m.div variants={fade}>
            <Footer />
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}
