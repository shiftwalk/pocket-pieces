import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

export default function Contact() {

  return (
    <Layout>
      <NextSeo title="Privacy" />

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
                        <h1 className="text-[25vw] md:text-[22.5vw] lg:text-[20vw] mb-5 leading-[0.6] md:leading-[0.6] lg:leading-[0.6] block lg:hidden w-full mt-auto">Contact</h1>

                        <div className="w-full lg:w-[63%] pb-4 lg:pb-0 lg:pr-3 lg:max-w-[45vh] lg:mt-auto">
                          <Image src="/images/strip-01.jpg" width={1106} height={1480} className="block w-full" alt="placeholder" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-[40%] lg:ml-auto lg:pb-[15vw]">
                    <div className="mb-4 lg:pr-[5%]">
                      <h1 className="text-[25vw] md:text-[22.5vw] lg:text-[20vw] mb-32 leading-[0.6] md:leading-[0.6] lg:leading-[0.6] hidden lg:block w-full mt-auto">Contact</h1>

                      <p className="font-light mb-6 lg:mb-10 max-w-[740px]">If you&apos;re a costume designer, wardrobe assistant or simply looking for something specific, drop Phoebe a line to discuss her personal sourcing service and visit the SHOWROOM featuring pieces not available online.</p>

                      <div className="mb-6 lg:mb-10">
                        <p>General Enquiries</p>
                        <a href="mailto:hello@pocketpieces.com" className="underline font-light">hello@pocketpieces.com</a>
                      </div>
                      
                      <div className="mb-6 lg:mb-10">
                        <p>Hiring Enquiries</p>
                        <a href="mailto:hiring@pocketpieces.com" className="underline font-light">hiring@pocketpieces.com</a>
                      </div>

                      <div className="mb-8 lg:mb-12">
                        <p>Social</p>
                        <a href="https://www.instagram.com/_pocketpieces_" target="_blank" rel="noreferrer noopener" className="underline font-light">Instagram</a>
                      </div>

                      <div className="w-[60px] lg:w-[75px]">
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
