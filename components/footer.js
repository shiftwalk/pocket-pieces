import Container from '@/components/container'
import LogoIcon from '@/icons/logo.svg'
import LogoMarkOutlinedIcon from "@/icons/logomark-outlined.svg";
import FancyLink from '@/components/fancyLink'
import { useState } from 'react';
import Link from 'next/link';

export default function Footer({ noLogo, className }) {
  const [hovering, setHovering] = useState(false);
  return (
    <footer className={`pb-3 lg:pb-4 pt-[33vw] lg:pt-[13vw] ${className} relative z-10`}>
      <Container>
        <div className="w-[60px] mx-auto mb-6 lg:hidden">
          <LogoMarkOutlinedIcon />
        </div>

        <div className="lg:ml-auto block lg:hidden mb-8 text-center mx-auto w-10/12 uppercase text-[14px] leading-[1.4]">
          <FancyLink destination="/" a11yText="Navigate to the home page" className="inline" label="Home, " />
          <FancyLink destination="/shop" a11yText="Navigate to the shop page" className="inline" label="Shop, " />
          <FancyLink destination="/hire" a11yText="Navigate to the hire page" className="inline" label="Hire, " />
          <FancyLink destination="/about" a11yText="Navigate to the about page" className="inline" label="About, " />
          <FancyLink destination="/faqs" a11yText="Navigate to the faqs page" className="inline" label="FAQs, " />
          <FancyLink destination="/contact" a11yText="Navigate to the contact page" className="inline" label="Contact, " />
          <FancyLink destination="/privacy" a11yText="Navigate to the privacy page" className="inline" label="Privacy, " />
          <a href="https://www.instagram.com/_pocketpieces_" target="_blank" rel="noreferrer noopener" className="inline">Instagram</a>  
        </div>

        <LogoIcon className={`w-full mb-4 lg:mb-5 text-current ${noLogo ? 'block lg:hidden' : '' }`} />

        <div className="flex flex-wrap">
          <div className="mb-0 lg:mb-0 flex lg:block w-full lg:w-auto">
            <span className={`block uppercase text-xs lg:text-sm xl:text-base 2xl:text-lg leading-none lg:leading-none xl:leading-none 2xl:leading-none transition-all ease-in-out duration-[450ms] ${hovering && ('blur-[2px]')}`}>&copy; <span className="hidden lg:inline">All rights reserved, </span>Pocket Pieces Ltd ({new Date().getFullYear()})</span>

            <a href="https://shiftwalk.studio" target="_blank" rel="noreferrer noopener" className="block lg:hidden ml-auto lg:ml-0 text-right lg:text-left uppercase text-xs lg:text-sm xl:text-base 2xl:text-lg leading-none lg:leading-none xl:leading-none 2xl:leading-none">Site By ShiftWalk</a>
          </div>

          <div className="lg:mb-0 w-full lg:w-auto lg:ml-auto hidden lg:flex space-x-1">
            <a onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} href="https://www.instagram.com/_pocketpieces_" target="_blank" rel="noreferrer noopener" className={`uppercase text-sm xl:text-base 2xl:text-lg leading-none xl:leading-none 2xl:leading-none hover:blur-[0px] transition-all ease-in-out duration-[450ms] ${hovering && ('blur-[2px]')}`}>Instagram, </a>

            <a onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} href="mailto:hello@pocketpieces.com" target="_blank" rel="noreferrer noopener" className={`uppercase text-sm xl:text-base 2xl:text-lg leading-none xl:leading-none 2xl:leading-none hover:blur-[0px] transition-all ease-in-out duration-[450ms] ${hovering && ('blur-[2px]')}`}>Email</a>
          </div>
          
          <div className="lg:mb-0 w-full lg:w-auto lg:ml-auto hidden lg:block">
            <Link href="/privacy" className={`block uppercase text-sm xl:text-base 2xl:text-lg leading-none xl:leading-none 2xl:leading-none hover:blur-[0px] transition-all ease-in-out duration-[450ms] ${hovering && ('blur-[2px]')}`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>Privacy Policy</Link>
          </div>

          <div className="w-full lg:w-auto lg:ml-auto hidden lg:block">
            <a onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} href="https://shiftwalk.studio" target="_blank" rel="noreferrer noopener" className={`block uppercase text-sm xl:text-base 2xl:text-lg leading-none xl:leading-none 2xl:leading-none hover:blur-[0px] transition-all ease-in-out duration-[450ms] ${hovering && ('blur-[2px]')}`}>Site By ShiftWalk</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}