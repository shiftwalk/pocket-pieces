import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { getProductSlugs, getProduct, getAllProductsRelated } from '@/helpers/shopify'
import { AnimatePresence, LazyMotion, domMax, m } from 'framer-motion'
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
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import Image from 'next/image'
import SanityImageTest from '@/components/sanity-image-test'

const query = `{
  "globals": *[_type == "globals"][0] {
    title,
    sizeGuideClothingDesktopImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
    sizeGuideClothingMobileImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
    sizeGuideShoesDesktopImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
    sizeGuideShoesMobileImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
    conditionGuideText,
    conditions[] {
      heading,
      text,
      stars
    },
    conditionGuideImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
  }
}`

const pageService = new SanityPageService(query)

export default function ShopSlug(initialData) {
  const { data: { productData, products, cms } } = pageService.getPreviewHook(initialData)()
  const [cartIsOpenContext, setCartIsOpenContext] = useContext(CartOpenContext);
  const [variantPrice, setVariantPrice] = useState(productData.variants.edges[0]?.node.price.amount)
  const [quantity, setQuantity] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('size')
  const [variantId, setVariantId] = useState(productData.variants.edges[0]?.node.id)
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
            <Container>
              <m.div variants={fade}>
                <div className="w-full mb-3 lg:mb-4 flex text-xs lg:text-sm tracking-tighter uppercase relative z-10 lg:justify-end">
                  <Link href="/shop" className="block group">
                    <div className="relative">
                      <div className="w-full relative overflow-hidden">
                        <span className="block transition-transform ease-in-out duration-[450ms] translate-y-0 group-hover:translate-y-[-100%] group-focus:translate-y-[-100%]">Back to shop</span>
                        <div className="absolute inset-0 w-full transition-transform ease-in-out duration-[450ms] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0">Back to shop</div>
                      </div>
                      <div className="w-full mx-auto h-px bg-black group-hover:w-1 transition-all ease-in-out duration-[450ms] mt-[2px]"></div>
                    </div>
                  </Link>

                  <a href={`mailto:Pocketpiecesstore@gmail.com?subject=Hey! I have a question about ${productData.title}`} className="ml-2 hidden lg:flex group">
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
                  <h1 className="text-[17vw] md:text-[12.5vw] lg:text-[10vw] leading-[0.76] md:leading-[0.7] lg:leading-[0.7] 2xl:leading-[0.7] max-w-[90%] lg:max-w-[90%] mb-1 lg:mb-4">{productData.title}</h1>
                  {productData.collections?.edges.some(e => e.node.title === 'For Hire' || e.node.title === 'Collabs') ? (
                    <span className="block text-xl lg:text-2xl font-light">For Hire</span>
                  ) : (
                    <span className="block text-xl lg:text-2xl font-light">{moneyUkLocale.format(productData.variants.edges[0].node.price.amount)}</span>
                  )}
                </div>

                <div className="flex flex-wrap h-full lg:min-h-[calc(100dvh-150px)]">
                  <div className="w-full lg:w-7/12 lg:pr-6 order-2 lg:order-1 flex flex-wrap h-full lg:min-h-[calc(100dvh-150px)]">
                    <div className="mb-12 w-full hidden lg:block">
                      <h1 className="text-[17vw] md:text-[12.5vw] lg:text-[10vw] leading-[0.76] md:leading-[0.7] lg:leading-[0.7] 2xl:leading-[0.7] max-w-[90%] lg:max-w-[90%] mb-4 lg:-mt-10">{productData.title}</h1>

                      {productData.collections?.edges.some(e => e.node.title === 'For Hire' || e.node.title === 'Collabs') ? (
                        <span className="block text-2xl font-light">For Hire</span>
                      ) : (
                        <span className="block text-2xl font-light">{moneyUkLocale.format(productData.variants.edges[0].node.price.amount)}</span>
                      )}
                    </div>
                    
                    <div className="w-full mt-auto">
                      <div className="content max-w-3xl mb-6 text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: productData.descriptionHtml }}></div>
                      
                      <div className="flex space-x-2 items-center lg:items-end">
                        {productData.collections?.edges.some(e => e.node.title === 'For Hire' || e.node.title === 'Collabs') ? (
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
                                <button onClick={addToBag} className={`block uppercase rounded-[50%] px-4 lg:px-8 py-4 lg:py-6 text-center lg:text-lg lg:leading-none bg-black text-off-white border border-black ${ isLoading ? 'cursor-disabled' : ''} relative overflow-hidden group`}>

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
                        
                        <div className="ml-auto flex-1">
                          <button onClick={()=>setModalOpen(true)} className="block ml-auto mr-0 group justify-self-end">
                            <div className="relative">
                              <div className="w-full relative overflow-hidden text-xs lg:text-sm tracking-tight uppercase">
                                <span className="block transition-transform ease-in-out duration-[450ms] translate-y-0 group-hover:translate-y-[-100%] group-focus:translate-y-[-100%]">Sizing &amp; Condition Guide</span>
                                <div className="absolute inset-0 w-full transition-transform ease-in-out duration-[450ms] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0">Sizing &amp; Condition Guide</div>
                              </div>
                              <div className="w-full mx-auto h-px bg-black group-hover:w-1 transition-all ease-in-out duration-[450ms] mt-[2px]"></div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-5/12 2 order-1 lg:order-2 mb-4 lg:mb-0 mt-auto relative overflow-hidden h-[75dvh] lg:h-[calc(100dvh-160px)]">
                    <Image src={productData.images.edges[0]?.node.originalSrc} fill sizes="(min-width: 1024px) 75vw, 90vw" className={`w-full absolute inset-0 object-cover object-center`} alt="placeholder" />

                    {/* <Polaroid
                      noShadow
                      thin
                      product
                      metaText={productData.metaTitle ? productData.metaTitle.value : null}
                      bigMeta
                      barcode={productData.variants.edges[0].node.barcode}
                      number
                      image={productData.images.edges[0]?.node.originalSrc}
                      imageWidth={productData.images.edges[0]?.node.width}
                      imageHeight={productData.images.edges[0]?.node.height}
                      hoverImage={productData.images.edges[1] ? productData.images.edges[1].node.originalSrc : productData.images.edges[0]?.node.originalSrc}
                      hoverImageWidth={productData.images.edges[1] ? productData.images.edges[1].node.width : productData.images.edges[0]?.node.width}
                      hoverImageHeight={productData.images.edges[1] ? productData.images.edges[1].node.height : productData.images.edges[0]?.node.height}
                    /> */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start p-6 md:p-10 gap-6 md:gap-10 justify-center">
                  {productData.images.edges.map((e, i ) => {
                    return (
                      <div className="col-span-3 md:col-span-1 lg:col-span-1" key={i}>
                        <Image src={e.node.originalSrc} width={e.node.width / 5} height={e.node.height / 5} className={`w-full`} alt="placeholder" />

                        {/* <Polaroid
                          thin
                          noShadow
                          noText
                          noPadding
                          noHover
                          key={i}
                          image={e.node.originalSrc}
                          imageWidth={e.node.width}
                          imageHeight={e.node.height}
                          hoverImage={e.node.originalSrc}
                          hoverImageWidth={e.node.width}
                          hoverImageHeight={e.node.height}
                        /> */}
                      </div>
                    )
                  })}
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
                      <h2 className="text-[22vw] lg:text-[17vw] leading-[0.8] lg:leading-[0.8] text-center mx-auto">Second Look</h2>
                      <p className="w-10/12 lg:w-1/2 max-w-[620px] mx-auto text-center text-base lg:text-lg">Pieces to pique your interest.</p>
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
          
          <AnimatePresence>
            {modalOpen && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 w-full h-full flex flex-col items-center justify-center z-[100000]" data-lenis-prevent
              >
                <button className="inset-0 absolute bg-black/90" onClick={()=> setModalOpen(false)}></button>

                <div className="w-[88vw] h-auto max-h-[84.5dvh] bg-white max-w-[1280px] p-5 relative overflow-y-scroll">
                  <h2 className="text-[17vw] md:text-[12.5vw] lg:text-[10vw] leading-[0.76] md:leading-[0.7] lg:leading-[0.7] 2xl:leading-[0.7] 2xl:text-[165px] max-w-[90%] lg:max-w-[90%] mb-3 md:mb-10">Size &amp; Condition Guide</h2>

                  <div className="flex space-x-2 uppercase text-sm mb-8">
                    <button onClick={()=> setModalMode('size')} className={`uppercase text-sm border-b leading-none tracking-tight ${modalMode == 'size' ? 'border-black' : 'border-transparent' }`}>
                      Size Guide
                    </button>
                    <span className="block">/</span>
                    <button onClick={()=> setModalMode('condition')} className={`uppercase text-sm border-b leading-none tracking-tight  ${modalMode == 'condition' ? 'border-black' : 'border-transparent'}`}>
                      Condition Guide
                    </button>
                  </div>

                  {modalMode == 'size' ? (
                    <div className="w-full">
                      <div className="mb-5 md:mb-8 xl:mb-12">
                        <h3 className="font-display text-5xl md:text-6xl xl:text-7xl mb-2">Clothing</h3>
                        <SanityImageTest image={cms.globals.sizeGuideClothingDesktopImage ? cms.globals.sizeGuideClothingDesktopImage : null} className={`hidden md:block w-full`} alt="size guide" />

                        <SanityImageTest image={cms.globals.sizeGuideClothingMobileImage ? cms.globals.sizeGuideClothingMobileImage : null} className={`block md:hidden w-full`} alt="size guide" />
                      </div>

                      <div className="">
                        <h3 className="font-display text-5xl md:text-6xl xl:text-7xl mb-2">Shoes</h3>

                        <SanityImageTest image={cms.globals.sizeGuideShoesDesktopImage ? cms.globals.sizeGuideShoesDesktopImage : null} className={`hidden md:block w-full`} alt="size guide" />

                        <SanityImageTest image={cms.globals.sizeGuideShoesMobileImage ? cms.globals.sizeGuideShoesMobileImage : null} className={`block md:hidden w-full`} alt="size guide" />
                      </div>
                    </div>
                  ) : (
                    <div className="md:w-[85%]">
                      {cms.globals.conditionGuideText && (
                        <p className="text-sm md:text-base mb-6">{cms.globals.conditionGuideText}</p>
                      )}

                      <div className="w-full flex flex-wrap">
                        <div className="w-[37%] hidden xl:block">
                          <div className="w-full aspect-square bg-black/10 relative overflow-hidden">
                            <SanityImageTest eager={false} image={cms.globals.conditionGuideImage ? cms.globals.conditionGuideImage : null} fill className={`block  z-[10] object-cover object-center aspect-square absolute inset-0 w-full h-full`} alt="placeholder" />
                          </div>
                        </div>

                        <div className="flex-1 xl:pl-8">
                          {cms.globals.conditions.map((e, i) => {
                            return (
                              <div className={`mb-4 last-of-type:mb-0`} key={i}>
                                <h3 className="font-display text-4xl xl:text-5xl mb-2">{e.heading}</h3>
                                
                                <div className="flex space-x-1.5 mb-2">
                                  {Array.from(Array(Number(e.stars)), (e, i) => {
                                    return (
                                      <LogoMarkOutlinedIcon className="w-9" key={i} />
                                    )
                                  })}
                                </div>

                                <p className={`text-xs md:text-sm ${cms.globals.conditions.length == i + 1 ? '' : 'mb-6' }`}>{e.text}</p>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                    
                    
                  <button onClick={()=> setModalOpen(false)} className="w-7 md:w-10 xl:w-12 h-7 md:h-10 xl:h-12 bg-black rounded-full flex items-center justify-center absolute top-2 right-2 md:top-4 md:right-4 group" aria-label="Close Modal">
                    <svg className="w-[55%] group-hover:w-[65%] transition-all ease-in-out duration-300" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="m0 15.152 25.98-15 1 1.732-25.98 15z"/><path fill="#fff" d="m1 0 25.98 15-1 1.732L0 1.732z"/></svg>
                  </button>
                </div>
              </m.div>
            )}
          </AnimatePresence>

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
  const cms = await pageService.fetchQuery(context)
  const productData = await getProduct(context.params.slug)
  const products = await getAllProductsRelated()

  return {
    props: { productData, products, cms }
  }
}