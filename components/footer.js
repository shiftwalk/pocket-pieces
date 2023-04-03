import Container from '@/components/container'
import LogoIcon from '@/icons/logo.svg'

export default function Footer({ noLogo, className }) {
  return (
    <footer className={`pb-4 pt-[33vw] lg:pt-[13vw] ${className}`}>
      <Container>
        {!noLogo && (
          <LogoIcon className={`w-full mb-5 text-current`} />
        )}

        <div className="flex flex-wrap">
          <div className="mb-2 lg:mb-0">
            <span className="block uppercase text-sm xl:text-base 2xl:text-lg leading-none xl:leading-none 2xl:leading-none">&copy; All rights reserved, Pocket Pieces Ltd ({new Date().getFullYear()})</span>
          </div>

          <div className="mb-2 lg:mb-0 block w-full lg:w-auto lg:ml-auto">
            <span className="block uppercase text-sm xl:text-base 2xl:text-lg leading-none xl:leading-none 2xl:leading-none">Instagram, Email, Contact</span>
          </div>
          
          <div className="mb-2 lg:mb-0 w-full lg:w-auto lg:ml-auto block">
            <span className="block uppercase text-sm xl:text-base 2xl:text-lg leading-none xl:leading-none 2xl:leading-none">Privacy Policy</span>
          </div>

          <div className="w-full lg:w-auto lg:ml-auto block">
          <span className="block uppercase text-sm xl:text-base 2xl:text-lg leading-none xl:leading-none 2xl:leading-none">Site By ShiftWalk</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}