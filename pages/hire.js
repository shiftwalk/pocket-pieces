import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domMax, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Polaroid from '@/components/polaroid'
import Button from '@/components/button'
import SanityPageService from '@/services/sanityPageService'
import { creditsQuery } from '@/helpers/queries'
import SanityImageTest from '@/components/sanity-image-test'
import { getAllProductsInCollection } from '@/helpers/shopify'
import Link from 'next/link'
import StrikeIcon from '@/icons/strike.svg'
import { IntroContext } from '@/context/intro'
import { useContext, useEffect } from 'react'
import AccordionItem from '@/components/accordion-item'
import { PortableText } from '@portabletext/react'
import MetaText from '@/components/meta-text'

const pageService = new SanityPageService(creditsQuery)

export default function Hire(initialData) {
  const { data: { credits, archives, products, cms }} = pageService.getPreviewHook(initialData)()

  const [introContext, setIntroContext] = useContext(IntroContext);

  useEffect(() => {
    setIntroContext(true)
  },[]);

  const tickerItems = ['#223', '#113', '#19', '#94', '#211', '#65', '#3', '#122', '#10', '#113', '#84', '#43', '#29', '#223', '#113', '#19', '#94', '#211', '#65', '#3', '#122', '#10', '#113', '#84', '#43', '#29', '#223', '#113', '#19', '#94', '#211', '#65', '#3', '#122', '#10', '#113' ]

  let moneyUkLocale = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "GBP",
    useGrouping: true,
  });

  return (
    <Layout>
      <NextSeo title={cms.credits.title} />

      <LazyMotion features={domMax}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <div className="pt-[78px] lg:pt-[90px] overflow-hidden">
            <div className="fixed inset-0 pointer-events-none scale-[1.15]"></div>
            <main className="relative z-[20]">
              <Container>
                <m.div variants={fade} className="mb-[15vw] lg:mb-[10vw]">
                  <div className="flex flex-wrap mb-[20vw] lg:mb-[15vw] xl:mb-[12.5vw] relative">
                    <div className="w-full lg:w-[55%] relative z-[20]">
                      <h1 className="text-[30vw] lg:text-[20vw] mb-4 leading-[0.8] lg:leading-[0.8]">{cms.credits.title}</h1>

                      <div className="content mb-[5vw]">
                        {cms.credits.heroText && (
                          <p className="text-base lg:text-base w-[90%] lg:w-[90%] max-w-3xl">{cms.credits.heroText}</p>
                        )}

                        <div className="mx-auto lg:flex">
                          <Button href="/shop/collections/for-hire" label="See hire selects" outline className="block lg:mx-auto" />
                        </div>
                      </div>
                    </div>


                    <div className="w-full lg:w-[45%] relative z-[20]">
                      {products[0] && (
                        <div className="w-[82%] lg:w-[90%] mx-auto rotate-[-4deg] mt-[15%]" >
                          <div className="w-full max-w-[55vh] mx-auto block lg:pr-[10%]">
                            <Link href={`/shop/${products[0].node.handle}`} className="w-full max-w-[55vh] mx-auto block">
                              <Polaroid
                                product
                                smallText
                                barcode={products[0].node.variants.edges[0].node.barcode}
                                matchHeight
                                className="w-full"
                                hire={products[0].node.collections.edges.some(e => products[0].node.title === 'For Hire')}
                                collection={products[0].node.collections.edges[0]?.node.title}
                                metaText={products[0].node.metaTitle ? products[0].node.metaTitle.value : null}
                                metaHeading={products[0].node.title}
                                price={moneyUkLocale.format(products[0].node.variants.edges[0]?.node.price.amount)}
                                image={products[0].node.images.edges[0]?.node.originalSrc}
                                imageWidth={products[0].node.images.edges[0]?.node.width}
                                imageHeight={products[0].node.images.edges[0]?.node.height}
                                hoverImage={products[0].node.images.edges[1] ? products[0].node.images.edges[1].node.originalSrc : products[0].node.images.edges[0]?.node.originalSrc}
                                hoverImageWidth={products[0].node.images.edges[1] ? products[0].node.images.edges[1].node.width : products[0].node.images.edges[0]?.node.width}
                                hoverImageHeight={products[0].node.images.edges[1] ? products[0].node.images.edges[1].node.height : products[0].node.images.edges[0]?.node.height}
                              />
                            </Link>
                          </div>
                        </div>
                       )}
                    </div>
                  </div>

                  <div className="flex flex-wrap mb-[20vw] lg:mb-[15vw] xl:mb-[12.5vw] relative">
                    <div className="w-full lg:w-[50%] relative z-[20] lg:mt-[-13%] 2xl:mt-[-18%]">
                      {products[1] && (
                        <div className="w-[85%] lg:w-[75%] mx-auto rotate-[3deg]">
                          <div className="w-full max-w-[55vh] mx-auto block">
                            <Link href={`/shop/${products[1].node.handle}`} className="w-full max-w-[55vh] mx-auto block">
                              <Polaroid
                                product
                                smallText
                                barcode={products[1].node.variants.edges[0].node.barcode}
                                matchHeight
                                className="w-full"
                                hire={products[1].node.collections.edges.some(e => products[1].node.title === 'For Hire')}
                                collection={products[1].node.collections.edges[0]?.node.title}
                                metaText={products[1].node.metaTitle ? products[1].node.metaTitle.value : null}
                                metaHeading={products[1].node.title}
                                price={moneyUkLocale.format(products[1].node.variants.edges[0]?.node.price.amount)}
                                image={products[1].node.images.edges[0]?.node.originalSrc}
                                imageWidth={products[1].node.images.edges[0]?.node.width}
                                imageHeight={products[1].node.images.edges[0]?.node.height}
                                hoverImage={products[1].node.images.edges[1] ? products[1].node.images.edges[1].node.originalSrc : products[1].node.images.edges[0]?.node.originalSrc}
                                hoverImageWidth={products[1].node.images.edges[1] ? products[1].node.images.edges[1].node.width : products[1].node.images.edges[0]?.node.width}
                                hoverImageHeight={products[1].node.images.edges[1] ? products[1].node.images.edges[1].node.height : products[1].node.images.edges[0]?.node.height}
                              />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-full lg:w-[50%] relative z-[20] mt-[20%] lg:mt-0">
                      {products[2] && (
                        <div className="w-[85%] lg:w-[70%] mx-auto rotate-[-1deg]">
                          <div className="w-full max-w-[55vh] mx-auto block">
                            <Link href={`/shop/${products[2].node.handle}`} className="w-full max-w-[55vh] mx-auto block">
                              <Polaroid
                                product
                                smallText
                                barcode={products[2].node.variants.edges[0].node.barcode}
                                matchHeight
                                className="w-full"
                                hire={products[2].node.collections.edges.some(e => products[2].node.title === 'For Hire')}
                                collection={products[2].node.collections.edges[0]?.node.title}
                                metaText={products[2].node.metaTitle ? products[2].node.metaTitle.value : null}
                                metaHeading={products[2].node.title}
                                price={moneyUkLocale.format(products[2].node.variants.edges[0]?.node.price.amount)}
                                image={products[2].node.images.edges[0]?.node.originalSrc}
                                imageWidth={products[2].node.images.edges[0]?.node.width}
                                imageHeight={products[2].node.images.edges[0]?.node.height}
                                hoverImage={products[2].node.images.edges[1] ? products[2].node.images.edges[1].node.originalSrc : products[2].node.images.edges[0]?.node.originalSrc}
                                hoverImageWidth={products[2].node.images.edges[1] ? products[2].node.images.edges[1].node.width : products[2].node.images.edges[0]?.node.width}
                                hoverImageHeight={products[2].node.images.edges[1] ? products[2].node.images.edges[1].node.height : products[2].node.images.edges[0]?.node.height}
                              />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
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
                    
                    {cms.credits.contentHeadingText && (
                      <div className="w-full relative z-[20] mb-[7vw] lg:mb-[4.5vw]">
                        <h2 className="block text-[12vw] lg:text-[9vw] text-center leading-[0.75]">{cms.credits.contentHeadingText}</h2>
                      </div>
                    )}
                  </div>


                  {/* NEW */}

                  <div className="mt-[12vw] lg:mt-[12.5vw]">
                    <div className="">
                      <Container className="relative z-[10]">
                        <MetaText text="Collabs" />
                        {cms.credits.collabsHeadingText && (
                          <h2 className="text-[15vw] md:text-[9vw] lg:text-[7.7vw] mb-4 leading-[0.75] md:leading-[0.75] lg:leading-[0.75] text-left max-w-[90%] lg:max-w-[85%]">{cms.credits.collabsHeadingText}</h2>
                        )}
                      </Container>

                      <div className="flex flex-wrap mt-[12vw] lg:mt-[7.5vw]">
                        <div className="w-full lg:w-7/12 relative min-h-[70vw] lg:min-h-0 hidden lg:block">
                          <m.div 
                            drag
                            dragMomentum={false}
                            className="absolute top-[0%] lg:top-[20%] left-[-14%] w-[55%] lg:w-[45%] cursor-grab z-[5]"
                          >
                            <Polaroid
                              className="rotate-[-13deg] lg:rotate-[9deg]"
                              image={cms.credits.polaroids[0]?.images[0]}
                              hoverImage={cms.credits.polaroids[0]?.images[1] ? cms.credits.polaroids[0]?.images[1] : cms.credits.polaroids[0]?.images[0]}
                              sanity
                            />
                          </m.div>
                          
                          {cms.credits.polaroids[1] && (
                            <m.div 
                              drag
                              dragMomentum={false}
                              className="absolute top-[-20%] lg:top-[0%] left-[65%] lg:left-[27%] w-[65%] lg:w-[45%] cursor-grab z-[4]"
                            >
                              <Polaroid
                                className="rotate-[9deg] lg:rotate-[-7deg]"
                                image={cms.credits.polaroids[1]?.images[0]}
                                hoverImage={cms.credits.polaroids[1]?.images[1] ? cms.credits.polaroids[1]?.images[1] : cms.credits.polaroids[1]?.images[0]}
                                sanity
                              />
                            </m.div>
                          )}

                          { cms.credits.polaroids[2] && (
                            <m.div 
                              drag
                              dragMomentum={false}
                              className="absolute top-[20%] left-[40%] w-[45%] cursor-grab z-[3] hidden lg:block"
                            >
                              <Polaroid
                                className="rotate-[2deg]"
                                image={cms.credits.polaroids[2]?.images[0]}
                                hoverImage={cms.credits.polaroids[2]?.images[1] ? cms.credits.polaroids[2]?.images[1] : cms.credits.polaroids[2]?.images[0]}
                                sanity
                              />
                            </m.div>
                          )}
                        </div>

                        <div className="w-full lg:w-7/12 relative min-h-[70vw] lg:min-h-0 block lg:hidden">
                          <m.div 
                            className="absolute top-[0%] lg:top-[20%] left-[-14%] w-[55%] lg:w-[45%]  z-[5]"
                          >
                            <Polaroid
                              className="rotate-[-13deg] lg:rotate-[9deg]"
                              image={cms.credits.polaroids[0]?.images[0]}
                              hoverImage={cms.credits.polaroids[0]?.images[1] ? cms.credits.polaroids[0]?.images[1] : cms.credits.polaroids[0]?.images[0]}
                              sanity
                            />
                          </m.div>
                          
                          {cms.credits.polaroids[1] && (
                            <m.div 
                              className="absolute top-[-20%] lg:top-[0%] left-[65%] lg:left-[27%] w-[65%] lg:w-[45%]  z-[4]"
                            >
                              <Polaroid
                                className="rotate-[9deg] lg:rotate-[-7deg]"
                                image={cms.credits.polaroids[1]?.images[0]}
                                hoverImage={cms.credits.polaroids[1]?.images[1] ? cms.credits.polaroids[1]?.images[1] : cms.credits.polaroids[1]?.images[0]}
                                sanity
                              />
                            </m.div>
                          )}

                          { cms.credits.polaroids[2] && (
                            <m.div 
                              className="absolute top-[7%] left-[35%] w-[45%]  z-[3] hidden lg:block"
                            >
                              <Polaroid
                                className="rotate-[2deg]"
                                image={cms.credits.polaroids[2]?.images[0]}
                                hoverImage={cms.credits.polaroids[2]?.images[1] ? cms.credits.polaroids[2]?.images[1] : cms.credits.polaroids[2]?.images[0]}
                                sanity
                              />
                            </m.div>
                          )}
                        </div>

                        <div className="w-full lg:w-5/12 px-4 lg:px-6 max-w-[800px] lg:mx-auto">
                          <MetaText text="INTRODUCING A SPECIAL STYLING SERVICE" />
                          <div className="content lg:text-base w-11/12 lg:w-10/12">
                            {cms.credits.collabsText && (
                              <PortableText value={cms.credits.collabsText} />
                            )}
                            
                            <div className="grid grid-cols-2 mt-12 md:mt-16 lg:mt-12">
                              <div className="col-span-1 flex flex-col">
                                <span className="block w-10/12 max-w-[240px] mb-3 bg-off-white">
                                  <Image src="/images/sig.png" alt="Phoebe Signature" width={424} height={132} className="mix-blend-darken" />
                                </span>

                                <p className="text-sm lg:text-base mt-auto">Phoebe Pocket</p>
                              </div>
                              <div className="col-span-1 flex flex-col">
                                <span className="block w-10/12 max-w-[240px] mb-3 bg-off-white">
                                  <Image src="/images/sig-jess.png" alt="Phoebe Signature" width={293} height={119} />
                                </span>

                                <p className="text-sm lg:text-base">Jessica de Lotz</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="w-full mt-12">
                            <Button href="/shop/collections/collabs" label="Shop the collab" outline className="block" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  {cms.credits.questions && (
                    <div className="flex flex-wrap pt-[12vw] lg:pt-[8vw] 2xl:pt-40 mt-[12vw] lg:mt-[7.5vw]">
                      <div className="w-full lg:w-[45%] lg:text-center">
                        <h2 className="text-[48px] lg:text-[58px] leading-none lg:leading-none mb-8 lg:mb-12">How Hiring Works</h2>
                      </div>
                      <div className="w-full lg:w-[55%] pt-6">
                        {cms.credits.questions.map((e,i) => {
                          return (
                            <div className="mb-16 xl:mb-20 max-w-screen-lg w-[95%] lg:w-[85%]" key={i}>
                            <h3 className="font-normal text-lg leading-none block mb-6">{e.question}</h3>
                            <div className="font-light content"><PortableText value={e.answer} /></div>
                          </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </m.div>
              </Container>

              <m.div variants={fade}>
                <div className="bg-off-black text-off-white">
                  <div className="relative flex overflow-x-hidden opacity-75 text-sm leading-none">
                    <div className="animate-marquee whitespace-nowrap py-2 will-change-transform">
                      {tickerItems.map((e, i) => {
                        return (
                          <span className="mx-1" key={i}>{e},</span>
                        )
                      })}
                    </div>

                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-2 will-change-transform">
                      {tickerItems.map((e, i) => {
                        return (
                          <span className="mx-1" key={i}>{e},</span>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="py-[16vw] lg:py-[12vw] 2xl:py-48">
                    <Container>
                      <div className="mb-20 md:mb-24 lg:mb-32 2xl:mb-48">
                        <h2 className="text-[22vw] lg:text-[17vw] mb-4 leading-[0.8] lg:leading-[0.8] text-center mx-auto relative">
                          <span className="relative inline-block">
                            The Archives
                            <StrikeIcon className="w-full absolute bottom-[35%] lg:bottom-[40%] left-0 right-0 rotate-[-4.5deg] lg:rotate-[-3.3deg] lg:scale-y-[2] scale-x-[1.025]" />
                          </span>
                        </h2>
                        <p className="w-10/12 lg:w-1/2 max-w-[620px] mx-auto text-center text-base lg:text-lg">Previous Pocket Pieces from the history books that have since moved on to new owners.</p>
                      </div>
                    </Container>

                      <div className="relative flex overflow-x-hidden mb-20 md:mb-24 lg:mb-32 2xl:mb-40 overflow-y-hidden">
                        <div className="animate-marqueeSlow whitespace-nowrap will-change-transform">
                          {cms.archives.map((e, i) => {
                            return (
                              <span className="inline-block mx-4 md:mx-8 2xl:mx-12" key={i}>
                                <span className="inline-block w-[50vw] md:w-[38vw] lg:w-[25vw] relative"><SanityImageTest image={e.image} className="w-full " alt="placeholder" /></span>
                                
                                <span className="block mt-4">
                                  <span className="block uppercase text-xs lg:text-sm">&quot;{e.metaTitle}&quot;</span>

                                  <span className="font-display text-[10vw] md:text-[6.5vw] lg:text-[4.25vw] 2xl:text-[70px] leading-[0.95] md:leading-[0.95] lg:leading-[0.95] 2xl:leading-[0.95]">{e.title}</span>
                                </span>
                              </span>
                            )
                          })}
                        </div>

                        <div className="absolute top-0 animate-marqueeSlow2 whitespace-nowrap will-change-transform">
                          {cms.archives.map((e, i) => {
                            return (
                              <span className="inline-block mx-4 md:mx-8 2xl:mx-12" key={i}>
                                <span className="inline-block w-[50vw] md:w-[38vw] lg:w-[25vw] relative"><SanityImageTest image={e.image} className="w-full " alt="placeholder" /></span>
                                
                                <span className="block mt-4">
                                  <span className="block uppercase text-xs lg:text-sm">&quot;{e.metaTitle}&quot;</span>

                                  <span className="font-display text-[10vw] md:text-[6.5vw] lg:text-[4.25vw] 2xl:text-[70px] leading-[0.95] md:leading-[0.95] lg:leading-[0.95] 2xl:leading-[0.95]">{e.title}</span>
                                </span>
                              </span>
                            )
                          })}
                        </div>
                      </div>

                      <Container>
                      <div className="flex justify-center">
                        <Button href="/shop" label="Shop latest pieces" outlineWhite className="block" />
                      </div>
                    </Container>
                  </div>
                </div>
              </m.div>
            </main>

            <m.div variants={fade} className="bg-off-black text-off-white">
              <Footer />
            </m.div>
          </div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const cms = await pageService.fetchQuery(context)
  const products = await getAllProductsInCollection('showstoppers')

  return {
    props: { products, cms }
  }
}