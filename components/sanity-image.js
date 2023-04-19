import Img from 'next/image'
import sanity from '@/services/sanity'
import { useNextSanityImage } from 'next-sanity-image'
import { useState } from 'react';

export default function SanityImage({ image, layout, widthOverride, focalPoint, className, priority, noCaption, noBg, sizes, quality }) {
  const [imageIsLoaded, setImageIsLoaded] = useState(true)

  const myCustomImageBuilder = (imageUrlBuilder, options) => {
    return imageUrlBuilder
      .width((widthOverride ? widthOverride : options.width) || Math.min(( widthOverride ? widthOverride : options.originalImageDimensions.width), 800))
      .quality(quality ? quality : 33)
      .fit('clip')
  };
  
	const imageProps = useNextSanityImage(sanity.config, image.asset, { imageBuilder: myCustomImageBuilder });
  const attributes = {};

  if (focalPoint?.x && focalPoint?.y) {
    const { x, y } = focalPoint;
    attributes.objectPosition = `${x * 100}% ${y * 100}%`;
  }

  if (image.alt) { attributes.alt = image.alt } else { attributes.alt = 'MISSING ALT TEXT' }
  if (layout) { attributes.layout = layout } else { attributes.layout = 'responsive' }
  if (priority) { attributes.priority = true } else { attributes.priority = false }
  if (sizes) { attributes.sizes = sizes }
  if (layout == 'fill') { delete imageProps.width, delete imageProps.height }

	return (
    <figure className={`image relative bg-gray-600 bg-opacity-20 overflow-hidden ${className} ${layout == 'fill' && 'cover-image' }`}>
      <Img
        {...imageProps}
        {...attributes}
        className={`transition-all ease-in-out duration-[750ms] ${imageIsLoaded
        ? 'blur-2xl scale-[1.05]'
        : 'blur-0 scale-100'
        }`}
        onLoadingComplete={() => setImageIsLoaded(false)}
      />
    </figure>
  )
}