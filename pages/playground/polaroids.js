import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domMax, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Polaroid from '@/components/polaroid'

export default function Polaroids() {

  return (
    <Layout>
      <NextSeo title="Polaroids Playground" />

      <LazyMotion features={domMax}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <div className="bg-white pt-[78px] lg:pt-[90px] overflow-hidden">
            <div className="fixed inset-0 pointer-events-none scale-[1.15]"></div>
            <main className="mb-12 md:mb-16 xl:mb-24 relative z-[20]">
              <Container>
                <m.div variants={fade}>

                  <div className="flex flex-wrap mb-[20vw] lg:mb-[15vw] xl:mb-[12.5vw] relative">
                    <div className="w-full lg:w-1/2 relative z-[20] pointer-events-none">
                      <h1 className="text-[20vw] mb-4 leading-[0.8]">Polaroids</h1>

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
                      initial={{
                        rotate: -1.25,
                        scale: 1
                      }}
                      whileHover={{
                        rotate: -1.75,
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                      drag
                      dragMomentum={false}
                      whileDrag={{ 
                        scale: 0.95,
                        rotate: -1.025,
                      }} 
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
                      initial={{
                        rotate: -1.25,
                        scale: 1
                      }}
                      whileHover={{
                        rotate: -1.75,
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                      drag
                      dragMomentum={false}
                      whileDrag={{ 
                        scale: 0.95,
                        rotate: -1.025,
                      }} 
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
