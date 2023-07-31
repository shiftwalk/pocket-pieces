import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { useContext, useEffect, useState } from 'react'
import { IntroContext } from '@/context/intro'

const pageService = new SanityPageService(privacyQuery)

export default function Privacy() {
  const [currentItem, setCurrentItem] = useState(false)
  const [introContext, setIntroContext] = useContext(IntroContext);

  useEffect(() => {
    setIntroContext(true)
  },[]);

  return (
    <Layout>
      <NextSeo title={"Privacy Policy"} />

      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <m.div variants={fade}>
            <main className="pt-[70px] md:pt-[75px] lg:pt-[90px] lg:pb-[5vw]">
              <Container >
                <div className="flex flex-wrap relative">
                  <div className="w-full lg:w-[45%]">
                    <div className="lg:sticky lg:top-[90px] lg:min-h-[calc(100dvh-100px)] lg:flex lg:flex-wrap">
                      <h1 className="text-[30vw] md:text-[22.5vw] lg:text-[20vw] mb-2 leading-none md:leading-none lg:leading-none block md:hidden">Privacy Policy</h1>

                      <div className="flex flex-wrap w-full">
                        <div className="w-full md:w-[70%] lg:w-[63%] pb-4 md:pb-0 md:pr-3 md:max-w-[45vh]">
                          {/* IMAGE */}
                        </div>

                        <div className="w-full md:flex-1 flex flex-wrap">
                          <h1 className="text-[25vw] md:text-[22.5vw] lg:text-[20vw] leading-[0.65] md:leading-[0.65] lg:leading-[0.65] hidden md:block lg:hidden mt-auto w-full">Privacy Policy</h1>
                        </div>
                      </div>

                      <h1 className="text-[25vw] md:text-[22.5vw] lg:text-[20vw] mb-4 leading-[0.6] md:leading-[0.6] lg:leading-[0.6] hidden lg:block w-full mt-auto">Privacy Policy</h1>
                    </div>
                  </div>

                  <div className="w-full lg:w-[53.5%] pt-[16vw] md:pt-[8vw] lg:pt-[25vw] lg:ml-auto lg:pb-[20vw]">
                    <div className="content mb-4 lg:pr-[5%]">
                      Content..
                    </div>
                  </div>
                </div>
              </Container>
            </main>

            <Footer />
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}