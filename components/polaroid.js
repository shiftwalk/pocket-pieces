import CrosshairIcon from '@/icons/crosshair.svg'
import Image from 'next/image';
import { useState } from 'react';

export default function Polaroid({ image, hoverImage, metaHeading, metaText }) {
  const [shouldTransition, setShouldTransition] = useState(false);
  function handleHover() {
    setShouldTransition(true);
  }

  function handleHoverOut() {
    setShouldTransition(false);
  }

  return (
    <div className="bg-white w-auto p-[9%] pb-0 relative z-[20] shadow-lg shadow-black/01 group camera-focus-hover" onMouseEnter={handleHover} onMouseLeave={handleHoverOut}>
      <div className="block relative aspect-square overflow-hidden">
        <Image src={image ? image : 'https://placedog.net/720/720'} width={720} height={720} className="block w-full relative z-[10]" alt="placeholder" />

        {hoverImage && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-[330ms] z-[20]">
            <div className="absolute inset-y-[20%] inset-x-[10%] border-white border flex items-center justify-center z-[20]">
              <div className="w-[20%] lg:w-[10%] text-white">
                <CrosshairIcon className="w-full pointer-events-none" />
              </div>
            </div>

            <div className="absolute inset-0 object-cover object-center z-[10]">
              <Image src={hoverImage ? hoverImage : 'https://placedog.net/720/720'} width={720} height={720} className={`block w-full pointer-events-none ${ shouldTransition && 'camera-focus-hover--image' }`} alt="placeholder" />
            </div>
          </div>
        )}
      </div>
      
      <div className={`${metaText || metaHeading ? 'py-[10%]' : 'py-[15%]'} text-center`}>
        {metaText && (
          <span className="block uppercase text-xs lg:text-sm">{metaText ? metaText : 'Pocket Piece'}</span>
        )}
        { metaHeading && (
          <span className="block uppercase text-sm md:text-base lg:text-lg">{metaHeading ? metaHeading : 'Heading'}</span>
        )}
      </div>
    </div>
  )
}