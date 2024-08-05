import { useContext, useEffect, useState } from 'react';
import FancyLink from '@/components/fancyLink'
import Container from '@/components/container'
import Button from '@/components/button';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import Link from 'next/link'
import { useRouter } from 'next/router'
import LogoIcon from "@/icons/logo.svg";
import BagIcon from "@/icons/bag.svg";
import BinIcon from "@/icons/bin.svg";
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import { useCartContext, useUpdateCartQuantityContext } from '@/context/store'
import { CartOpenContext } from '@/context/cart'
import { getCartSubTotal } from '@/helpers/shopify'
import Image from 'next/image';

export default function Header({ dark }) {
  const router = useRouter()
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  const [cartIsOpenContext, setCartIsOpenContext] = useContext(CartOpenContext);
  const [hovering, setHovering] = useState(false);

  // Cart Stuff
  const [cart, checkoutUrl] = useCartContext()
  const updateCartQuantity = useUpdateCartQuantityContext()
  const [cartItems, setCartItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)

  const mobileMenuToggle = () => {
    mobileMenuIsOpen ? setMobileMenuIsOpen(false) : setMobileMenuIsOpen(true)
  }

  const cartToggle = () => {
    cartIsOpenContext ? setCartIsOpenContext(false) : setCartIsOpenContext(true)
  }

  function updateItem(id, quantity) {
    updateCartQuantity(id, quantity)
  }
  
  let moneyUkLocale = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "GBP",
    useGrouping: true,
  });

  useEffect(() => {
    setCartItems(cart)
    setSubtotal(getCartSubTotal(cart))
  }, [cart])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 backdrop-blur-[4px] z-[50000]`}>
        <Container>
          <nav className={`flex flex-wrap space-x-3 items-center uppercase text-sm lg:text-base xl:text-lg leading-none lg:leading-none xl:leading-none transition-colors ease-[cubic-bezier([0.83,0,0.17,1])] duration-[200ms] py-4 ${dark ? 'text-[#C1C1C1]' : 'text-black'  } border-b ${dark ? 'border-[#C1C1C1]' : 'border-black' }`}>

            <div className="ml-auto text-base block lg:hidden w-auto">
              <Link href={`${router.asPath == '/menu' ? '/' : '/menu'}`} aria-label="Navigate to the menu" className="block w-6">
                <span className="block w-full h-[2px] mb-[3px] bg-current"></span>
                <span className="block w-full h-[2px] bg-current"></span>
              </Link>
            </div>

            <div className="mr-auto space-x-3 items-center w-full hidden lg:flex lg:flex-1">
              <FancyLink onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} active={router.asPath.includes('/shop') ? true : false} nav className={`flex-1 transition-all ease-in-out duration-[400ms] hover:blur-0 ${hovering && 'blur-[2px]'}`} destination="/shop" a11yText="Navigate to the home page" label="Shop" />
              <FancyLink onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} active={router.asPath == '/hire' ? true : false} nav className={`flex-1 transition-all ease-in-out duration-[400ms] hover:blur-0 ${hovering && 'blur-[2px]'}`} destination="/hire" a11yText="Navigate to the hire page" label="Hire" />
              <FancyLink onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} active={router.asPath == '/about' ? true : false} nav className={`flex-1 transition-all ease-in-out duration-[400ms] hover:blur-0 ${hovering && 'blur-[2px]'}`} destination="/about" a11yText="Navigate to the about page" label="About" />
            </div>

            <div className="flex flex-1 lg:flex-none lg:w-32">
              <Link href="/" legacyBehavior>
                <a onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className="w-[100px] lg:w-full mx-auto relative overflow-hidden group" aria-label="Navigate to the home page" aria-current={router.asPath == '/' ? true : false}>
                  <div className="lg:group-hover:translate-y-[-103%] will-change-transform transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[330ms]">
                    <LogoIcon className="w-full"/>
                  </div>

                  <div className="w-[56px] mx-auto absolute top-0 left-0 right-0">
                    <div className="translate-y-[105%] lg:group-hover:translate-y-0 will-change-transform transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[330ms]">
                      <LogoMarkOutlinedIcon className="w-full" />
                    </div>
                  </div>
                </a>
              </Link>
            </div>

            <div className="ml-auto space-x-3 items-center w-full hidden lg:flex lg:flex-1 justify-end">
              <FancyLink onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} active={router.asPath == '/faqs' ? true : false} nav className={`flex-1 text-right justify-end transition-all ease-in-out duration-[400ms] hover:blur-0 ${hovering && 'blur-[2px]'}`} destination="/faqs" a11yText="Navigate to the faqs page" label="FAQs" />

              <FancyLink onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} active={router.asPath == '/contact' ? true : false} nav className={`flex-1 text-right justify-end transition-all ease-in-out duration-[400ms] hover:blur-0 ${hovering && 'blur-[2px]'}`} destination="/contact" a11yText="Navigate to the contact page" label="Contact" />

              <button onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className={`flex-1 flex group items-center text-right uppercase justify-end transition-all ease-in-out duration-[400ms] hover:blur-0 ${hovering && 'blur-[2px]'}`} onClick={cartToggle} aria-label={`${cartIsOpenContext ? 'Close' : 'Open'} Bag`}>
                <div className="w-[10px] lg:w-[12px] mr-2 relative">
                  <svg className={`transition-transform duration-[330ms] ease-[cubic-bezier([0.83,0,0.17,1])] group-hover:rotate-90`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12"><path stroke="currentColor" d="M12 11.5H9M0 11.5h3M0 .5h3M.5 0v3M11.5 0v3M12 .5H9M11.5 12V9M.5 12V9"/></svg>
                </div>
                Bag({cart?.length})
              </button>
            </div>

            <div className="ml-auto block lg:hidden w-auto leading-none text-[11px]">
              <button onClick={cartToggle} aria-label={`${cartIsOpenContext ? 'Close' : 'Open'} Bag`} className="block relative w-5">
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
          {cartIsOpenContext && (
            <>
              <m.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.66, ease: [0.83, 0, 0.17, 1] }}
                onClick={() => setCartIsOpenContext(false)}
                className="fixed w-full h-screen bg-black/40 z-[500] block backdrop-blur-[7.5px]"
                aria-label="Close Bag"
              >  
              </m.button>
              <m.div
                initial={{ x:'100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.66, ease: [0.83, 0, 0.17, 1] }}
                className={`fixed w-[90%] md:max-w-[45vw] lg:w-[550px] h-screen top-0 right-0 bottom-0 z-[500000] flex flex-col p-4 lg:p-6 will-change-transform ${dark ? 'bg-off-white text-off-black' : 'bg-black text-[#C1C1C1]' }`}
              >
                <div className="">
                  <span className="h2 block text-[22vw] md:text-[15vw] lg:text-[10vw] uppercase leading-[0.8] md:leading-[0.8] lg:leading-[0.8] text-center py-[3vh]">Bag</span>

                  <span className="block text-xs uppercase leading-none border-b border-current py-[10px]">{cartItems.length} Items</span>
                </div>

                <div className="flex-1 overflow-y-scroll my-4 lg:my-6">
                  {/* {JSON.stringify(cartItems)} */}
                  { cartItems.length > 0 ? (
                    <>
                      {cartItems.map((e, i) => {
                        return (
                          <div className="w-full flex flex-wrap mb-6 items-center" key={i}>
                            <Link onClick={()=> setCartIsOpenContext(false)} href={`/shop/${e.productHandle}`} className="w-1/3 group">
                              <div className="relative overflow-hidden">
                                <Image
                                  src={e.productImage.originalSrc}
                                  alt={e.productTitle}
                                  className="w-full aspect-[10/11] object-cover object-center transition-transform ease-in-out duration-[400ms] group-hover:scale-[1.1]"
                                  height={e.productImage.height}
                                  width={e.productImage.width}
                                />
                              </div>
                            </Link>
                            <div className="flex-1 pl-3 translate-y-[-8px]">
                              <Link onClick={()=> setCartIsOpenContext(false)} href={`/shop/${e.productHandle}`} className="block font-display text-4xl lg:text-5xl leading-[0.75] lg:leading-[0.75] mb-2 lg:w-[80%]">{e.productTitle}</Link>

                              {/* INTEGRATE */}
                              <span className="block text-sm opacity-80 font-light mb-1">Size 38 (UK10)</span>
                              <div className="flex space-x-3 w-full">
                                <span className="block flex-1 mr-auto">{moneyUkLocale.format(e.variantPrice)}</span>

                                <button
                                  aria-label={`Remove ${e.productTitle} from your bag`}
                                  className="block ml-auto hover:opacity-50 focus:opacity-60 transition-opacity ease-in-out duration-[400ms]"
                                  onClick={() => updateItem(e.variantId, 0)}
                                >
                                  <BinIcon className="w-4" />
                                </button>
                              </div>
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
                    <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className={`uppercase rounded-[50%] px-3 lg:px-5 py-6 lg:py-8 text-center lg:text-lg lg:leading-none group relative overflow-hidden block border ${ dark ? 'bg-black text-off-white border-black' : 'bg-off-white text-black border-off-white' }`}>
                      <div className="relative overflow-hidden">
                        <div className="transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-0 group-hover:translate-y-[100%] group-hover:delay-[0ms] delay-[160ms]">Checkout</div>
                        <div className={`transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] absolute inset-0 translate-y-[100%] group-hover:translate-y-0 z-20 group-hover:delay-[160ms] ${ dark ? 'text-black' : 'text-off-white' }`}>Checkout</div>
                      </div>
                      <div className={`absolute inset-0 z-10 ${ dark ? 'bg-off-white' : 'bg-black' } transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-[-100%] group-hover:translate-y-0`}></div>
                    </a>
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