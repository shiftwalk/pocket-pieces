import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import LogoIcon from '@/icons/logo.svg'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [hovering, setHovering] = useState(false)

  const useMousePosition = () => {
    const [
      mousePosition,
      setMousePosition
    ] = useState({ x: null, y: null });
  
    useEffect(() => {
      const updateMousePosition = ev => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
      };
      
      window.addEventListener('mousemove', updateMousePosition);
  
      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
      };
    }, []);
  
    return mousePosition;
  };

  const mousePosition = useMousePosition();

  return (
    <Layout>
      <NextSeo title="Home" />
      
      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <main className="mb-12 md:mb-16 xl:mb-24 pt-14 lg:pt-16">
            <Container>
              <m.article variants={fade}>
                {/* <div className="absolute inset-0 h-screen">
                  <div className="cover-image">
                    <Image src="/images/home-hero.jpg" fill className="w-full h-full" alt="Placeholder" />
                    <div className="absolute inset-0 z-10 bg-black/20"></div>
                    <div className="absolute inset-0 z-[11] flex flex-wrap items-center justify-center py-4 lg:py-6">
                      <div className="w-full mt-auto">
                        <div className="mx-auto max-w-[700px]">
                          <div className="w-9/12 lg:w-10/12 mx-auto">
                            <LogoIcon className={`w-full mb-8 text-zinc-100`} />
                          </div>

                          <div className="w-10/12 lg:w-full mx-auto">
                            <p className="text-base lg:text-xl xl:text-2xl text-zinc-100 text-center">Prestige, one-of-a-kind pieces to sustainably style out your wardrobe.</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto text-zinc-100/80 w-full text-center uppercase leading-none lg:leading-none font-credits tracking-normal">
                        <div>
                          <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Phoebe Pocket</span>
                          <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Presents A</span>
                          <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Pocket Pieces</span>
                          <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">And</span>
                          <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Enid.fm</span>
                          <span className="inline-block pl-[2px] pr-[13px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Production</span>

                          <div className="block md:inline-block">
                            <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">A Website By</span>
                            <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">ShiftWalk</span>
                            <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Branding By</span>
                            <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Gabi Fountain</span>
                            <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Strategic Direction By</span>
                            <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Enid.fm</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Curation by</span>
                          <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Phoebe Pocket</span>
                          <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Photography By</span>
                          <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Armando Nucci</span>
                          <span className="inline-block px-[2px] text-[16px] md:text-[20px] lg:text-[22px] 2xl:text-[28px]">Written And Directed by</span>
                          <span className="inline-block px-[2px] text-[22px] md:text-[30px] lg:text-[36px] 2xl:text-[42px]">Phoebe Pocket</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="absolute inset-0 h-screen">

                  {/* <div className="fixed top-0 left-0 right-0 w-full bg-red-500 h-[65px] z-[100]"></div> */}
                  
                  <div className={`fixed z-50 transition-opacity pointer-events-none rounded-[50%] backdrop-blur-[4px] ${hovering ? 'opacity-100' : 'opacity-0' }`} style={{ top: `${mousePosition.y - 25 }px`, left: `${mousePosition.x - 75 }px` }}>
                    <div className="uppercase rounded-[50%] px-5 lg:px-5 py-6 lg:py-6 text-center text-sm lg:text-base leading-none lg:leading-none text-black border border-black block w-[150px]">Let&apos;s Shop!</div>
                </div>
                  
                  <Link href="/shop" className="block absolute inset-0 z-0" onMouseEnter={()=>setHovering(true)}>
                    <div className="cover-image">
                      <Image src="/images/home-hero-light.jpg" fill className="w-full h-full" alt="Placeholder" />
                    </div>
                  </Link>
                
                  <div className="h-full w-full lg:w-8/12 max-w-[720px] pt-[130px] pb-[50px] relative z-20 mx-auto px-4 lg:px-6">
                    <div className="w-full bg-white mx-auto p-4 lg:p-6 h-full flex flex-wrap" onMouseEnter={()=>setHovering(false)}>
                      <div className="w-full">
                        <div className="w-[50px] lg:w-[50px] mx-auto mb-5">
                          <LogoMarkOutlinedIcon />
                        </div>
                        
                        <p className="block uppercase text-[11px] lg:text-[12px] leading-[1.25] text-center w-11/12 lg:w-9/12 mx-auto mb-8">one-of-a-kind, sustainably-sourced vintage pieces CURATED BY PHOEBE pocket. for all genders, sizes & occasions.</p>

                        <video loop={true} autoPlay="autoplay" playsInline={true} muted className={`w-11/12 lg:w-9/12 h-auto max-h-[33dvh] mx-auto`}>
                          <source src="/images/pp-home-reel.mp4" type="video/mp4" />

                          Sorry. Your browser does not support the video tag.
                        </video>
                      </div>
                      
                      <div className="w-full mt-auto">
                        <LogoIcon className={`w-11/12 mx-auto text-black mb-5`} />

                        <p className="block uppercase text-[11px] lg:text-[12px] leading-[1.25] text-center w-11/12 lg:w-9/12 mx-auto mb-0 pb-0">Sourced & curated by phoebe — a die-hard vintage lover who works on hollywood feature films and productions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </m.article>
            </Container>
          </main>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}
