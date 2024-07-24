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
// import { getAllProductsInCollection } from '@/helpers/shopify'
import Link from 'next/link'
import StrikeIcon from '@/icons/strike.svg'
import { IntroContext } from '@/context/intro'
import { useContext, useEffect } from 'react'

const pageService = new SanityPageService(creditsQuery)

export default function Hire(initialData) {
  const { data: { credits, archives }} = pageService.getPreviewHook(initialData)()

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
      <NextSeo title={credits.title} />

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
                      <h1 className="text-[30vw] lg:text-[20vw] mb-4 leading-[0.8] lg:leading-[0.8]">{credits.title}</h1>

                      <div className="content mb-[5vw]">
                        {credits.heroText && (
                          <p className="text-base lg:text-lg w-[90%] lg:w-[90%] max-w-3xl">{credits.heroText}</p>
                        )}

                        <div className="mx-auto lg:flex">
                          <Button href="mailto:pocketpiecesstore@gmail.com?subject=Hire Enquiry" label="Enquire to hire" outline className="block lg:mx-auto" />
                        </div>
                      </div>
                    </div>


                    {/* <div className="w-full lg:w-[45%] relative z-[20]">
                      {products.length > 0 && products[0]?.node.availableForSale && (
                        <div className="w-[82%] lg:w-[90%] mx-auto rotate-[-4deg] mt-[15%]" >
                          <Link href={`/shop/${products[0].node.handle}`} className="w-full max-w-[55vh] mx-auto block lg:pr-[10%]">
                            <Polaroid
                              noShadow
                              thin
                              product
                              className="w-full"
                              hire={true}
                              collection={products[0].node.collections.edges[0].node.title}
                              metaText={products[0].node.metaTitle ? products[0].node.metaTitle.value : null}
                              metaHeading={products[0].node.title}
                              price={moneyUkLocale.format(products[0].node.variants.edges[0].node.price.amount)}
                              image={products[0].node.images.edges[0].node.originalSrc}
                              imageWidth={products[0].node.images.edges[0].node.width}
                              imageHeight={products[0].node.images.edges[0].node.height}
                              hoverImage={products[0].node.images.edges[1] ? products[0].node.images.edges[1].node.originalSrc : products[0].node.images.edges[0].node.originalSrc}
                              hoverImageWidth={products[0].node.images.edges[1] ? products[0].node.images.edges[1].node.width : products[0].node.images.edges[0].node.width}
                              hoverImageHeight={products[0].node.images.edges[1] ? products[0].node.images.edges[1].node.height : products[0].node.images.edges[0].node.height}
                            />
                          </Link>
                        </div>
                       )}
                    </div> */}
                  </div>

                  <div className="flex flex-wrap mb-[20vw] lg:mb-[15vw] xl:mb-[12.5vw] relative">
                    {/* <div className="w-full lg:w-[50%] relative z-[20] lg:mt-[-13%] 2xl:mt-[-18%]">
                      {products.length > 0 && products[1]?.node.availableForSale && (
                        <div className="w-[85%] lg:w-[75%] mx-auto rotate-[3deg]">
                          <Link href={`/shop/${products[1].node.handle}`} className="w-full max-w-[55vh] mx-auto block">
                            <Polaroid
                              noShadow
                              thin
                              product
                              className="w-full"
                              hire={true}
                              collection={products[1].node.collections.edges[0].node.title}
                              metaText={products[1].node.metaTitle ? products[1].node.metaTitle.value : null}
                              metaHeading={products[1].node.title}
                              price={moneyUkLocale.format(products[1].node.variants.edges[0].node.price.amount)}
                              image={products[1].node.images.edges[0].node.originalSrc}
                              imageWidth={products[1].node.images.edges[0].node.width}
                              imageHeight={products[1].node.images.edges[0].node.height}
                              hoverImage={products[1].node.images.edges[1] ? products[1].node.images.edges[1].node.originalSrc : products[1].node.images.edges[0].node.originalSrc}
                              hoverImageWidth={products[1].node.images.edges[1] ? products[1].node.images.edges[1].node.width : products[1].node.images.edges[0].node.width}
                              hoverImageHeight={products[1].node.images.edges[1] ? products[1].node.images.edges[1].node.height : products[1].node.images.edges[0].node.height}
                            />
                          </Link>
                        </div>
                      )}
                    </div> */}

                    {/* <div className="w-full lg:w-[50%] relative z-[20] mt-[20%] lg:mt-0">
                      {products.length > 0 && products[2]?.node.availableForSale && (
                        <div className="w-[85%] lg:w-[70%] mx-auto rotate-[-1deg]">
                          <Link href={`/shop/${products[2].node.handle}`} className="w-full max-w-[55vh] mx-auto block">
                            <Polaroid
                              noShadow
                              thin
                              product
                              className="w-full"
                              hire={true}
                              collection={products[2].node.collections.edges[0].node.title}
                              metaText={products[2].node.metaTitle ? products[2].node.metaTitle.value : null}
                              metaHeading={products[2].node.title}
                              price={moneyUkLocale.format(products[2].node.variants.edges[0].node.price.amount)}
                              image={products[2].node.images.edges[0].node.originalSrc}
                              imageWidth={products[2].node.images.edges[0].node.width}
                              imageHeight={products[2].node.images.edges[0].node.height}
                              hoverImage={products[2].node.images.edges[1] ? products[2].node.images.edges[1].node.originalSrc : products[2].node.images.edges[0].node.originalSrc}
                              hoverImageWidth={products[2].node.images.edges[1] ? products[2].node.images.edges[1].node.width : products[2].node.images.edges[0].node.width}
                              hoverImageHeight={products[2].node.images.edges[1] ? products[2].node.images.edges[1].node.height : products[2].node.images.edges[0].node.height}
                            />
                          </Link>
                        </div>
                      )}
                    </div> */}
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
                    
                    {credits.contentHeadingText && (
                      <div className="w-full relative z-[20] mb-[10vw] lg:mb-[7.5vw]">
                        <h2 className="block text-[12vw] lg:text-[9vw] text-center leading-[0.75]">{credits.contentHeadingText}</h2>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap pt-[12vw] lg:pt-[8vw] 2xl:pt-40">
                    <div className="w-full lg:w-[45%] lg:text-center">
                      <h2 className="text-[48px] lg:text-[58px] leading-none lg:leading-none mb-8 lg:mb-12">How Hiring Works</h2>
                    </div>
                    <div className="w-full lg:w-[55%] pt-6">
                      <div className="mb-16 xl:mb-20 max-w-screen-lg w-[95%] lg:w-[85%]">
                        <h3 className="font-normal text-lg leading-none block mb-6">How Do I Hire a Piece?</h3>
                        <div className="font-light content"><p>Pocket Pieces offers a Hire service for select professional opportunities. We want to help stylists, costume designers and costume houses sustainably kit out wardrobes with special pieces for TV and film productions. Our North London studio is open by appointment for pulls. Please get in touch <a href="mailto:pocketpiecesstore@gmail.com">pocketpiecesstore@gmail.com</a> if you are interested in our hire service or to book an appointment. Send details of your request along with items and styles you might be looking for.</p></div>
                      </div>
                      <div className="mb-16 xl:mb-20 max-w-screen-lg w-[95%] lg:w-[85%]">
                        <h3 className="font-normal text-lg leading-none block mb-6">How long can i hire an item for?</h3>
                        <div className="font-light content"><p>We offer a range of hire periods, depending on the piece itself, with pricing calculated to reflect the piece's retail price and time with you.</p></div>
                      </div>
                      <div className="mb-16 xl:mb-20 max-w-screen-lg w-[95%] lg:w-[85%]">
                        <h3 className="font-normal text-lg leading-none block mb-6">Who can hire via Pocket Pieces?</h3>
                        <div className="font-light content"><p>At present, we are only offering our Hire service to UK-registered professional stylists and costume designers to supply clothing and accessories for select opportunities. Sign up to our newsletter to be the first to hear when this changes.</p></div>
                      </div>
                    </div>
                  </div>
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
                          {archives.map((e, i) => {
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
                          {archives.map((e, i) => {
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
  // const products = await getAllProductsInCollection('for-hire')

  return {
    props: { ...cms }
  };
}