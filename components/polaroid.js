import CrosshairIcon from '@/icons/crosshair.svg'
import Image from 'next/image';
import { m } from 'framer-motion';
import StarIcon from '@/icons/star.svg';
import SanityImage from './sanity-image';
import SanityImageTest from './sanity-image-test';
import { useEffect, useState } from 'react';

export default function Polaroid({ className, image, imageWidth, imageHeight, hoverImage, hoverImageWidth, hoverImageHeight, metaHeading, metaText, bigMeta, number, noShadow, product, price, collection, thin, sanity, eager, hire, hireDark, matchHeight, smallText }) {
  const [randomId, setRandomId] = useState(0)

  useEffect(() => {
    if (number) {
      setRandomId(Math.floor(Math.random() * (200 - 100 + 1)) + 100)
    }
  });

  const imageVariants = {
    initial: { scale: 1, filter: "blur(0px)" },
    hover: {
      scale: [1, 1.03, 1.08],
      filter: "blur(10px)",
      transition: { duration: 0.45, ease: [0.83, 0, 0.17, 1] }
    }
  }

  const backImageVariants = {
    initial: { scale: 1.08, filter: "blur(10px)", opacity: 0 },
    hover: {
      opacity: 1,
      scale: [1.08, 1.08, 1.06, 1],
      filter: "blur(0px)",
      transition: { duration: 0.7, delay: 0.35, ease: [0.83, 0, 0.17, 1] }
    }
  }

  const blinkVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: [0, 1, 0, 1, 0, 1],
      transition: { duration: 0.8, ease: "linear" }
    }
  }

  const frameVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.35, ease: [0.83, 0, 0.17, 1] }
    }
  }

  const hireVariants = {
    initial: { rotate: 6 },
    hover: {
      rotate: -6,
      transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] }
    }
  }

  let padding = 'p-[9%]'
  let headingSize = 'text-sm md:text-base lg:text-lg'
  
  if (thin) { 
    padding = 'p-[6.5%]'
  }

  if (collection && thin) {
    padding = 'pt-3 p-[6.5%]'
  }

  if (collection && !thin) {
    padding = 'pt-3 p-[9%]'
  }

  if (product) {
    headingSize = 'text-[10vw] md:text-[6.5vw] lg:text-[4.25vw] 2xl:text-[70px] leading-[0.85] md:leading-[0.85] lg:leading-[0.85] 2xl:leading-[0.85]'
  }

  if (product && smallText) {
    headingSize = 'text-[9vw] md:text-[4.5vw] lg:text-[3.8vw] 2xl:text-[52px] leading-[0.85] md:leading-[0.85] lg:leading-[0.85] 2xl:leading-[0.85]'
  }

  return (
    <m.div initial="initial" whileHover="hover" className={`bg-white w-auto ${padding} pb-0 relative group ${matchHeight && 'h-full'} ${className} ${!noShadow ? 'shadow-lg shadow-black/01' : ''}`}>
      {hire && (
        <m.div variants={hireVariants} className={`absolute top-[15%] right-[-15px] md:right-[-35px] lg:right-[-50px] w-[100px] md:w-[120px] lg:w-[140px] h-[100px] md:h-[120px] lg:h-[140px] rounded-full z-[30] flex items-center justify-center uppercase font-display text-[45px] md:text-[52px] lg:text-[60px] text-center leading-[0.7] md:leading-[0.7] lg:leading-[0.7] ${hireDark ? 'bg-off-white text-off-black' : 'bg-off-black text-off-white' }`}>For<br/>Hire</m.div>
      )}

      {collection && (
        <div className={`text-center ${thin ? 'pb-3' : 'pb-2' }`}>
          <span className={`block uppercase text-xs lg:text-sm`}>&quot;{collection}&quot;</span>        
        </div>
      )}
      <div className="block relative aspect-square overflow-hidden">
        <m.div
          className="w-full h-full scale-1 blur-0"
          variants={imageVariants}
        >
          {sanity ? (
            <SanityImageTest eager={eager} image={image ? image : null} width={imageWidth ? imageWidth : 720} height={imageHeight ? imageHeight : 720} className={`block w-full relative z-[10]`} alt="placeholder" />
          ) : (
            <Image src={image ? image : 'https://placedog.net/720/720'} width={imageWidth ? imageWidth : 720} height={imageHeight ? imageHeight : 720} className={`block w-full relative z-[10]`} alt="placeholder" />
          )}
        </m.div>

        {hoverImage && (
          <div className="absolute inset-0">
            <m.div className="absolute inset-y-[20%] inset-x-[10%] border-white border flex items-center justify-center z-[20] opacity-0" variants={frameVariants}>
              <div className="w-[20%] lg:w-[10%] text-white">
                <CrosshairIcon className={`w-full pointer-events-none`} />
              </div>

              <m.div className="block absolute bottom-0 left-0 text-sm uppercase text-white py-2 px-3 leading-none z-[20]" variants={blinkVariants}>
                <span className={`uppercase text-sm`}>P_P_001</span>
              </m.div>

              <m.div className="block absolute bottom-0 right-0 text-sm uppercase text-white py-2 px-3 leading-none z-[20]" variants={blinkVariants}>
                <StarIcon className={`w-10`} />
              </m.div>
            </m.div>

            <m.div variants={backImageVariants} className="absolute inset-0 object-cover object-center z-[10] opacity-0 scale-1 blur-0">
              {sanity ? (
                <SanityImageTest eager={eager} image={hoverImage ? hoverImage : null} width={hoverImageWidth ? hoverImageWidth : 720} height={hoverImageHeight ? hoverImageHeight : 720} className={`block w-full pointer-events-none`} alt="placeholder" />
              ) : (
                <Image src={hoverImage ? hoverImage : 'https://placedog.net/720/720'} width={hoverImageWidth ? hoverImageWidth : 720} height={hoverImageHeight ? hoverImageHeight : 720} className={`block w-full pointer-events-none`} alt="placeholder" />
              )}
            </m.div>
          </div>
        )}
      </div>
      
      <div className={`${metaText || metaHeading ? 'py-[7.5%]' : 'py-[15%]'} text-center`}>
        {number && (
          <span className={`block uppercase text-xs lg:text-sm`}>#{randomId}</span>
        )}
        {metaText && (
          <span className={`block uppercase ${bigMeta ? 'text-lg lg:text-xl' : 'text-xs lg:text-sm' }`}>&quot;{metaText ? metaText : 'Pocket Piece'}&quot;</span>
        )}
        { metaHeading && (
          <span className={`block ${headingSize} ${product ? 'mt-1 lg:mt-0 font-display ' : 'uppercase' }`}>{metaHeading ? metaHeading : 'Heading'}</span>
        )}

        {price && (
          <>
          {hire ? (
            <span className="block uppercase text-base lg:text-lg mt-[6px] lg:mt-[10px]">
              For Hire
            </span>
          ) : (
            <span className="block uppercase text-base lg:text-lg mt-[6px] lg:mt-[10px]">
              {price ? price : 'Sold Out'}
            </span>
          )}
          </>
        )}
      </div>
    </m.div>
  )
}