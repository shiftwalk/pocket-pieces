import Layout from '@/components/layout'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import LogoIcon from '@/icons/logo.svg'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import Button from '@/components/button'
import { MouseParallax } from 'react-just-parallax'
import Image from 'next/image'

export default function Home() {
  return (
    <Layout>
      <NextSeo title="Pocket Pieces" />
      
      <div className="overflow-hidden">
        <LazyMotion features={domAnimation}>
          <m.div
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <main className="w-full flex flex-wrap h-screen">
              <m.article variants={fade} className="w-full h-full">
                <m.div variants={fade} className="h-full w-full flex flex-col lg:flex-wrap">  
                  <div className="w-full lg:w-[45%] relative overflow-hidden h-[65vh] lg:h-full">
                    <MouseParallax isAbsolutelyPositioned enableOnTouchDevice={false} lerpEase={0.25} strength={0.0144} zIndex={0}>
                      <div className="block absolute inset-0 z-0 ">
                        <Image src="/images/landing-new.jpg" fill className="w-full h-full scale-[1.03] object-center object-cover" alt="Placeholder" />
                      </div>
                    </MouseParallax>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-30"></div>

                    <div className="absolute bottom-0 left-0 right-0 w-full">
                      <span className="block font-mono text-[10px] lg:text-xs uppercase text-off-white w-10/12 lg:w-8/12 mx-auto mb-2 text-center leading-[1.1] lg:leading-[1.1]">One-of-a-kind, sustainably-sourced, vintage pieces, curated by us for your scene-stealing looks. For all genders, sizes and occasions.</span>

                      <LogoIcon className={`w-full p-5 text-white`} />
                    </div>
                  </div>

                  <div className="h-full lg:h-full w-full lg:w-[55%] p-4 lg:p-6 flex flex-col">
                    <div className="w-[60px] lg:w-[65px] mx-auto mb-auto">
                      <LogoMarkOutlinedIcon />
                    </div>
                    
                    <div className="w-full mb-auto">
                      <h1 className="block text-[16vw] lg:text-[5.8vw] leading-[0.75] text-center mb-8">Our online store hits screens very soon. Sign up to get notified of our opening drop.</h1>

                      <form className="w-full lg:w-10/12 mx-auto block relative">
                        <input type="email" placeholder="Email Address" className="border-b border-black w-full appearance-none uppercase text-black placeholder:text-black font-mono text-sm py-2 focus:outline-none focus:border-opacity-50" />

                        <button type="submit" className="absolute bottom-0 right-0 w-6 py-3">
                          <svg className="w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 10"><path fill="#242B2D" d="M27.94 5.46c-1.894.906-3.654 2.346-5.28 4.32h-1.4c.4-.854.8-1.6 1.2-2.24.373-.64.746-1.174 1.12-1.6H.26V4.26h23.32c-.374-.454-.747-1-1.12-1.64-.4-.64-.8-1.374-1.2-2.2h1.4c1.626 1.946 3.386 3.386 5.28 4.32v.72Z"/></svg>
                        </button>
                      </form>
                    </div>

                    <span className="bg-black rounded-full w-full flex flex-wrap justify-center lg:justify-start text-off-white text-xs py-[13px] px-4 lg:px-5">
                      <span className="block text-center mb-3 lg:mb-0">This site uses cookies to improve your visiting experience</span>
                      <span className="flex space-x-3 ml-auto justify-center w-full lg:w-auto">
                        <span className="block">Read More</span>
                        <span className="block">Okay</span>
                      </span>
                    </span>
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
