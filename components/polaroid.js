import CrosshairIcon from '@/icons/crosshair.svg'
import Image from 'next/image';
import { useState } from 'react';

export default function Polaroid({ className, image, imageWidth, imageHeight, hoverImage, hoverImageWidth, hoverImageHeight, metaHeading, metaText, noShadow, product, price }) {
  const [shouldTransition, setShouldTransition] = useState(false);
  function handleHover() {
    setShouldTransition(true);
  }

  function handleHoverOut() {
    setShouldTransition(false);
  }

  return (
    <div className={`bg-white w-auto p-[9%] pb-0 relative group camera-focus-hover ${className} ${!noShadow ? 'shadow-lg shadow-black/01' : ''}`} onMouseEnter={handleHover} onMouseLeave={handleHoverOut}>
      <div className="block relative aspect-square overflow-hidden">
        <Image src={image ? image : 'https://placedog.net/720/720'} width={imageWidth ? imageWidth : 720} height={imageHeight ? imageHeight : 720} className="block w-full relative z-[10]" alt="placeholder" />

        {hoverImage && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-[200ms] z-[20]">
            <div className="absolute inset-y-[20%] inset-x-[10%] border-white border flex items-center justify-center z-[20]">
              <div className="w-[20%] lg:w-[10%] text-white">
                <CrosshairIcon className="w-full pointer-events-none" />
              </div>

              {/* <span className="block absolute bottom-0 right-0 text-sm uppercase text-white py-2 px-3 leading-none opacity-0 group-hover:opacity-100 group-hover:delay-[650ms]">Ready</span> */}
            </div>

            <div className="absolute inset-0 object-cover object-center z-[10]">
              <Image src={hoverImage ? hoverImage : 'https://placedog.net/720/720'} width={hoverImageWidth ? hoverImageWidth : 720} height={hoverImageHeight ? hoverImageHeight : 720} className={`block w-full pointer-events-none ${ shouldTransition && 'camera-focus-hover--image' }`} alt="placeholder" />
            </div>
          </div>
        )}
      </div>
      
      <div className={`${metaText || metaHeading ? 'py-[10%]' : 'py-[15%]'} text-center`}>
        {metaText && (
          <span className="block uppercase text-xs lg:text-sm">&quot;{metaText ? metaText : 'Pocket Piece'}&quot;</span>
        )}
        { metaHeading && (
          <span className={`block ${product ? 'mt-1 lg:mt-0 font-display text-[10vw] md:text-[6.5vw] lg:text-[4.25vw] 2xl:text-[70px] leading-[0.85] md:leading-[0.85] lg:leading-[0.85] 2xl:leading-[0.85]' : 'uppercase text-sm md:text-base lg:text-lg' }`}>{metaHeading ? metaHeading : 'Heading'}</span>
        )}
        {price && (
          <span className="block uppercase text-base lg:text-lg mt-[6px] lg:mt-[10px]">${price ? price : 'Sold Out'}</span>
        )}
      </div>
    </div>
  )
}