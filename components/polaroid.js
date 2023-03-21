import Image from "next/image";

export default function Polaroid({ image, hoverImage, metaHeading, metaText }) {
  return (
    <div className="bg-white w-auto p-[10%] pb-0 relative z-[20] shadow-lg shadow-black/01 group">
      <div className="block relative aspect-square">
        <img src={image ? image : 'https://placedog.net/720/720'} className="block w-full relative z-[10]" />

        {hoverImage && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-[300ms] z-[20]">
            <div className="absolute inset-y-[20%] inset-x-[10%] border-white border flex items-center justify-center z-[20]">
              <div className="w-[20%] lg:w-[10%] text-white">
                <Image
                  priority
                  src="/icons/crosshair.svg"
                  height={104}
                  width={105}
                  alt="Crosshair Icon"
                  className="w-full pointer-events-none"
                />
              </div>
            </div>

            <div className="absolute inset-0 object-cover object-center z-[10]">
              <img src={hoverImage ? hoverImage : 'https://placedog.net/720/720'} className="block w-full pointer-events-none" />
            </div>
          </div>
        )}
      </div>
      
      <div className="py-[10%] text-center">
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