import Link from "next/link"
import { useState } from "react"
import Polaroid from "./polaroid"

export default function RelatedRoller({ items, itemsOne, itemsTwo }) {
  const [currentItem, setCurrentItem] = useState(0)

  const decrease = () => {
    setCurrentItem(currentItem == 0 ? (Math.floor(items.length / 2) - 1) : currentItem - 1)
  }

  const next = () => {
    setCurrentItem(currentItem == (Math.floor(items.length / 2) - 1) ? 0 : currentItem + 1)
  }

  let moneyUkLocale = Intl.NumberFormat('en-UK', {
    style: "currency",
    currency: "GBP",
    useGrouping: true,
  });

  return(
    <div className="flex flex-wrap justify-center related overflow-hidden">
      <button onClick={decrease} className="rotate-90 text-xl md:text-3xl p-3 absolute bottom-[50%] lg:bottom-[50%] left-[5%] lg:left-[5%] flex items-center justify-center z-10 bg-white bg-opacity-[0.02] rounded-full w-10 md:w-12 h-10 md:h-12 group overflow-hidden">
        <div className="relative overflow-hidden">
          <div className="transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-0 group-hover:translate-y-[100%] group-hover:delay-[0ms] delay-[160ms]">↓</div>
          <div className={`transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] absolute inset-0 translate-y-[-100%] group-hover:translate-y-0 z-20 group-hover:delay-[160ms] text-black`}>↓</div>
        </div>
        <div className={`absolute inset-0 z-10 bg-off-white transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-[-100%] group-hover:translate-y-0`}></div>
      </button>

      <button onClick={next} className="-rotate-90 text-xl md:text-3xl flex items-center justify-center absolute bottom-[50%] lg:bottom-[50%] right-[5%] lg:right-[5%] z-10 bg-white bg-opacity-[0.02] rounded-full w-10 md:w-12 h-10 md:h-12 group overflow-hidden">
        <div className="relative overflow-hidden">
          <div className="transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-0 group-hover:translate-y-[100%] group-hover:delay-[0ms] delay-[160ms]">↓</div>
          <div className={`transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] absolute inset-0 translate-y-[-100%] group-hover:translate-y-0 z-20 group-hover:delay-[160ms] text-black`}>↓</div>
        </div>
        <div className={`absolute inset-0 z-10 bg-off-white transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-[-100%] group-hover:translate-y-0`}></div>
      </button>

      {Array.from(Array(Math.floor(items.length / 2)), (e, i) => {
        return (
          <div className={`w-full lg:w-9/12 max-w-[1200px] mx-auto flex flex-wrap justify-center transition-all ease-[cubic-bezier([0.83,0,0.17,1])] duration-[900ms] py-8 md:pt-10 md:pb-10 lg:pt-12 lg:pb-12 2xl:pt-20 2xl:pb-20 ${i == currentItem ? 'opacity-100 blur-0 delay-[300ms]' : 'opacity-0 blur-[70px] pointer-events-none' } ${i == 0 ? 'relative' : 'absolute top-0 left-0 right-0 mx-auto' }`} key={i}>
            {itemsOne[i] && (
              <div className="w-[65%] md:w-[35%] lg:w-[45%] md:mx-3 lg:mx-4">
                <Link href={`/shop/${itemsOne[i].node.handle}`} className="block w-full relative h-full">
                  <Polaroid
                    thin
                    noShadow
                    product
                    matchHeight
                    className="w-full text-off-black"
                    hire={itemsOne[i].node.collections.edges.some(e => e.node.title === 'For Hire')}
                    hireDark
                    smallText
                    collection={itemsOne[i].node.collections.edges[0]?.node.title}
                    metaText={itemsOne[i].node.metaTitle ? itemsOne[i].node.metaTitle.value : null}
                    metaHeading={itemsOne[i].node.title}
                    price={moneyUkLocale.format(itemsOne[i].node.variants.edges[0]?.node.price.amount)}
                    image={itemsOne[i].node.images.edges[0]?.node.originalSrc}
                    imageWidth={itemsOne[i].node.images.edges[0]?.node.width}
                    imageHeight={itemsOne[i].node.images.edges[0]?.node.height}
                    hoverImage={itemsOne[i].node.images.edges[1] ? itemsOne[i].node.images.edges[1].node.originalSrc : itemsOne[i].node.images.edges[0]?.node.originalSrc}
                    hoverImageWidth={itemsOne[i].node.images.edges[1] ? itemsOne[i].node.images.edges[1].node.width : itemsOne[i].node.images.edges[0]?.node.width}
                    hoverImageHeight={itemsOne[i].node.images.edges[1] ? itemsOne[i].node.images.edges[1].node.height : itemsOne[i].node.images.edges[0]?.node.height}
                  />
                </Link>
              </div>
            )}
            { itemsTwo[i] && (
            <div className="w-[65%] md:w-[35%] lg:w-[45%] md:mx-3 lg:mx-4 hidden md:block">
              <Link href={`/shop/${itemsTwo[i].node.handle}`} className="block w-full relative h-full">
                <Polaroid
                  thin
                  noShadow
                  product
                  matchHeight
                  className="w-full text-off-black"
                  hire={itemsTwo[i].node.collections.edges.some(e => e.node.title === 'For Hire')}
                  hireDark
                  smallText
                  collection={itemsTwo[i].node.collections.edges[0]?.node.title}
                  metaText={itemsTwo[i].node.metaTitle ? itemsTwo[i].node.metaTitle.value : null}
                  metaHeading={itemsTwo[i].node.title}
                  price={moneyUkLocale.format(itemsTwo[i].node.variants.edges[0]?.node.price.amount)}
                  image={itemsTwo[i].node.images.edges[0]?.node.originalSrc}
                  imageWidth={itemsTwo[i].node.images.edges[0]?.node.width}
                  imageHeight={itemsTwo[i].node.images.edges[0]?.node.height}
                  hoverImage={itemsTwo[i].node.images.edges[1] ? itemsTwo[i].node.images.edges[1].node.originalSrc : itemsTwo[i].node.images.edges[0]?.node.originalSrc}
                  hoverImageWidth={itemsTwo[i].node.images.edges[1] ? itemsTwo[i].node.images.edges[1].node.width : itemsTwo[i].node.images.edges[0]?.node.width}
                  hoverImageHeight={itemsTwo[i].node.images.edges[1] ? itemsTwo[i].node.images.edges[1].node.height : itemsTwo[i].node.images.edges[0]?.node.height}
                />
              </Link>
            </div>
          )}
        </div>
        )
      })}
    </div>
  )
}