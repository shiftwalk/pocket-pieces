import Layout from '@/components/layout'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { NextSeo } from 'next-seo'
import LogoIcon from '@/icons/logo.svg'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import SanityPageService from '@/services/sanityPageService'
import SanityImage from '@/components/sanity-image'
import { homeQuery } from '@/helpers/queries'
import Button from '@/components/button'
import { IntroContext } from '@/context/intro'
import { useContext, useEffect } from 'react'

const pageService = new SanityPageService(homeQuery)

export default function Home(initialData) {
  const { data: { home }  } = pageService.getPreviewHook(initialData)()
  const [introContext, setIntroContext] = useContext(IntroContext);

  useEffect(() => {
    setTimeout(() => {
      setIntroContext(true)
    }, 4500);
  },[]);

  return (
    <Layout>
      <NextSeo title={home.title} />
      
      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <main className="w-full flex flex-wrap h-screen">
            <m.article variants={fade} className="w-full">
              <m.div variants={fade} className="absolute inset-0 h-screen">                
                <div href="/shop" className="block absolute inset-0 z-0">
                  <SanityImage image={home.image} layout="fill" className="w-full h-full" alt="Placeholder" />
                </div>
              
                <div className="h-full w-full lg:w-8/12 max-w-[65vh] 2xl:max-w-[720px] pt-[130px] pb-[50px] relative z-20 mx-auto px-4 lg:px-6">
                  <div className="w-full bg-white mx-auto p-4 lg:p-6 h-full flex flex-wrap">
                    <div className="w-full">
                      <div className="w-[50px] lg:w-[50px] mx-auto mb-5">
                        <LogoMarkOutlinedIcon />
                      </div>
                      
                      {home.introText && (
                        <p className="block uppercase text-[11px] lg:text-[12px] leading-[1.25] text-center w-11/12 xl:w-9/12 mx-auto mb-8">{home.introText}</p>
                      )}

                      {home.posterVideoReel?.asset && (
                        <video loop={true} autoPlay="autoplay" playsInline={true} muted className={`w-11/12 lg:w-9/12 h-auto max-h-[33dvh] mx-auto`}>
                          <source src={home.posterVideoReel.asset.url} type="video/mp4" />

                          Sorry. Your browser does not support the video tag.
                        </video>
                      )}

                      <div className="flex flex-wrap items-center justify-center space-x-4 pb-3 -mt-12 relative z-10">
                        <Button outline href="/shop" label="Let's Shop!" />
                      </div>
                    </div>
                    
                    <div className="w-full mt-auto">
                      <LogoIcon className={`w-9/12 2xl:w-11/12 mx-auto text-black mb-5`} />
                      {home.footerText && (
                        <p className="block uppercase text-[11px] lg:text-[12px] leading-[1.25] text-center w-11/12 lg:w-9/12 mx-auto mb-0 pb-0">{home.footerText}</p>
                      )}
                    </div>
                  </div>
                </div>
              </m.div>
            </m.article>
          </main>
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