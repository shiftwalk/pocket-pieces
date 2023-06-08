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
import RelatedRoller from '@/components/related-roller'
import { IntroContext } from '@/context/intro'

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
  const [introContext, setIntroContext] = useContext(IntroContext);

  const isLoading = useCartContext()[2]
  const addToCart = useAddToCartContext()

  useEffect(() => {
    setIntroContext(true)
  },[]);

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

  const relatedOne = products.slice(0, Math.floor(products.length / 2));
  const relatedTwo = products.slice(Math.floor(products.length / 2), products.length);

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
                  <Link href="/shop" className="block group">
                    <div className="relative">
                      <div className="w-full relative overflow-hidden">
                        <span className="block transition-transform ease-in-out duration-[450ms] translate-y-0 group-hover:translate-y-[-100%] group-focus:translate-y-[-100%]">Back to shop</span>
                        <div className="absolute inset-0 w-full transition-transform ease-in-out duration-[450ms] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0">Back to shop</div>
                      </div>
                      <div className="w-full mx-auto h-px bg-black group-hover:w-1 transition-all ease-in-out duration-[450ms] mt-[2px]"></div>
                    </div>
                  </Link>

                  <a href={`mailto:Pocketpiecesstore@gmail.com?subject=Hey! I have a question about ${productData.title}`} className="ml-auto hidden lg:flex group">
                    <StarIcon className="w-6 mr-1" />
                    <div className="relative">
                      <div className="w-full relative overflow-hidden">
                        <span className="block transition-transform ease-in-out duration-[450ms] translate-y-0 group-hover:translate-y-[-100%] group-focus:translate-y-[-100%]">Got a question about this piece?</span>
                        <div className="absolute inset-0 w-full transition-transform ease-in-out duration-[450ms] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0">Got a question about this piece?</div>
                      </div>
                      <div className="w-full mx-auto h-px bg-black group-hover:w-1 transition-all ease-in-out duration-[450ms] mt-[2px]"></div>
                    </div>
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

                      <a href="#" className="inline-block mb-8 lg:mb-10 text-sm lg:text-base group">
                        <div className="relative">
                          <div className="w-full relative overflow-hidden">
                            <span className="block transition-transform ease-in-out duration-[450ms] translate-y-0 group-hover:translate-y-[-100%] group-focus:translate-y-[-100%]">The Pocket Pieces Sizing &amp; Condition Guide</span>
                            <div className="absolute inset-0 w-full transition-transform ease-in-out duration-[450ms] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0">The Pocket Pieces Sizing &amp; Condition Guide</div>
                          </div>
                          <div className="w-full mx-auto h-px bg-black group-hover:w-1 transition-all ease-in-out duration-[450ms] mt-[2px]"></div>
                        </div>
                      </a>

                      
                      {productData.collections?.edges.some(e => e.node.title === 'For Hire') ? (
                        <div className="flex space-x-3">
                          <a href={`mailto:Pocketpiecesstore@gmail.com?subject=Hey! I'd love to hire ${productData.title}`} className={`block uppercase rounded-[50%] px-8 lg:px-8 py-6 lg:py-6 text-center lg:text-lg lg:leading-none bg-black text-off-white border border-black relative overflow-hidden group`}>
                            <div className="relative overflow-hidden">
                              <div className="transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-0 group-hover:translate-y-[100%] group-hover:delay-[0ms] delay-[160ms]">Hire piece</div>
                              <div className={`transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] absolute inset-0 translate-y-[100%] group-hover:translate-y-0 z-20 group-hover:delay-[160ms] text-black`}>Hire piece</div>
                            </div>
                            <div className={`absolute inset-0 z-10 bg-zinc-100 transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-[-100%] group-hover:translate-y-0`}></div>
                          </a>
                        </div>
                      ) : (
                        <>
                          {productData.availableForSale ? (
                            <div className="flex space-x-3">
                              <button onClick={addToBag} className={`block uppercase rounded-[50%] px-8 lg:px-8 py-6 lg:py-6 text-center lg:text-lg lg:leading-none bg-black text-off-white border border-black ${ isLoading ? 'cursor-disabled' : ''} relative overflow-hidden group`}>

                                <div className="relative overflow-hidden">
                                  <div className="transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-0 group-hover:translate-y-[100%] group-hover:delay-[0ms] delay-[160ms]"><span className={`absolute inset-0 text-center mx-auto flex items-center justify-center transition-opacity ease-in-out duration-[200ms] ${isLoading ? 'opacity-100' : 'opacity-0'}`}><StarIcon className={`w-[50px] ${isLoading && 'animate-blink'}`} /></span><span className={`transition-opacity ease-in-out duration-[200ms] ${isLoading ? 'opacity-0' : 'opacity-100'}`}>Buy Piece</span></div>
                                  <div className={`transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] absolute inset-0 translate-y-[100%] group-hover:translate-y-0 z-20 group-hover:delay-[160ms] text-black`}>
                                  <span className={`absolute inset-0 text-center mx-auto flex items-center justify-center transition-opacity ease-in-out duration-[200ms] ${isLoading ? 'opacity-100' : 'opacity-0'}`}><StarIcon className={`w-[50px] ${isLoading && 'animate-blink'}`} /></span>
                                  <span className={`transition-opacity ease-in-out duration-[200ms] ${isLoading ? 'opacity-0' : 'opacity-100'}`}>Buy Piece</span></div>
                                </div>
                                <div className={`absolute inset-0 z-10 bg-zinc-100 transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-[-100%] group-hover:translate-y-0`}></div>
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
              <div className={`bg-off-black text-off-white ${(!productData.quote && productData.images.edges.length < 3) && 'mt-[10vw]'}`}>
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
                
                <div className="pt-[16vw] pb-[6vw] lg:py-[12vw] 2xl:py-40 2xl:pb-32">
                  <Container>
                    <div className="">
                      <h2 className="text-[22vw] lg:text-[17vw] mb-4 leading-[0.8] lg:leading-[0.8] text-center mx-auto">Second Look</h2>
                      <p className="w-10/12 lg:w-1/2 max-w-[620px] mx-auto text-center text-base lg:text-lg">Lorem ipsum dolor sit amet consectetuer adipicising elit aram et al lorem ipsum dolor sit amet.</p>
                    </div>
                  </Container>

                    <div className="relative">
                      <RelatedRoller items={products} itemsOne={relatedOne} itemsTwo={relatedTwo} />
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