import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import SEO from '@/helpers/seo.config';
import { IBMPlexMono, GrifinitoL } from '@/helpers/fonts';
import Header from '@/components/header';
import FancyLink from '@/components/fancyLink';

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <DefaultSeo {...SEO} /> 

      <Header />

      <FancyLink nav active={ router.asPath.includes('/playground') ? true : false } destination="/playground" className="fixed z-[100] bottom-0 right-0 block bg-black text-white uppercase p-3 m-3 text-sm" label="Dev Playground" />

      <div className={`${IBMPlexMono.variable} ${GrifinitoL.variable} font-mono`}>
        <AnimatePresence mode="wait" initial={true}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </div>
    </>
  )
}