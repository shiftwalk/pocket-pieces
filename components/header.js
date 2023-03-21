import FancyLink from '@/components/fancyLink'
import Container from '@/components/container'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()

  return (
    <header className="py-4 mb-4 md:mb-6 xl:mb-8 border-b border-black">
      <Container>
        <nav className="flex flex-wrap space-x-3 items-center uppercase text-sm lg:text-base xl:text-lg leading-none lg:leading-none xl:leading-none">
          <div className="mr-auto space-x-3 items-center w-full hidden lg:flex lg:flex-1">
            <FancyLink active={router.asPath == '/shop' ? true : false} nav className="flex-1" destination="/shop" a11yText="Navigate to the home page" label="RE:Shop" />
            <FancyLink active={router.asPath == '/about' ? true : false} nav className="flex-1" destination="/about" a11yText="Navigate to the about page" label="About" />
            <FancyLink active={router.asPath == '/credits' ? true : false} nav className="flex-1" destination="/credits" a11yText="Navigate to the credits page" label="Credits" />
          </div>

          <div className="flex flex-1 lg:flex-none lg:w-32">
            <Link href="/" className="w-24 lg:w-full mx-auto hover:opacity-50 focus-visible:opacity-50">
              <Image
                priority
                src="/icons/logo.svg"
                height={224}
                width={908}
                alt="Pocket Pieces Logo"
                className="w-full"
              />
            </Link>
          </div>

          <div className="ml-auto space-x-3 items-center w-full hidden lg:flex lg:flex-1 justify-end">
            <FancyLink active={router.asPath == '/contact' ? true : false} nav className="flex-1 text-right justify-end" destination="/contact" a11yText="Navigate to the contact page" label="Contact" />

            <FancyLink active={router.asPath == '/info' ? true : false} nav className="flex-1 text-right justify-end" destination="/info" a11yText="Navigate to the info page" label="Info" />

            <FancyLink className="flex-1 text-right justify-end" destination="/" a11yText="Navigate to the bag" label="Bag (2)" />
          </div>

          <div className="ml-auto text-base block lg:hidden w-auto">
            <FancyLink destination="/" a11yText="Navigate to the menu" label="Menu" />
          </div>
        </nav>
      </Container>
    </header>
  )
}