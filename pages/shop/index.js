import Layout from '@/components/layout'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { getAllCollections, getAllProducts } from '@/helpers/shopify'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import Polaroid from '@/components/polaroid'
import { useContext, useEffect, useRef, useState } from 'react'
import SanityPageService from '@/services/sanityPageService'
import Link from 'next/link'
import StrikeIcon from '@/icons/strike.svg'
import { useLenis } from '@studio-freight/react-lenis'
import { ViewContext } from '@/context/view'
import { IntroContext } from '@/context/intro'
import Roller from '@/components/roller'

const pageService = new SanityPageService()

export default function Shop(initialData) {
  const { data: { products, collections } } = pageService.getPreviewHook(initialData)()
  const scrollWrapper = useRef(null)
  const lenis = useLenis();
  const [currentView, setCurrentView] = useContext(ViewContext);
  const [filtersHidden, setFiltersHidden] = useState(false)
  const [introContext, setIntroContext] = useContext(IntroContext);
  const headingRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["0%", "200%"]
  })

  useEffect(() => {
    setIntroContext(true)
  },[]);

  const moveY = useTransform(scrollYProgress,[0, 1],['0', '-100%'],{ clamp: true })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setFiltersHidden(latest > 0.975)
  })

  function updateView(view) {
    lenis.scrollTo(0)
    setCurrentView(view)
  }

  let moneyUkLocale = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "GBP",
    useGrouping: true,
  });

  return (
    <Layout>
      <NextSeo title="Shop" />

      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <main className="pb-[10vw]">
            <div>
              <div className="fixed top-0 left-0 pt-[70px] lg:pt-[85px] px-4 lg:px-6 z-[100]">
                <m.span variants={fade} className="mb-2 relative z-10 hidden xl:block">
                  <button className={`uppercase text-xs md:text-sm leading-none md:leading-none ${currentView == 'reel' && 'line-through'}`} onClick={()=> updateView('reel')}>Reel</button> / <button className={`uppercase text-xs md:text-sm leading-none md:leading-none ${currentView == 'gallery' && 'line-through'}`} onClick={()=> updateView('gallery')}>Gallery</button>
                </m.span>

                <m.span variants={fade} className="text-5xl lg:text-[5vw] font-display leading-[0.65] lg:leading-[0.65] flex">
                  <Roller items={products} />
                </m.span>
              </div>

              <div className="fixed top-0 right-0 pt-[70px] lg:pt-[85px] px-4 lg:px-6 z-[100]">
                <m.div variants={fade} className="w-[55px] lg:w-[6vw] max-w-[80px] mx-auto mb-5">
                  <LogoMarkOutlinedIcon />
                </m.div>
              </div>
              
              {/* <div className="fixed inset-0 flex md:items-center justify-center mt-40 lg:mt-0">
                <div className="relative w-full flex overflow-x-hidden overflow-y-hidden">
                  <div className="animate-marqueeDoubleSlow whitespace-nowrap will-change-transform">
                    {Array.from(Array(4), (e, i) => {
                      return (
                        <h1 key={i} className="inline-block text-[40vw] md:text-[38vw] lg:text-[36vw] leading-[1] md:leading-[1] lg:leading-[1] 2xl:leading-[1] 2xl:text-[42vw] text-center text-black text-opacity-[0.075] mx-[2.5vw] translate-y-[-2vw]">
                          <span className="inline-block">All Pieces</span>
                          <StarIcon className="inline-block ml-[6vw] w-[15vw] translate-y-[-1.5vw]" />
                        </h1>
                      )
                    })}
                  </div>

                  <div className="absolute top-0 animate-marqueeDoubleSlow2 whitespace-nowrap will-change-transform">
                    {Array.from(Array(4), (e, i) => {
                      return (
                        <h1 key={i} className="inline-block text-[40vw] md:text-[38vw] lg:text-[36vw] leading-[1] md:leading-[1] lg:leading-[1] 2xl:leading-[1] 2xl:text-[42vw] text-center text-black text-opacity-[0.075] mx-[2.5vw] translate-y-[-2vw]">
                          <span className="inline-block">All Pieces</span>
                          <StarIcon className="inline-block ml-[6vw] w-[15vw] translate-y-[-1.5vw]" />
                        </h1>
                      )
                    })}
                  </div>
                </div>
              </div> */}

              <m.h1 ref={headingRef} variants={fade} className="inline-block text-[25vw] md:text-[26vw] lg:text-[27vw] xl:text-[340px] leading-[1] md:leading-[1] lg:leading-[1] xl:leading-[1] text-off-black mx-auto w-full text-center pt-[100px] md:pt-[40px] lg:pt-[40px] fixed top-0 left-0 right-0" style={{ y: moveY}}>
                <span className="inline-block">Shop Pieces</span>
              </m.h1>

              <AnimatePresence mode="wait">
                { currentView == 'reel' ? (
                  <m.div
                    initial={{ filter: "blur(50px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1, transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] }}}
                    exit={{ filter: "blur(50px)", opacity: 0, transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] }}}
                    variants={fade}
                    className={`w-10/12 md:w-7/12 lg:w-5/12 lg:max-w-[650px] mx-auto relative z-[50]  ${currentView == 'reel' ? 'pt-[280px] md:pt-[40vw] lg:pt-[38vw] xl:pt-[450px]' : 'pt-[30px] md:pt-[30px] lg:pt-[20dvh]' }`}
                    ref={scrollWrapper}
                    key="reel"
                  >
                    {products.map((e, i) => {
                      return e.node.availableForSale && (
                        <div className={"flex items-center pb-16 md:pb-20 lg:pb-32"} key={i}>
                          <Link href={`/shop/${e.node.handle}`} className="w-full max-w-[55vh] mx-auto block">
                            <Polaroid
                              noShadow
                              thin
                              product
                              className="w-full"
                              hire={e.node.collections.edges.some(e => e.node.title === 'For Hire')}
                              collection={e.node.collections.edges[0]?.node.title}
                              metaText={e.node.metaTitle ? e.node.metaTitle.value : null}
                              metaHeading={e.node.title}
                              price={moneyUkLocale.format(e.node.variants.edges[0]?.node.price.amount)}
                              image={e.node.images.edges[0]?.node.originalSrc}
                              imageWidth={e.node.images.edges[0]?.node.width}
                              imageHeight={e.node.images.edges[0]?.node.height}
                              hoverImage={e.node.images.edges[1] ? e.node.images.edges[1].node.originalSrc : e.node.images.edges[0]?.node.originalSrc}
                              hoverImageWidth={e.node.images.edges[1] ? e.node.images.edges[1].node.width : e.node.images.edges[0]?.node.width}
                              hoverImageHeight={e.node.images.edges[1] ? e.node.images.edges[1].node.height : e.node.images.edges[0]?.node.height}
                            />
                          </Link>
                        </div>
                      )
                    })}
                  </m.div>
                ) : (
                  <m.div
                    initial={{ filter: "blur(50px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1, transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] }}}
                    exit={{ filter: "blur(50px)", opacity: 0, transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] }}}
                    variants={fade}
                    className={`w-10/12 md:w-7/12 lg:w-5/12 lg:max-w-[650px] xl:max-w-[100%] xl:w-10/12 flex flex-wrap justify-center items-start mx-auto relative z-[50] pt-[33dvh] md:pt-[35dvh] lg:pt-[35dvh] xl:pt-[40dvh]`}
                    ref={scrollWrapper}
                    key="gallery"
                  >
                    {products.map((e, i) => {
                      return e.node.availableForSale && (
                        <div className={"flex items-center w-full xl:w-1/3 pb-16 md:pb-20 lg:pb-32 xl:pb-[8vw] xl:px-[1.5vw]"} key={i}>
                          <Link href={`/shop/${e.node.handle}`} className="w-full max-w-[55vh] mx-auto block">
                            <Polaroid
                              noShadow
                              thin
                              product
                              smallText
                              matchHeight
                              className="w-full"
                              hire={e.node.collections.edges.some(e => e.node.title === 'For Hire')}
                              collection={e.node.collections.edges[0]?.node.title}
                              metaText={e.node.metaTitle ? e.node.metaTitle.value : null}
                              metaHeading={e.node.title}
                              price={moneyUkLocale.format(e.node.variants.edges[0]?.node.price.amount)}
                              image={e.node.images.edges[0]?.node.originalSrc}
                              imageWidth={e.node.images.edges[0]?.node.width}
                              imageHeight={e.node.images.edges[0]?.node.height}
                              hoverImage={e.node.images.edges[1] ? e.node.images.edges[1].node.originalSrc : e.node.images.edges[0]?.node.originalSrc}
                              hoverImageWidth={e.node.images.edges[1] ? e.node.images.edges[1].node.width : e.node.images.edges[0]?.node.width}
                              hoverImageHeight={e.node.images.edges[1] ? e.node.images.edges[1].node.height : e.node.images.edges[0]?.node.height}
                            />
                          </Link>
                        </div>
                      )
                    })}
                  </m.div>
                )}
              </AnimatePresence>

              <div className={`fixed bottom-0 w-full z-[51] hidden lg:flex justify-center transition-opacity ease-in-out duration-[250ms] ${filtersHidden ? 'opacity-0 pointer-events-none' : 'opacity-100' }`}>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-100 via-zinc-100 to-transparent z-[20]"></div>
                <m.div variants={fade} className="mx-auto w-auto inline-block pt-16 lg:pt-16 p-3 lg:p-6 relative z-[30]">
                  <span className="text-[12vw] lg:text-[6.25vw] 2xl:text-[100px] font-display leading-[0.65] lg:leading-[0.65] flex justify-center relative z-[50]">
                    <Link href="/shop" className={`block  relative`}>
                      <span>All</span>,&nbsp;

                      <StrikeIcon className="w-full absolute bottom-[-15%] left-0 right-0 scale-y-[1200%] rotate-[-2deg]" />
                    </Link>
                    {collections.map((e, i) => {
                      return (
                        <Link href={`/shop/collections/${e.node.handle}`} className={`block`} key={i}>{e.node.title}{(i+1) !== collections.length ? ',' : ''}&nbsp;</Link>
                      )
                    })}
                  </span>
                </m.div>
              </div>
            </div>
          </main>

          <m.div variants={fade}>
            <Footer noLogo />
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}

export async function getStaticProps(context) {
  // const cms = await pageService.fetchQuery(context)
  const products = await getAllProducts()
  const collections = await getAllCollections()

  return {
    props: { products, collections }
  }
}