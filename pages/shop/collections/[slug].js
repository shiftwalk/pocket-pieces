import Layout from '@/components/layout'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m, useScroll, useMotionValueEvent } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { getAllCollections, getAllProductsInCollection, getCollection, getCollectionSlugs, getProductSlugs } from '@/helpers/shopify'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import Polaroid from '@/components/polaroid'
import { useEffect, useRef, useState } from 'react'
import SanityPageService from '@/services/sanityPageService'
import Link from 'next/link'
import StarIcon from '@/icons/star.svg'

const query = `{
  "home": *[_type == "home"][0]{
    title
  },
}`

const pageService = new SanityPageService(query)

export default function CollectionSlug(initialData) {
  const { data: { collectionData, collections, products } } = pageService.getPreviewHook(initialData)()
  const scrollWrapper = useRef(null)
  const textRoller = useRef(null)
  const [filtersHidden, setFiltersHidden] = useState(false)
  const [currentView, setCurrentView] = useState('reel')
  const { scrollYProgress } = useScroll()
  
  useEffect(() => {
    textRoller.current.style.transform = `translateY(0)`
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    textRoller.current.style.transform = `translateY(-${(latest * ((products.length - 1) * 100))}%)`;
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setFiltersHidden(latest > 0.975)
  })

  let moneyUkLocale = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "GBP",
    useGrouping: true,
  });

  let viewLayoutContainer = 'w-10/12 md:w-7/12 lg:w-5/12 lg:max-w-[650px]' 
  let viewLayoutChildren = 'flex items-center pb-16 md:pb-20 lg:pb-32' 

  if (currentView == 'gallery') {
    viewLayoutContainer = 'w-11/12 md:w-11/12 lg:w-11/12 flex flex-wrap justify-center items-start' 
    viewLayoutChildren = 'flex items-center w-full lg:w-1/3 pb-[8vw] px-[2vw]'
  }

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
            <m.div variants={fade}>
              <div className="fixed top-0 left-0 pt-[70px] lg:pt-[85px] px-4 lg:px-6 z-[100]">
                <span className="mb-2 relative z-10 hidden lg:block">
                  <button className={`uppercase text-xs md:text-sm leading-none md:leading-none ${currentView == 'reel' && 'line-through'}`} onClick={()=> setCurrentView('reel')}>Reel</button> / <button className={`uppercase text-xs md:text-sm leading-none md:leading-none ${currentView == 'gallery' && 'line-through'}`} onClick={()=> setCurrentView('gallery')}>Gallery</button>
                </span>
                <span className="text-5xl lg:text-[5vw] font-display leading-[0.65] lg:leading-[0.65] flex">
                  <span className="block tabular-nums">
                    <span className="block overflow-hidden relative">
                      <span className="opacity-0">01</span>
                      <span className="block absolute inset-0" ref={textRoller}>
                        {products.map((e, i) => {
                          return (
                            <span key={i} className="block">{i+1 < 10 ? '0' : ''}{i + 1}</span>
                          )
                        })}
                      </span>
                    </span>
                  </span>
                  <span className="block">/0{products.length}</span>
                </span>
              </div>

              <div className="fixed top-0 right-0 pt-[70px] lg:pt-[85px] px-4 lg:px-6 z-[100]">
                <div className="w-[55px] lg:w-[6vw] max-w-[80px] mx-auto mb-5">
                  <LogoMarkOutlinedIcon />
                </div>
              </div>
              
              {/* <div className="fixed inset-0 flex md:items-center justify-center mt-40 lg:mt-0">
                <div className="relative w-full flex overflow-x-hidden overflow-y-hidden">
                  <div className="animate-marqueeDoubleSlow whitespace-nowrap will-change-transform">
                    {Array.from(Array(4), (e, i) => {
                      return (
                        <h1 key={i} className="inline-block text-[40vw] md:text-[38vw] lg:text-[36vw] leading-[1] md:leading-[1] lg:leading-[1] 2xl:leading-[1] 2xl:text-[42vw] text-center text-black text-opacity-[0.075] mx-[2.5vw] translate-y-[-2vw]">
                          <span className="inline-block">{collectionData.title}</span>
                          <StarIcon className="inline-block ml-[6vw] w-[15vw] translate-y-[-1.5vw]" />
                        </h1>
                      )
                    })}
                  </div>

                  <div className="absolute top-0 animate-marqueeDoubleSlow2 whitespace-nowrap will-change-transform">
                    {Array.from(Array(4), (e, i) => {
                      return (
                        <h1 key={i} className="inline-block text-[40vw] md:text-[38vw] lg:text-[36vw] leading-[1] md:leading-[1] lg:leading-[1] 2xl:leading-[1] 2xl:text-[42vw] text-center text-black text-opacity-[0.075] mx-[2.5vw] translate-y-[-2vw]">
                          <span className="inline-block">{collectionData.title}</span>
                          <StarIcon className="inline-block ml-[6vw] w-[15vw] translate-y-[-1.5vw]" />
                        </h1>
                      )
                    })}
                  </div>
                </div>
              </div> */}

              <h1 className="inline-block text-[30vw] md:text-[26vw] lg:text-[27vw] xl:text-[350px] leading-[1] md:leading-[1] lg:leading-[1] xl:leading-[1] text-off-black mx-auto w-full text-center pt-[120px] lg:pt-[45px]">
                <span className="inline-block">{collectionData.title}</span>
              </h1>

              <div className={`${viewLayoutContainer} mx-auto relative z-[50]  ${currentView == 'reel' ? 'pt-[30px] md:pt-[30px] lg:pt-[8dvh]' : 'pt-[30px] md:pt-[30px] lg:pt-[20dvh]' }`} ref={scrollWrapper}>
                {products.map((e, i) => {
                  return e.node.availableForSale && (
                    <div className={viewLayoutChildren} key={i}>
                      <Link href={`/shop/${e.node.handle}`} className="w-full mx-auto  max-w-[55vh] block">
                        <Polaroid
                          noShadow
                          thin
                          product
                          className="w-full"
                          hire={e.node.collections.edges.some(e => e.node.title === 'For Hire')}
                          collection={e.node.collections.edges[0].node.title}
                          metaText={e.node.metaTitle ? e.node.metaTitle.value : null}
                          metaHeading={e.node.title}
                          price={moneyUkLocale.format(e.node.variants.edges[0].node.price.amount)}
                          image={e.node.images.edges[0].node.originalSrc}
                          imageWidth={e.node.images.edges[0].node.width}
                          imageHeight={e.node.images.edges[0].node.height}
                          hoverImage={e.node.images.edges[1] ? e.node.images.edges[1].node.originalSrc : e.node.images.edges[0].node.originalSrc}
                          hoverImageWidth={e.node.images.edges[1] ? e.node.images.edges[1].node.width : e.node.images.edges[0].node.width}
                          hoverImageHeight={e.node.images.edges[1] ? e.node.images.edges[1].node.height : e.node.images.edges[0].node.height}
                        />
                      </Link>
                    </div>
                  )
                })}
              </div>

              <div className={`fixed bottom-0 w-full z-[51] hidden lg:flex justify-center transition-opacity ease-in-out duration-[250ms] ${filtersHidden ? 'opacity-0' : 'opacity-100' }`}>
                <div className="mx-auto w-auto relative inline-block pt-16 lg:pt-16 p-3 lg:p-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-100 via-zinc-100 to-transparent z-[20]"></div>
                  <span className="text-[12vw] lg:text-[6.25vw] 2xl:text-[100px] font-display leading-[0.65] lg:leading-[0.65] flex justify-center relative z-[21]">
                    <Link href="/shop" className={`block`}>All,&nbsp;</Link>
                    {collections.map((e, i) => {
                      return (
                        <Link href={`/shop/collections/${e.node.handle}`} className={`block`} key={i}><span className={`${collectionData.handle == e.node.handle ? 'line-through' : '' }`}>{e.node.title}</span>{(i+1) !== collections.length ? ',' : ''}&nbsp;</Link>
                      )
                    })}
                  </span>
                </div>
              </div>
            </m.div>
          </main>

          <m.div variants={fade}>
            <Footer noLogo />
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}


export async function getStaticPaths() {
  const collectionSlugs = await getCollectionSlugs()

  const paths = collectionSlugs.map((slug) => {
    const collectionSlug = String(slug.node.handle)
    
    return {
      params: { slug: collectionSlug }
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  // const cms = await pageService.fetchQuery(context)
  const collectionData = await getCollection(context.params.slug)
  const products = await getAllProductsInCollection(context.params.slug)
  const collections = await getAllCollections()

  return {
    props: { collectionData, collections, products }
  }
}