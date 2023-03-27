import { useState } from 'react';
import FancyLink from '@/components/fancyLink'
import Container from '@/components/container'
import Button from '@/components/button';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import Link from 'next/link'
import { useRouter } from 'next/router'
import LogoIcon from "@/icons/logo.svg";
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";

export default function Header({ dark }) {
  const router = useRouter()
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  const [cartIsOpen, setCartIsOpen] = useState(false)

  const mobileMenuToggle = () => {
    mobileMenuIsOpen ? setMobileMenuIsOpen(false) : setMobileMenuIsOpen(true)
  }

  const cartToggle = () => {
    cartIsOpen ? setCartIsOpen(false) : setCartIsOpen(true)
  }

  return (
    <>
      <header className={`py-4 border-b transition-all ease-[cubic-bezier([0.83,0,0.17,1])] duration-[330ms] ${dark ? 'border-off-white' : 'border-black' } fixed top-0 left-0 right-0 backdrop-blur-[4px] z-[50] bg-opacity-20`}>
        <Container>
          <nav className={`flex flex-wrap space-x-3 items-center uppercase text-sm lg:text-base xl:text-lg leading-none lg:leading-none xl:leading-none transition-colors ease-[cubic-bezier([0.83,0,0.17,1])] duration-[330ms] ${dark && 'text-off-white' }`}>

            <div className="ml-auto text-base block lg:hidden w-auto">
              <FancyLink destination="/" a11yText="Navigate to the menu" label="Menu" />
            </div>

            <div className="mr-auto space-x-3 items-center w-full hidden lg:flex lg:flex-1">
              <FancyLink active={router.asPath == '/shop' ? true : false} nav className="flex-1" destination="/shop" a11yText="Navigate to the home page" label="RE:Shop" />
              <FancyLink active={router.asPath == '/about' ? true : false} nav className="flex-1" destination="/about" a11yText="Navigate to the about page" label="About" />
              <FancyLink active={router.asPath == '/credits' ? true : false} nav className="flex-1" destination="/credits" a11yText="Navigate to the credits page" label="Credits" />
            </div>

            <div className="flex flex-1 lg:flex-none lg:w-32">
              <Link href="/" legacyBehavior>
                <a className="w-24 lg:w-full mx-auto relative overflow-hidden group" aria-label="Navigate to the home page" aria-current={router.asPath == '/' ? true : false}>
                  <div className="lg:group-hover:translate-y-[-103%] will-change-transform transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[330ms]">
                    <LogoIcon className="w-full"/>
                  </div>

                  <div className="w-[58px] mx-auto absolute top-0 left-0 right-0">
                    <div className="translate-y-[105%] lg:group-hover:translate-y-0 will-change-transform transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[330ms]">
                      <LogoMarkOutlinedIcon className="w-full" />
                    </div>
                  </div>
                </a>
              </Link>
            </div>

            <div className="ml-auto space-x-3 items-center w-full hidden lg:flex lg:flex-1 justify-end">
              <FancyLink active={router.asPath == '/contact' ? true : false} nav className="flex-1 text-right justify-end" destination="/contact" a11yText="Navigate to the contact page" label="Contact" />

              <FancyLink active={router.asPath == '/info' ? true : false} nav className="flex-1 text-right justify-end" destination="/info" a11yText="Navigate to the info page" label="Info" />

              <button className="flex-1 text-right justify-end" onClick={cartToggle} aria-label={`${cartIsOpen ? 'Close' : 'Open'} Bag`}>Bag (0)</button>
            </div>

            <div className="ml-auto text-base block lg:hidden w-auto">
              <button onClick={cartToggle} aria-label={`${cartIsOpen ? 'Close' : 'Open'} Bag`}>Bag (0)</button>
            </div>
          </nav>
        </Container>
      </header>

      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {cartIsOpen && (
            <>
              <m.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.66, ease: [0.83, 0, 0.17, 1] }}
                onClick={() => setCartIsOpen(false)}
                className="fixed w-full h-screen bg-black/60 z-[51] block"
                aria-label="Close Bag"
              >  
              </m.button>
              <m.div
                initial={{ x:'100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.66, ease: [0.83, 0, 0.17, 1] }}
                className={`fixed w-[90%] md:max-w-[45vw] lg:w-[550px] h-screen top-0 right-0 bottom-0 z-[1000] flex flex-col p-4 lg:p-6 will-change-transform ${dark ? 'bg-off-white text-black' : 'bg-black text-white' }`}
              >
                <div className="">
                  <span className="h2 block text-[22vw] md:text-[15vw] lg:text-[10vw] uppercase leading-[0.8] md:leading-[0.8] lg:leading-[0.8] text-center py-[3vh]">Bag</span>

                  <span className="block text-xs uppercase leading-none border-b border-current py-[10px]">0 Items &bull; Free Delivery</span>
                </div>

                <div className="flex-1 overflow-y-scroll my-4 lg:my-6">
                  <span className="block text-sm lg:text-base">Your bag is empty...</span>
                </div>

                <div className="">
                  <span className="text-base lg:text-lg uppercase leading-none lg:leading-none border-t border-b border-current py-3 flex mb-[3vh]"><span className="block">Total</span><span className="ml-auto">$0</span></span>
                  
                  <div className="w-[55%] max-w-[180px] mx-auto">
                    <Button href="#" label="Checkout" white={!dark} block />
                  </div>
                </div>
              </m.div>
            </>
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  )
}