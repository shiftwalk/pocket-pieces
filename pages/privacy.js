import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AccordionItem from '@/components/accordion-item'
import slugify from "slugify"
import { useState } from 'react'

export default function Privacy() {
  const router = useRouter()
  const [currentItem, setCurrentItem] = useState(false)

  const items = [
    {
      heading: 'Terms & Conditions',
      subItems: [
        {
          heading: '1A. Policy #',
          content: 'POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films. POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films.',
        },{
          heading: '1B. Policy #',
          content: 'POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films.'
        },{
          heading: '1C. Policy #',
          content: 'POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films.'
        }
      ]
    },{
      heading: 'Cookies',
      subItems: [
        {
          heading: 'How much does delivery cost?',
          content: 'POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films. POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films.',
        },{
          heading: 'Do you ship internationally?',
          content: 'POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films.'
        },{
          heading: 'How long will it take to receive my items?',
          content: 'POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films.'
        }
      ]
    },{
      heading: 'Data Retention',
      subItems: [
        {
          heading: 'What do i do if i need to return an item?',
          content: 'POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films. POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films.',
        }
      ]
    },{
      heading: 'Legal',
      subItems: [
        {
          heading: 'How are the items sourced?',
          content: 'POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films. POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films.',
        },{
          heading: 'How sustainable is the Pocket Pieces model?',
          content: 'POCKET PIECES brings you prestige, one-of-a-kind pieces to sustainably kit out your wardrobe. All pieces are sourced from around the globe by Phoebe Pocket - a die- hard vintage lover who works on Hollywood feature films.'
        }
      ]
    }
  ]

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
                    <div className="lg:sticky lg:top-[90px] lg:min-h-[calc(100dvh-100px)] lg:flex lg:flex-wrap">
                      <h1 className="text-[30vw] md:text-[22.5vw] lg:text-[20vw] mb-2 leading-none md:leading-none lg:leading-none block md:hidden">Privacy</h1>

                      <div className="flex flex-wrap w-full">
                        <div className="w-full md:w-[70%] lg:w-[63%] pb-4 md:pb-0 md:pr-3 md:max-w-[45vh]">
                          <Image src="/images/strip-01.jpg" width={1106} height={1480} className="block w-full" alt="placeholder" />
                        </div>

                        <div className="w-full md:flex-1 flex flex-wrap">
                          <ul className="uppercase text-sm w-full">
                            {items.map((e, i) => {
                              return (
                                <li key={i} className="block">
                                  <a
                                    href={`#${slugify(e.heading, { lower: true })}`}
                                    className={`block ${i == 0 ? 'opacity-100' : 'opacity-30' }`}>
                                      {e.heading}
                                    </a>
                                </li>
                              )
                            })}
                          </ul>

                          <h1 className="text-[25vw] md:text-[22.5vw] lg:text-[20vw] leading-[0.65] md:leading-[0.65] lg:leading-[0.65] hidden md:block lg:hidden mt-auto w-full">Privacy</h1>
                        </div>
                      </div>

                      <h1 className="text-[25vw] md:text-[22.5vw] lg:text-[20vw] mb-4 leading-[0.6] md:leading-[0.6] lg:leading-[0.6] hidden lg:block w-full mt-auto">Privacy</h1>
                    </div>
                  </div>

                  <div className="w-full lg:w-[53.5%] pt-[16vw] md:pt-[8vw] lg:pt-[25vw] lg:ml-auto lg:pb-[20vw]">
                    <div className="content mb-4 lg:pr-[5%]">
                      {items.map((e, i) => {
                        return (
                          <AccordionItem item={e} key={i} />
                        )
                      })}
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
