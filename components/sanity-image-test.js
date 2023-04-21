import { SanityImage } from 'sanity-image'
import sanity from '@/services/sanity'

export default function SanityImageTest({ image, className, sizes, eager }) {
  return (
    <>
      <SanityImage
        id={image.asset._id}
        baseUrl={`https://cdn.sanity.io/images/${sanity.config.projectId}/${sanity.config.dataset}/`}
        width={image.asset.metadata.dimensions.width}
        height={image.asset.metadata.dimensions.height}
        mode="cover"
        hotspot={image.hotspot}
        preview={image.asset.metadata.lqip}
        alt="Sweet Christmas!"
        loading={eager ? 'eager' : 'lazy'}
        className={className}
        sizes={sizes ? sizes : null}
      />
    </>
  )
}