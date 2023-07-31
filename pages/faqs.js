import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import AccordionItem from '@/components/accordion-item'
import slugify from "slugify"
import { useContext, useEffect, useState } from 'react'
import SanityPageService from '@/services/sanityPageService'
import { infoQuery } from '@/helpers/queries'
import SanityImage from '@/components/sanity-image'
import { InView } from 'react-intersection-observer';
import { IntroContext } from '@/context/intro'

const pageService = new SanityPageService(infoQuery)

export default function FAQs(initialData) {
  const { data: { info }  } = pageService.getPreviewHook(initialData)()
  const [currentItem, setCurrentItem] = useState(false)
  const [introContext, setIntroContext] = useContext(IntroContext);

  useEffect(() => {
    setIntroContext(true)
  },[]);

  return (
    <Layout>
      <NextSeo title={info.title} />

      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <m.div variants={fade}>
            <main className="pt-[70px] md:pt-[75px] lg:pt-[90px] lg:pb-[5vw] text-[#C1C1C1]">
              <Container >
                <div className="flex flex-wrap relative">
                  <div className="w-full lg:w-[45%]">
                    <div className="lg:sticky lg:top-[90px] lg:min-h-[calc(100dvh-100px)] lg:flex lg:flex-wrap">
                      <h1 className="text-[30vw] md:text-[22.5vw] lg:text-[20vw] mb-2 leading-none md:leading-none lg:leading-none block md:hidden">{info.title}</h1>

                      <div className="flex flex-wrap w-full">
                        <div className="w-full md:w-[70%] lg:w-[63%] pb-4 md:pb-0 md:pr-3 md:max-w-[45vh]">
                          <SanityImage image={info.heroImage} className="block w-full" alt="placeholder" />
                        </div>

                        <div className="w-full md:flex-1 flex flex-wrap">
                          <ul className="uppercase text-sm w-full">
                            {info.sections.map((e, i) => {
                              return (
                                <li key={i} className="block">
                                  <a
                                    href={`#${slugify(e.heading, { lower: true })}`}
                                    className={`block transition-opacity ease-in-out duration-300 ${currentItem == slugify(e.heading, { lower: true }) ? 'opacity-100' : 'opacity-30 hover:opacity-70' }`}>
                                      {e.heading}
                                    </a>
                                </li>
                              )
                            })}
                          </ul>

                          <h1 className="text-[25vw] md:text-[22.5vw] lg:text-[20vw] leading-[0.65] md:leading-[0.65] lg:leading-[0.65] hidden md:block lg:hidden mt-auto w-full">{info.title}</h1>
                        </div>
                      </div>

                      <h1 className="text-[25vw] md:text-[22.5vw] lg:text-[20vw] mb-4 leading-[0.6] md:leading-[0.6] lg:leading-[0.6] hidden lg:block w-full mt-auto">{info.title}</h1>
                    </div>
                  </div>

                  <div className="w-full lg:w-[53.5%] pt-[16vw] md:pt-[8vw] lg:pt-[25vw] lg:ml-auto lg:pb-[20vw]">
                    <div className="content mb-4 lg:pr-[5%]">
                      {info.sections.map((e, i) => {
                        return (
                          <InView
                            className="scroll-mt-28"
                            as="div"
                            rootMargin="60px 0px 60px 0px"
                            threshold={1}
                            id={slugify(e.heading, { lower: true })}
                            onChange={(inView, entry) => setCurrentItem(slugify(e.heading, { lower: true }))}
                            key={i}
                          >
                            <AccordionItem item={e} />
                          </InView>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Container>
            </main>
            
            <div className="text-[#C1C1C1]">
              <Footer />
            </div>
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return { 
    props: props
  };
}