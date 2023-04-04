import { useEffect, useState } from 'react';
import FancyLink from '@/components/fancyLink'
import Container from '@/components/container'
import Button from '@/components/button';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import Link from 'next/link'
import { useRouter } from 'next/router'
import LogoIcon from "@/icons/logo.svg";
import BagIcon from "@/icons/bag.svg";
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import { useCartContext, useUpdateCartQuantityContext } from '@/context/store'
import { getCartSubTotal } from '@/helpers/shopify'
import Image from 'next/image';

export default function Header({ dark }) {
  const router = useRouter()
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  const [cartIsOpen, setCartIsOpen] = useState(false)

  // Cart Stuff
  const [cart, checkoutUrl] = useCartContext()
  const updateCartQuantity = useUpdateCartQuantityContext()
  const [cartItems, setCartItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)

  const mobileMenuToggle = () => {
    mobileMenuIsOpen ? setMobileMenuIsOpen(false) : setMobileMenuIsOpen(true)
  }

  const cartToggle = () => {
    cartIsOpen ? setCartIsOpen(false) : setCartIsOpen(true)
  }

  function updateItem(id, quantity) {
    updateCartQuantity(id, quantity)
  }

  useEffect(() => {
    setCartItems(cart)
    setSubtotal(getCartSubTotal(cart))
  }, [cart])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 backdrop-blur-[4px] z-[500]`}>
        <Container>
          <nav className={`flex flex-wrap space-x-3 items-center uppercase text-sm lg:text-base xl:text-lg leading-none lg:leading-none xl:leading-none transition-all ease-[cubic-bezier([0.83,0,0.17,1])] duration-[330ms] py-4 ${dark && 'text-[#C1C1C1]' } border-b ${dark ? 'border-[#C1C1C1]' : 'border-black' }`}>

            <div className="ml-auto text-base block lg:hidden w-auto">
              <Link href="/menu" aria-label="Navigate to the menu" className="block w-6">
                <span className="block w-full h-[2px] mb-[3px] bg-current"></span>
                <span className="block w-full h-[2px] bg-current"></span>
              </Link>
            </div>

            <div className="mr-auto space-x-3 items-center w-full hidden lg:flex lg:flex-1">
              <FancyLink active={router.asPath.includes('/shop') ? true : false} nav className="flex-1" destination="/shop" a11yText="Navigate to the home page" label="RE:Shop" />
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
              <FancyLink active={router.asPath == '/info' ? true : false} nav className="flex-1 text-right justify-end" destination="/info" a11yText="Navigate to the info page" label="Info" />

              <FancyLink active={router.asPath == '/contact' ? true : false} nav className="flex-1 text-right justify-end" destination="/contact" a11yText="Navigate to the contact page" label="Contact" />

              <button className="flex-1 text-right justify-end" onClick={cartToggle} aria-label={`${cartIsOpen ? 'Close' : 'Open'} Bag`}>Bag ({cart?.length})</button>
            </div>

            <div className="ml-auto block lg:hidden w-auto leading-none text-[11px]">
              <button onClick={cartToggle} aria-label={`${cartIsOpen ? 'Close' : 'Open'} Bag`} className="block relative w-5">
                <span className={`absolute inset-0 flex items-center justify-center text-center ${!dark ? 'text-[#C1C1C1]' : 'text-off-black' }`}>
                  <span className="block translate-y-[4px]">{cart?.length}</span>
                </span>
                <BagIcon className="w-full block" />
              </button>
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
                className="fixed w-full h-[100dvh] bg-black/60 z-[400] block"
                aria-label="Close Bag"
              >  
              </m.button>
              <m.div
                initial={{ x:'100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.66, ease: [0.83, 0, 0.17, 1] }}
                className={`fixed w-[90%] md:max-w-[45vw] lg:w-[550px] h-[100dvh] top-0 right-0 bottom-0 z-[500] flex flex-col p-4 lg:p-6 will-change-transform ${dark ? 'bg-off-white text-off-black' : 'bg-black text-[#C1C1C1]' }`}
              >
                <div className="">
                  <span className="h2 block text-[22vw] md:text-[15vw] lg:text-[10vw] uppercase leading-[0.8] md:leading-[0.8] lg:leading-[0.8] text-center py-[3vh]">Bag</span>

                  <span className="block text-xs uppercase leading-none border-b border-current py-[10px]">{cartItems.length} Items &bull; Free Delivery</span>
                </div>

                <div className="flex-1 overflow-y-scroll my-4 lg:my-6">
                  {/* {JSON.stringify(cartItems)} */}
                  { cartItems.length > 0 ? (
                    <>
                      {cartItems.map((e, i) => {
                        return (
                          <div className="w-full flex flex-wrap mb-6" key={i}>
                            <div className="w-1/3">
                              <Image
                                src={e.productImage.originalSrc}
                                alt={e.productTitle}
                                className="w-full aspect-square object-cover object-center"
                                height={e.productImage.height}
                                width={e.productImage.width}
                              />
                            </div>
                            <div className="flex-1 pl-3">
                              <span className="block font-display text-5xl lg:text-6xl leading-[0.75] lg:leading-[0.75] mb-2">{e.productTitle}</span>
                              {/* INTEGRATE */}
                              <span className="block text-sm opacity-80 font-light mb-1">Size 38 (UK10)</span>
                              <span className="block mb-5">&pound;{e.variantPrice}</span>

                              <button
                                aria-label={`Remove ${e.productTitle} from your bag`}
                                className="underline text-sm"
                                onClick={() => updateItem(e.variantId, 0)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    <span className="block text-sm lg:text-base">Your bag is empty...</span>
                  )}
                </div>

                <div className="">
                  <span className="text-base lg:text-lg uppercase leading-none lg:leading-none border-t border-b border-current py-3 flex mb-[3vh]"><span className="block">Total</span><span className="ml-auto">{ subtotal === 0 ? <>&pound;0</> : <>&pound;{subtotal}</>}</span></span>
                  
                  <div className="w-[55%] max-w-[180px] mx-auto">
                    <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="uppercase rounded-[50%] px-3 lg:px-5 py-6 lg:py-8 text-center lg:text-lg lg:leading-none bg-off-white text-black block">Checkout</a>
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