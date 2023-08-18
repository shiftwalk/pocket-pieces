import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import SEO from '@/helpers/seo.config';
import { IBMPlexMono, GrifinitoL, FTCalhern } from '@/helpers/fonts';
import CookieConsent, { Cookies, getCookieConsentValue } from 'react-cookie-consent'
import { useState } from 'react';
import Link from 'next/link';

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const showCookieBar = useState(true)

  return (
      <div id="app">
        <DefaultSeo {...SEO} /> 
        <div className="grainn"></div>

        <div className={`${IBMPlexMono.variable} ${GrifinitoL.variable} ${FTCalhern.variable} font-mono`}>
          {showCookieBar && (
            <CookieConsent
              disableStyles
              buttonWrapperClasses="absolute left-0 bottom-0 lg:left-auto lg:bottom-auto lg:top-0 lg:right-0 flex items-center space-x-3 pr-6 pl-6 lg:pl-0 pb-[20px] lg:pb-0 lg:pt-[14px] text-xs"
              buttonClasses="underline"
              declineButtonClasses="underline"
              containerClasses="bg-black text-white fixed bottom-0 left-0 lg:left-auto lg:right-0 bottom-auto h-[auto] lg:h-[45px] lg:rounded-full w-full lg:w-[51%] xl:w-[52%] z-[999] flex lg:items-center px-6 pt-[20px] pb-[55px] lg:pb-[1px] text-xs lg:pt-0 lg:mr-[25px] lg:mb-[25px] leading-snug"
              buttonText="Accept"
              declineButtonText="Decline"
              enableDeclineButton
              onDecline={() => { Cookies.remove("tagManagerCookieName") }}
            >
              This site uses cookies to improve your visiting experience, <Link href="/privacy" className="inline-block underline">More Info</Link>
            </CookieConsent>
          )}
          <AnimatePresence mode="wait" initial={false}>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </div>
      </div>
  )
}