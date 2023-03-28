import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import FancyLink from '@/components/fancyLink'

export default function Playground() {
  return (
    <Layout>
      <NextSeo title="Playground" />

      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <main className="mb-12 md:mb-16 xl:mb-24 pt-14 lg:pt-16">
            <Container>
              <m.div variants={fade}>
                <h1 className="text-[15vw] md:text-[12.5vw] lg:text-[10vw] mb-4 leading-none md:leading-none lg:leading-none">Development Playground</h1>
                <div className="content max-w-3xl mb-4">
                  <ul className="uppercase border-t border-black">
                    <li>
                      <FancyLink nav destination="/playground/polaroids" className="block border-b border-black py-3" label="Polaroids" />
                    </li>
                    <li>
                      <FancyLink nav destination="/playground/buttons" className="block border-b border-black py-3" label="Buttons" />
                    </li>
                  </ul>
                </div>
              </m.div>
            </Container>
          </main>

          <m.div variants={fade}>
            <Footer />
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}
