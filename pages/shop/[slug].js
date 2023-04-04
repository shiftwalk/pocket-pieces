import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { getProductSlugs, getProduct } from '@/helpers/shopify'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import {PortableText} from '@portabletext/react'
import SanityPageService from '@/helpers/sanity-page-service'
import { useAddToCartContext, useCartContext } from '@/context/store'
import Image from 'next/image'
import Polaroid from '@/components/polaroid'
import MetaText from '@/components/meta-text'
import Link from 'next/link'

const query = `{
  "musicVideos": *[_type == "musicVideos"] | order(date desc) {
    title,
  }
}`

const pageService = new SanityPageService(query)

export default function ShopSlug(initialData) {
  const { data: { productData } } = pageService.getPreviewHook(initialData)()
  const [variantPrice, setVariantPrice] = useState(productData.variants.edges[0].node.price.amount)
  const [quantity, setQuantity] = useState(1)
  const [variantId, setVariantId] = useState(productData.variants.edges[0].node.id)
  const [variant, setVariant] = useState(productData.variants.edges[0])
  const isLoading = useCartContext()[2]
  const addToCart = useAddToCartContext()

  async function handleAddToCart() {
    const varId = variant.node.id
    // update store context
    if (quantity !== '') {
      addToCart({
        productTitle: productData.title,
        productHandle: productData.handle,
        productImage: productData.images.edges[0].node,
        variantId: varId,
        variantPrice: variant.node.price.amount,
        variantTitle: variant.node.title,
        variantQuantity: 1
      })
    }
  }

  return (
    <Layout>
      <NextSeo title={productData.title} />

      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <main className="mb-12 md:mb-16 xl:mb-24 pt-[70px] lg:pt-[85px]">
            {/* {JSON.stringify(productData)} */}
            <Container>
              <m.div variants={fade}>
                <div className="w-full mb-3 lg:mb-4 flex text-xs lg:text-sm uppercase relative z-10">
                  <Link href="/shop" className="block">Back to shop</Link>
                  <span className="ml-auto hidden lg:block">Sizing Guide &bull; Hire This Piece &bull; Ask A Question</span>
                </div>

                <div className="flex flex-wrap h-full lg:min-h-[calc(100dvh-150px)]">
                  <div className="w-full lg:w-7/12 lg:pr-12 order-2 lg:order-1 flex flex-wrap h-full lg:min-h-[calc(100dvh-150px)]">
                    <div className="mb-12 w-full">
                      <h1 className="text-[17vw] md:text-[12.5vw] lg:text-[12vw] 2xl:text-[200px] leading-[0.76] md:leading-[0.7] lg:leading-[0.7] 2xl:leading-[0.7] max-w-[90%] lg:max-w-[90%] mb-4">{productData.title}</h1>
                      <span className="block text-2xl font-light">&pound;{productData.variants.edges[0].node.price.amount}</span>
                    </div>
                    
                    <div className="mb-4 w-full mt-auto">
                      <div className="content max-w-3xl mb-10" dangerouslySetInnerHTML={{ __html: productData.descriptionHtml }}></div>

                      {productData.availableForSale ? (
                        <button onClick={productData.availableForSale ? handleAddToCart : null} className={`uppercase rounded-[50%] px-5 lg:px-8 py-6 lg:py-8 text-center lg:text-lg lg:leading-none bg-black text-off-white ${ isLoading ? 'cursor-disabled' : ''}`}>
                          { isLoading ? 'Added to bag' : 'Buy Piece'}
                        </button>
                      ) : (
                        <span className="block line-through">Sold Out</span>
                      )}
                    </div>
                  </div>

                  <div className="w-full lg:w-5/12 2 order-1 lg:order-2 mb-8 lg:mb-0 mt-auto">
                    <Polaroid
                      noShadow
                      thin
                      product
                      metaText={productData.metaTitle ? productData.metaTitle.value : null}
                      image={productData.images.edges[0].node.originalSrc}
                      imageWidth={1087}
                      imageHeight={1087}
                      hoverImage={productData.images.edges[1] ? productData.images.edges[1].node.originalSrc : false}
                      hoverImageWidth={1087}
                      hoverImageHeight={1087}
                    />
                    <span className="block lg:hidden text-xs uppercase pt-5">Sizing Guide &bull; Hire This Piece &bull; Ask A Question</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap lg:justify-center mt-[12vw] lg:mt-[10.25vw]">
                  <MetaText text="Phoebe Says" className="w-full lg:text-center order-1 lg:order-1" />
                  <blockquote className="font-display text-[15vw] md:text-[9vw] lg:text-[7.7vw] mb-[6vw] lg:mb-[4vw] leading-[0.8] md:leading-[0.8] lg:leading-[0.8] max-w-[90%] lg:max-w-[80%] lg:text-center w-full order-3 lg:order-2">“True A-lister jacket — this badboy piece will certainly draw eyes & sizzle at any party, any time.”</blockquote>
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


export async function getStaticPaths() {
  const productSlugs = await getProductSlugs()

  const paths = productSlugs.map((slug) => {
    const productSlug = String(slug.node.handle)
    
    return {
      params: { slug: productSlug }
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  // const cms = await pageService.fetchQuery(context)
  const productData = await getProduct(context.params.slug)

  return {
    props: { productData }
  }
}