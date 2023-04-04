import Layout from '@/components/layout'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/transitions'
import { getProductSlugs, getProduct } from '@/helpers/shopify'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import SanityPageService from '@/helpers/sanity-page-service'
import { useAddToCartContext, useCartContext } from '@/context/store'

const query = `{
  "musicVideos": *[_type == "musicVideos"] | order(date desc) {
    title,
  }
}`

const pageService = new SanityPageService(query)

export default function ShopSlug(initialData) {
  const { data: { productData } } = pageService.getPreviewHook(initialData)()
  const [variantPrice, setVariantPrice] = useState(productData.variants.edges[0].node.price.amount)
  const [quantity, setQuantity] = useState(1)
  const [variantId, setVariantId] = useState(productData.variants.edges[0].node.id)
  const [variant, setVariant] = useState(productData.variants.edges[0])
  const isLoading = useCartContext()[2]
  const addToCart = useAddToCartContext()

  async function handleAddToCart() {
    const varId = variant.node.id
    // update store context
    if (quantity !== '') {
      addToCart({
        productTitle: productData.title,
        productHandle: productData.handle,
        productImage: productData.images.edges[0].node,
        variantId: varId,
        variantPrice: variant.node.price.amount,
        variantTitle: variant.node.title,
        variantQuantity: 1
      })
    }
  }

  return (
    <Layout>
      <NextSeo title={productData.title} />

      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <main className="mb-12 md:mb-16 xl:mb-24 pt-[70px] md:pt-[75px] lg:pt-[90px]">
            {/* {JSON.stringify(productData)} */}
            <Container>
              <m.div variants={fade}>
                <div className="mb-12">
                  <span className="block uppercase text-sm">Back to shop</span>
                  <h1 className="text-[15vw] md:text-[12.5vw] lg:text-[10vw] leading-[0.8] md:leading-[0.8] lg:leading-[0.8]">{productData.title}</h1>
                  <span className="block">&pound;{productData.variants.edges[0].node.price.amount}</span>
                </div>
                
                <div className="content max-w-3xl mb-4">
                  {productData.description}
                </div>

                <button onClick={handleAddToCart} className={`uppercase rounded-[50%] px-3 lg:px-5 py-6 lg:py-8 text-center lg:text-lg lg:leading-none bg-black text-off-white ${ isLoading ? 'cursor-disabled' : ''}`}>
                  { isLoading ? 'Added to bag' : 'Add to bag'}
                </button>
              </m.div>
            </Container>
          </main>

          <m.div variants={fade}>
            <Footer />
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}


export async function getStaticPaths() {
  const productSlugs = await getProductSlugs()

  const paths = productSlugs.map((slug) => {    
    const productSlug = String(slug.node.handle)
    
    return {
      params: { slug: productSlug }
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  // const cms = await pageService.fetchQuery(context)
  const productData = await getProduct(context.params.slug)

  return {
    props: { productData }
  }
}