import Layout from '@/components/layout'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m, useScroll, useMotionValueEvent } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { getAllProductsInCollection } from '@/helpers/shopify'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import Polaroid from '@/components/polaroid'
import { useEffect, useRef, useState } from 'react'
import SanityPageService from '@/helpers/sanity-page-service'
import Link from 'next/link'

const query = `{
  "home": *[_type == "home"][0]{
    title
  },
}`

const pageService = new SanityPageService(query)

export default function Shop(initialData) {
  const { data: { products } } = pageService.getPreviewHook(initialData)()
  const scrollWrapper = useRef(null)
  const textRoller = useRef(null)
  const [filtersHidden, setFiltersHidden] = useState(false)

  const { scrollYProgress } = useScroll()
  
  useEffect(() => {
    textRoller.current.style.transform = `translateY(0)`
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    textRoller.current.style.transform = `translateY(-${latest * 93.75}%)`;
    setFiltersHidden(latest > 0.98)
  })

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
          <main className="pb-[55vw] md:pb-[20vw] xl:pb-[20vw]">
            <m.div variants={fade}>
              <div className="fixed top-0 left-0 pt-[70px] lg:pt-[85px] px-4 lg:px-6 z-[100]">
                <span className="block uppercase text-xs md:text-sm leading-none md:leading-none mb-2">Reel / Gallery</span>
                <span className="text-5xl lg:text-[5vw] font-display leading-[0.65] lg:leading-[0.65] flex">
                  <span className="block tabular-nums">
                    <span className="block overflow-hidden relative">
                      <span className="opacity-0">01</span>
                      <span className="block absolute top-0 left-0" ref={textRoller}>
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
              
              <h1 className="text-[40vw] md:text-[38vw] lg:text-[36vw] leading-[0.65] md:leading-[0.65] lg:leading-[0.65] 2xl:leading-[0.65] 2xl:text-[42vw] text-center mb-10 md:mb-12 lg:mb-28 fixed inset-0 flex items-center justify-center opacity-[0.1]">
              <span className="block">The Pieces</span></h1>

              <div className="w-10/12 md:w-7/12 lg:w-5/12 lg:max-w-[650px] mx-auto relative z-[50] pt-[45dvh]" ref={scrollWrapper}>
                {products.map((e, i) => {
                  return e.node.availableForSale && (
                    <div className="flex items-center pb-16 md:pb-20 lg:pb-32" key={i}>
                      <Link href={`shop/${e.node.handle}`} className="w-full max-w-[55vh] mx-auto block">
                        <Polaroid
                          noShadow
                          thin
                          product
                          className="w-full"
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
            <Footer noLogo />
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}

export async function getStaticProps(context) {
  // const cms = await pageService.fetchQuery(context)
  const products = await getAllProductsInCollection()

  return {
    props: { products }
  }
}