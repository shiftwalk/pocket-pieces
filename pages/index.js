import Layout from '@/components/layout'
import ImageTicker from '@/components/image-ticker'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import LogoIcon from '@/icons/logo.svg'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import SanityPageService from '@/services/sanityPageService'
import SanityImage from '@/components/sanity-image'
import { homeQuery } from '@/helpers/queries'
import Button from '@/components/button'
import { IntroContext } from '@/context/intro'
import { MouseParallax } from 'react-just-parallax'
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
      
      <div className="overflow-hidden">
        <LazyMotion features={domAnimation}>
          <m.div
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <main className="w-full flex flex-wrap h-screen">
              <m.article variants={fade} className="w-full">
                <m.div variants={fade} className="absolute inset-0 h-screen">
                  
                  <MouseParallax isAbsolutelyPositioned enableOnTouchDevice={false} lerpEase={0.15} strength={0.0044} zIndex={0}>
                    <div href="/shop" className="block absolute inset-0 z-0">
                      <SanityImage image={home.image} layout="fill" className="w-full h-full scale-[1.01]" alt="Placeholder" />
                    </div>
                  </MouseParallax>

                  <div className="h-full w-full lg:w-8/12 max-w-[65vh] 2xl:max-w-[720px] pt-[100px] lg:pt-[130px] pb-6 lg:pb-[50px] relative z-20 mx-auto px-4 lg:px-6">
                    <div className="w-full bg-white mx-auto p-4 lg:p-6 h-full flex flex-wrap">
                      <div className="w-full">
                        <div className="w-[50px] lg:w-[50px] mx-auto mb-5">
                          <LogoMarkOutlinedIcon />
                        </div>
                        
                        {home.introText && (
                          <p className="block uppercase text-[10px] lg:text-[12px] leading-[1.25] text-center w-11/12 md:w-full 2xl:w-9/12 mx-auto mb-4 md:mb-6">{home.introText}</p>
                        )}
                        
                        {home.posterReelImages && (
                          <ImageTicker images={home.posterReelImages} />
                        )}

                        {/* {home.posterVideoReel?.asset && (
                          <video loop={true} autoPlay="autoplay" playsInline={true} muted className={`w-11/12 lg:w-9/12 h-auto max-h-[33dvh] mx-auto`}>
                            <source src={home.posterVideoReel.asset.url} type="video/mp4" />

                            Sorry. Your browser does not support the video tag.
                          </video>
                        )} */}

                        <div className="flex flex-wrap items-center justify-center space-x-4 pb-3 mt-3 md:mt-5 relative z-10">
                          <Button outline href="/shop" label="Let's Shop!" />
                        </div>
                      </div>
                      
                      <div className="w-full mt-auto">
                        <LogoIcon className={`w-9/12 md:w-10/12 2xl:w-11/12 mx-auto text-black mb-3 lg:mb-5`} />
                        {home.footerText && (
                          <p className="block uppercase text-[10px] lg:text-[12px] leading-[1.25] text-center w-11/12 lg:w-10/12 mx-auto mb-0 pb-0">{home.footerText}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </m.div>
              </m.article>
            </main>
          </m.div>
        </LazyMotion>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return { 
    props: props
  };
}