import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Button from '@/components/button'

export default function Buttons() {
  return (
    <Layout>
      <NextSeo title="Buttons Playground" />

      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <main className="mb-12 md:mb-16 xl:mb-24 pt-14 lg:pt-16">
            <Container>
              <m.div variants={fade}>
                <h1 className="text-[15vw] md:text-[12.5vw] lg:text-[10vw] mb-4 leading-none md:leading-none lg:leading-none">Buttons</h1>
                <div className="max-w-3xl mb-4">
                  <p className="mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                  <div>
                    <Button href="#" label="Add To Bag" />
                  </div>

                  <div>
                    <Button href="#" label="Size Guide" outline />
                  </div>
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
