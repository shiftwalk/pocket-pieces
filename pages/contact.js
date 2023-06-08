import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import { contactQuery } from '@/helpers/queries'
import SanityImage from '@/components/sanity-image'
import { IntroContext } from '@/context/intro';
import { useContext, useEffect } from 'react';

const pageService = new SanityPageService(contactQuery)

export default function Contact(initialData) {
  const { data: { contact }  } = pageService.getPreviewHook(initialData)()
  const [introContext, setIntroContext] = useContext(IntroContext);

  useEffect(() => {
    setIntroContext(true)
  },[]);
  
  return (
    <Layout>
      <NextSeo title={contact.title} />

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
                    <div className="lg:sticky lg:top-[90px] lg:min-h-[calc(100dvh-113px)] lg:flex lg:flex-wrap">
                      <div className="flex flex-wrap w-full">
                        <h1 className="text-[25vw] md:text-[22.5vw] lg:text-[20vw] mb-5 leading-[0.6] md:leading-[0.6] lg:leading-[0.6] block lg:hidden w-full mt-auto">{contact.title}</h1>

                        <div className="w-full lg:w-[63%] pb-4 lg:pb-0 lg:pr-3 lg:max-w-[45vh] lg:mt-auto">
                          <SanityImage image={contact.heroImage} className="block w-full" alt="placeholder" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-[40%] lg:ml-auto">
                    <div className="mb-4 lg:pr-[5%] h-full flex flex-wrap">
                      <div className="w-full">
                        <h1 className="text-[25vw] md:text-[22.5vw] lg:text-[20vw] mb-32 leading-[0.6] md:leading-[0.6] lg:leading-[0.6] hidden lg:block w-full mt-auto">{contact.title}</h1>
                        
                        {contact.introText && (
                          <p className="font-light mb-6 lg:mb-10 max-w-[740px]">{contact.introText}</p>
                        )}

                        {contact.emails.map((e, i) => {
                          return (
                            <div className="mb-6 lg:mb-10" key={i}>
                              <p>{e.title}</p>
                              <a href={`mailto:${e.address}`} className="font-light inline-block group">
                                <div className="relative">
                                  <div className="w-full relative overflow-hidden">
                                    <span className="block transition-transform ease-in-out duration-[450ms] translate-y-0 group-hover:translate-y-[-100%] group-focus:translate-y-[-100%]">{e.address}</span>
                                    <div className="absolute inset-0 w-full transition-transform ease-in-out duration-[450ms] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0">{e.address}</div>
                                  </div>
                                  <div className="w-full mx-auto h-px bg-black group-hover:w-1 transition-all ease-in-out duration-[450ms] mt-[2px]"></div>
                                </div>
                              </a>
                            </div>
                          )
                        })}

                        <div className="mb-8 lg:mb-12">
                          <p>Social</p>
                          {contact.socials.map((e, i) => {
                            return (
                              <a key={i} href={e.url} target="_blank" rel="noreferrer noopener" className="inline-block font-light group">
                                <div className="relative">
                                  <div className="w-full relative overflow-hidden">
                                    <span className="block transition-transform ease-in-out duration-[450ms] translate-y-0 group-hover:translate-y-[-100%] group-focus:translate-y-[-100%]">{e.title}</span>
                                    <div className="absolute inset-0 w-full transition-transform ease-in-out duration-[450ms] translate-y-full group-hover:translate-y-0 group-focus:translate-y-0">{e.title}</div>
                                  </div>
                                  <div className="w-full mx-auto h-px bg-black group-hover:w-1 transition-all ease-in-out duration-[450ms] mt-[2px]"></div>
                                </div>
                              </a>
                            )
                          })}
                        </div>
                      </div>

                      <div className="w-[60px] lg:w-[75px] mt-auto">
                        <LogoMarkOutlinedIcon />
                      </div>
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

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return { 
    props: props
  };
}