import { useState } from "react"
import MetaText from "./meta-text"
import SanityImage from "./sanity-image"

export default function TestimonialRoller({ items }) {
  const [currentItem, setCurrentItem] = useState(0)

  const decrease = () => {
    setCurrentItem(currentItem == 0 ? (items.length - 1) : currentItem - 1)
  }

  const next = () => {
    setCurrentItem(currentItem == (items.length - 1) ? 0 : currentItem + 1)
  }

  return(
    <div className="flex flex-wrap lg:justify-center relative">
      <button onClick={decrease} className="rotate-90 text-3xl p-3 absolute bottom-[16vw] left-[10vw] lg:left-[5vw] hidden lg:flex items-center justify-center z-[40] bg-black bg-opacity-[0.04] rounded-full w-12 h-12 group overflow-hidden">
        <div className="relative overflow-hidden">
          <div className="transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-0 group-hover:translate-y-[100%] group-hover:delay-[0ms] delay-[160ms]">↓</div>
          <div className={`transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] absolute inset-0 translate-y-[-100%] group-hover:translate-y-0 z-20 group-hover:delay-[160ms] text-off-white`}>↓</div>
        </div>
        <div className={`absolute inset-0 z-[40] bg-off-black transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-[-100%] group-hover:translate-y-0`}></div>
      </button>

      <button onClick={next} className="-rotate-90 text-3xl flex items-center justify-center absolute top-[30vw] lg:top-auto lg:bottom-[16vw] right-[10vw] lg:right-[5vw] z-[40] bg-black bg-opacity-[0.04] rounded-full w-12 h-12 group overflow-hidden">
        <div className="relative overflow-hidden">
          <div className="transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-0 group-hover:translate-y-[100%] group-hover:delay-[0ms] delay-[160ms]">↓</div>
          <div className={`transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] absolute inset-0 translate-y-[-100%] group-hover:translate-y-0 z-20 group-hover:delay-[160ms] text-off-white`}>↓</div>
        </div>
        <div className={`absolute inset-0 z-10 bg-off-black transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-[-100%] group-hover:translate-y-0`}></div>
      </button>

      <MetaText text="Kind Words" className="w-full lg:text-center" />

      <div className="relative w-full flex flex-wrap lg:justify-center pb-4">
        {items.map((e, i) => {
          return (
            <div className={`w-full flex flex-wrap lg:justify-center z-10 ${i == 0 ? 'relative' : 'absolute top-0 left-0' }`} key={i}>
              <blockquote className={`font-display text-[15vw] md:text-[9vw] lg:text-[7.7vw] mb-[6vw] lg:mb-[4vw] leading-[0.8] md:leading-[0.8] lg:leading-[0.8] max-w-[90%] lg:max-w-[80%] lg:text-center w-full order-3 lg:order-2 transition-all ease-[cubic-bezier([0.83,0,0.17,1])] duration-[1400ms] ${i == currentItem ? 'opacity-100 blur-0' : 'opacity-0 blur-[70px]' }`}>“{e.text}”</blockquote>

              {e.images?.length && (
                <div className={`w-full max-w-[70%] lg:max-w-[75%] lg:p-[3vw] mb-[5vw] lg:mb-[2vw] order-2 lg:order-3 z-0 relative`}>
                  <div className={`flex flex-wrap justify-center lg:mx-[-1.5vw] transition-all ease-[cubic-bezier([0.83,0,0.17,1])] duration-[1400ms] z-10 ${i == currentItem ? 'opacity-100 blur-0' : 'opacity-0 blur-[70px]' }`}>
                    {e.images?.map((e, i) => {
                      return (
                        <div className="w-full lg:w-1/3 lg:px-[1.5vw]" key={i}>
                          <div className={`w-full aspect-square ${i == 0 ? 'block' : 'hidden lg:block' }`}>
                            <SanityImage layout="fill" image={e} alt="Placeholder" className="w-full h-full absolute inset-0" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              
              <div className={`w-full lg:text-center order-4 lg:order-4 transition-all ease-[cubic-bezier([0.83,0,0.17,1])] duration-[1400ms] ${i == currentItem ? 'opacity-100 blur-0' : 'opacity-0 blur-[70px]' }`}>
                {e.instagramHandle ? (
                  <p>{e.instagramHandle}</p>
                ) : (
                  <p>@happy_customer</p>
                )}
              </div>
            </div>
          )
        })}

        <div className={`absolute left-[12.5%] right-[12.%] lg:bottom-[11.4%] xl:bottom-[10.8%] 2xl:bottom-[10.1%] bg-black w-[75%] h-[25vw] z-0 hidden lg:block pointer-events-none`}></div>
      </div>
    </div>
  )
}