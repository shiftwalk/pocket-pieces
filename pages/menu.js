import Layout from '@/components/layout'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import FancyLink from '@/components/fancyLink'
import MetaText from '@/components/meta-text'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";

export default function Info() {
  const router = useRouter()

  return (
    <Layout>
      <NextSeo title="Info" />

      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <m.div variants={fade} className="bg-black text-[#C1C1C1] h-screen">
            <main className="flex flex-wrap items-center justify-center h-full">
              <Container className="mt-auto w-full">
                <MetaText sm text="Where to?" className="opacity-75" />
                <nav className="block uppercase text-[23px] font-light">
                  <FancyLink active={router.asPath == '/' ? true : false} nav className="block border-b border-current py-1" destination="/" a11yText="Navigate to the home page" label="Home" />
                  <FancyLink active={router.asPath == '/shop' ? true : false} nav className="block border-b border-current py-1" destination="/shop" a11yText="Navigate to the shop page" label="Shop" />
                  <FancyLink active={router.asPath == '/hire' ? true : false} nav className="block border-b border-current py-1" destination="/hire" a11yText="Navigate to the hire page" label="Hire" />
                  <FancyLink active={router.asPath == '/about' ? true : false} nav className="block border-b border-current py-1" destination="/about" a11yText="Navigate to the about page" label="About" />
                  <FancyLink active={router.asPath == '/faqs' ? true : false} nav className="block border-b border-current py-1" destination="/faqs" a11yText="Navigate to the faqs page" label="FAQs" />
                  <FancyLink active={router.asPath == '/contact' ? true : false} nav className="block border-b border-current py-1" destination="/contact" a11yText="Navigate to the contact page" label="Contact" />
                </nav>
              </Container>

              <Container className="mt-auto w-full text-right py-3 flex items-end">
                <div className="w-[70px]">
                  <LogoMarkOutlinedIcon />
                </div>

                <a href="https://www.instagram.com/_pocketpieces_" target="_blank" rel="noopener noreferrer" className="inline-block text-right ml-auto uppercase" aria-label="Navigate to the Pocket Pieces Instagram page">Instagram</a>
              </Container>
            </main>
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}
