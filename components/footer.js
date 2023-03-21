import Container from '@/components/container'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="pb-4 mt-[50vw]">
      <Container>
        <Image
          priority
          src="/icons/logo.svg"
          height={224}
          width={908}
          alt="Pocket Pieces Logo"
          className="w-full mb-5"
        />

        <div className="flex flex-wrap">
          <div className="mb-2">
            <span className="block uppercase text-sm lg:text-base xl:text-lg leading-none lg:leading-none xl:leading-none">&copy; All rights reserved, Pocket Pieces Ltd ({new Date().getFullYear()})</span>
          </div>

          <div className="mb-2 block w-full lg:w-auto lg:ml-auto">
            <span className="block uppercase text-sm lg:text-base xl:text-lg leading-none lg:leading-none xl:leading-none">Instagram, Email</span>
          </div>
          
          <div className="block w-full lg:w-auto lg:ml-auto">
            <span className="block uppercase text-sm lg:text-base xl:text-lg leading-none lg:leading-none xl:leading-none">Privacy Policy</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}