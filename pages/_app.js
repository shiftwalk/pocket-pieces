import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import SEO from '@/helpers/seo.config';
import { IBMPlexMono, GrifinitoL } from '@/helpers/fonts';
import FancyLink from '@/components/fancyLink';
import Header from '@/components/header';

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <DefaultSeo {...SEO} /> 

      <div className={`grain fixed inset-0 z-[1000] pointer-events-none transition-opacity ease-[cubic-bezier([0.83,0,0.17,1])] duration-[330ms] mix-blend-multiply`}></div>

      <div className={`${IBMPlexMono.variable} ${GrifinitoL.variable} font-mono`}>
        <Header dark={router.asPath == '/info' ? true : false} />

        <FancyLink nav active={ router.asPath.includes('/playground') ? true : false } destination="/playground" className="fixed z-[100] bottom-0 right-0 block bg-black text-white uppercase p-3 m-3 text-sm" label="Dev Playground" />

        <AnimatePresence mode="wait" initial={true}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </div>
    </>
  )
}