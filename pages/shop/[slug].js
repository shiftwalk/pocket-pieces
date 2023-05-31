import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { getProductSlugs, getProduct, getAllProducts } from '@/helpers/shopify'
import { LazyMotion, domMax, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { useContext, useEffect, useState } from 'react'
import SanityPageService from '@/services/sanityPageService'
import { useAddToCartContext, useCartContext } from '@/context/store'
import { CartOpenContext } from '@/context/cart'
import EyesIcon from '@/icons/eyes.svg'
import Polaroid from '@/components/polaroid'
import MetaText from '@/components/meta-text'
import Link from 'next/link'
import Button from '@/components/button'
import StarIcon from '@/icons/star.svg'

const query = `{
  "musicVideos": *[_type == "musicVideos"] | order(date desc) {
    title,
  }
}`

const pageService = new SanityPageService(query)

export default function ShopSlug(initialData) {
  const { data: { productData, products } } = pageService.getPreviewHook(initialData)()
  const [cartIsOpenContext, setCartIsOpenContext] = useContext(CartOpenContext);
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

  const addToBag = () => {
    productData.availableForSale ? handleAddToCart() : null
    setTimeout(() => {
      cartIsOpenContext ? setCartIsOpenContext(false) : setCartIsOpenContext(true)
    }, 400);
  }

  let moneyUkLocale = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "GBP",
    useGrouping: true,
  });

  return (
    <Layout>
      <NextSeo title={productData.title} />

      <LazyMotion features={domMax}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <main className="pt-[70px] lg:pt-[85px]">
            {/* {JSON.stringify(productData)} */}
            <Container>
              <m.div variants={fade}>
                <div className="w-full mb-3 lg:mb-4 flex text-xs lg:text-sm uppercase relative z-10">
                  <Link href="/shop" className="block underline">Back to shop</Link>
                  <a href={`mailto:Pocketpiecesstore@gmail.com?subject=Hey! I have a question about ${productData.title}`} className="ml-auto hidden underline lg:flex">
                    <StarIcon className="w-6 mr-1" />
                    Got a question about this piece?
                  </a>
                </div>

                <div className="mb-8 w-full block lg:hidden">
                  <h1 className="text-[17vw] md:text-[12.5vw] lg:text-[10vw] leading-[0.76] md:leading-[0.7] lg:leading-[0.7] 2xl:leading-[0.7] max-w-[90%] lg:max-w-[90%] mb-4">{productData.title}</h1>
                  {productData.collections?.edges.some(e => e.node.title === 'For Hire') ? (
                    <span className="block text-xl lg:text-2xl font-light">For Hire</span>
                  ) : (
                    <span className="block text-xl lg:text-2xl font-light">{moneyUkLocale.format(productData.variants.edges[0].node.price.amount)}</span>
                  )}
                </div>

                <div className="flex flex-wrap h-full lg:min-h-[calc(100dvh-150px)]">
                  <div className="w-full lg:w-7/12 lg:pr-12 order-2 lg:order-1 flex flex-wrap h-full lg:min-h-[calc(100dvh-150px)]">
                    <div className="mb-12 w-full hidden lg:block">
                      <h1 className="text-[17vw] md:text-[12.5vw] lg:text-[10vw] leading-[0.76] md:leading-[0.7] lg:leading-[0.7] 2xl:leading-[0.7] max-w-[90%] lg:max-w-[90%] mb-4">{productData.title}</h1>

                      {productData.collections?.edges.some(e => e.node.title === 'For Hire') ? (
                        <span className="block text-2xl font-light">For Hire</span>
                      ) : (
                        <span className="block text-2xl font-light">{moneyUkLocale.format(productData.variants.edges[0].node.price.amount)}</span>
                      )}
                    </div>
                    
                    <div className="w-full mt-auto">
                      <div className="content max-w-3xl mb-5 text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: productData.descriptionHtml }}></div>

                      <span className="block underline mb-8 lg:mb-10 text-sm lg:text-base">The Pocket Pieces Sizing &amp; Condition Guide</span>

                      
                      {productData.collections?.edges.some(e => e.node.title === 'For Hire') ? (
                        <div className="flex space-x-3">
                          <a href={`mailto:Pocketpiecesstore@gmail.com?subject=Hey! I'd love to hire ${productData.title}`} className={`block uppercase rounded-[50%] px-8 lg:px-8 py-6 lg:py-6 text-center lg:text-lg lg:leading-none bg-off-black text-off-white border border-off-black hover:bg-transparent hover:text-off-black`}>
                            Hire Piece
                          </a>
                        </div>
                      ) : (
                        <>
                          {productData.availableForSale ? (
                            <div className="flex space-x-3">
                              <button onClick={addToBag} className={`block uppercase rounded-[50%] px-8 lg:px-8 py-6 lg:py-6 text-center lg:text-lg lg:leading-none bg-off-black text-off-white border border-off-black hover:bg-transparent hover:text-off-black ${ isLoading ? 'cursor-disabled' : ''}`}>
                                <span className="block relative">
                                  <span className={`absolute inset-0 text-center mx-auto flex items-center justify-center transition-opacity ease-in-out duration-[200ms] ${isLoading ? 'opacity-100' : 'opacity-0'}`}><StarIcon className={`w-[50px] ${isLoading && 'animate-blink'}`} /></span>
                                  <span className={`transition-opacity ease-in-out duration-[200ms] ${isLoading ? 'opacity-0' : 'opacity-100'}`}>Buy Piece</span>
                                </span>
                              </button>
                            </div>
                          ) : (
                            <span className="block line-through">Sold Out</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="w-full lg:w-5/12 2 order-1 lg:order-2 mb-8 lg:mb-0 mt-auto">
                    <Polaroid
                      noShadow
                      thin
                      product
                      metaText={productData.metaTitle ? productData.metaTitle.value : null}
                      bigMeta
                      number
                      image={productData.images.edges[0].node.originalSrc}
                      imageWidth={productData.images.edges[0].node.width}
                      imageHeight={productData.images.edges[0].node.height}
                      hoverImage={productData.images.edges[1] ? productData.images.edges[1].node.originalSrc : productData.images.edges[0].node.originalSrc}
                      hoverImageWidth={productData.images.edges[1] ? productData.images.edges[1].node.width : productData.images.edges[0].node.width}
                      hoverImageHeight={productData.images.edges[1] ? productData.images.edges[1].node.height : productData.images.edges[0].node.height}
                    />
                    {/* <span className="block lg:hidden text-xs uppercase pt-5 underline">Got a question about this piece?</span> */}
                  </div>
                </div>
                
                {productData.quote && (
                  <div className={`flex flex-wrap lg:justify-center ${productData.images.edges.length > 2 ? 'mt-[14vw] lg:mt-[15vw] mb-[5vw] lg:mb-[5vw]' : 'my-[14vw] lg:my-[15vw]' }`}>
                    <MetaText text="Phoebe Says" className="w-full lg:text-center order-1 lg:order-1" />
                    <blockquote className="font-display text-[15vw] md:text-[9vw] lg:text-[7.7vw] mb-[6vw] lg:mb-[4vw] leading-[0.8] md:leading-[0.8] lg:leading-[0.8] max-w-[90%] lg:max-w-[80%] lg:text-center w-full order-3 lg:order-2">“{productData.quote.value}”</blockquote>
                  </div>
                )}

              </m.div>
            </Container>
            
            {productData.images.edges.length > 2 && (
              <m.div variants={fade} className={`pb-[14vw] lg:pb-[15vw] ${!productData.quote ? 'mt-[14vw] lg:mt-[15vw]' : '' }`}>
                <div className="flex flex-wrap items-start p-10">
                  {productData.images.edges[1] && (
                    <m.div
                      drag
                      dragMomentum={false}
                      className="w-[85%] lg:w-[40%] cursor-grab lg:mt-[7vw]"
                    >
                      <Polaroid
                        thin
                        noShadow
                        image={productData.images.edges[1].node.originalSrc}
                        imageWidth={productData.images.edges[1].node.width}
                        imageHeight={productData.images.edges[1].node.height}
                        hoverImage={productData.images.edges[1].node.originalSrc}
                        hoverImageWidth={productData.images.edges[1].node.width}
                        hoverImageHeight={productData.images.edges[1].node.height}
                      />
                    </m.div>
                  )}
                  
                  {productData.images.edges[1] && (
                    <m.div
                      drag
                      dragMomentum={false}
                      className="w-[85%] lg:w-[50%] ml-auto mt-16 lg:mt-[3vw] cursor-grab"
                    >
                      <Polaroid
                        thin
                        noShadow
                        image={productData.images.edges[2].node.originalSrc}
                        imageWidth={productData.images.edges[2].node.width}
                        imageHeight={productData.images.edges[2].node.height}
                        hoverImage={productData.images.edges[2].node.originalSrc}
                        hoverImageWidth={productData.images.edges[2].node.width}
                        hoverImageHeight={productData.images.edges[2].node.height}
                      />
                    </m.div>
                  )}

                  {productData.images.edges[3] && (
                    <m.div 
                      drag
                      dragMomentum={false}
                      className="mx-auto w-[85%] lg:w-[40%] mt-16 lg:mt-[3vw] cursor-grab"
                    >
                      <Polaroid
                        thin
                        noShadow
                        image={productData.images.edges[3].node.originalSrc}
                        imageWidth={productData.images.edges[3].node.width}
                        imageHeight={productData.images.edges[3].node.height}
                        hoverImage={productData.images.edges[3].node.originalSrc}
                        hoverImageWidth={productData.images.edges[3].node.width}
                        hoverImageHeight={productData.images.edges[3].node.height}
                      />
                    </m.div>
                  )}
                </div>
              </m.div>
            )}
            
            {/* SECOND LOOK SECTION */}
            <m.div variants={fade}>
              <div className="bg-off-black text-off-white">
                <div className="relative flex overflow-x-hidden opacity-100 text-sm leading-none">
                  <div className="animate-marquee whitespace-nowrap py-2 will-change-transform">
                    {Array.from(Array(40), (e, i) => {
                      return (
                        <span className="mx-1 inline-block" key={i}><EyesIcon className="w-5 lg:w-6" /></span>
                      )
                    })}
                  </div>

                  <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-2 will-change-transform">
                    {Array.from(Array(40), (e, i) => {
                      return (
                        <span className="mx-1 inline-block" key={i}><EyesIcon className="w-5 lg:w-6" /></span>
                      )
                    })}
                  </div>
                </div>
                
                <div className="py-[16vw] lg:py-[12vw] 2xl:py-40">
                  <Container>
                    <div className="mb-20 md:mb-24 lg:mb-32 2xl:mb-48">
                      <h2 className="text-[22vw] lg:text-[17vw] mb-4 leading-[0.8] lg:leading-[0.8] text-center mx-auto">Second Look</h2>
                      <p className="w-10/12 lg:w-1/2 max-w-[620px] mx-auto text-center text-base lg:text-lg">Lorem ipsum dolor sit amet consectetuer adipicising elit aram et al lorem ipsum dolor sit amet.</p>
                    </div>
                  </Container>

                    <div className="relative flex overflow-x-hidden mb-16 md:mb-20 lg:mb-24 2xl:mb-32 overflow-y-hidden">
                      <div className="animate-marqueeSlow whitespace-nowrap will-change-transform">
                        {products.map((e, i) => {
                          return (
                            <span className="inline-block mx-4 md:mx-8 2xl:mx-12" key={i}>
                              <span className="inline-block w-[80vw] md:w-[45vw] lg:w-[36vw] relative">
                                <Link href={`/shop/${e.node.handle}`} className="w-full mx-auto block">
                                  <Polaroid
                                    thin
                                    noShadow
                                    product
                                    className="w-full text-off-black"
                                    hire={e.node.collections.edges.some(e => e.node.title === 'For Hire')}
                                    hireDark
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
                              </span>
                            </span>
                          )
                        })}
                      </div>

                      <div className="absolute top-0 animate-marqueeSlow2 whitespace-nowrap will-change-transform">
                        {products.map((e, i) => {
                          return (
                            <span className="inline-block mx-4 md:mx-8 2xl:mx-12" key={i}>
                              <span className="inline-block w-[80vw] md:w-[45vw] lg:w-[36vw] relative">
                                <Link href={`/shop/${e.node.handle}`} className="w-full mx-auto block">
                                  <Polaroid
                                    thin
                                    noShadow
                                    product
                                    className="w-full text-off-black"
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
                              </span>
                            </span>
                          )
                        })}
                      </div>
                    </div>

                    <Container>
                      <div className="flex justify-center">
                        <Button href="/shop" label="See all pieces" outlineWhite className="block" />
                      </div>
                    </Container>
                </div>
              </div>
            </m.div>
          </main>

          <m.div variants={fade} className="bg-off-black text-off-white">
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
  const products = await getAllProducts()

  return {
    props: { productData, products }
  }
}