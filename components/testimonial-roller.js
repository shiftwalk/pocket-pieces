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
    <div className="flex flex-wrap lg:justify-center relative overflow-visible">
      <button onClick={decrease} className="rotate-90 text-3xl p-3 absolute bottom-[16%] lg:bottom-[36%] left-[10%] lg:left-[5%] hidden lg:flex items-center justify-center z-10 bg-black bg-opacity-[0.04] rounded-full w-12 h-12 group overflow-hidden">
        <div className="relative overflow-hidden">
          <div className="transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-0 group-hover:translate-y-[100%] group-hover:delay-[0ms] delay-[160ms]">↓</div>
          <div className={`transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] absolute inset-0 translate-y-[-100%] group-hover:translate-y-0 z-20 group-hover:delay-[160ms] text-off-white`}>↓</div>
        </div>
        <div className={`absolute inset-0 z-10 bg-off-black transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-[-100%] group-hover:translate-y-0`}></div>
      </button>

      <button onClick={next} className="-rotate-90 text-3xl flex items-center justify-center absolute top-[24%] lg:top-auto lg:bottom-[36%] right-[10%] lg:right-[5%] z-10 bg-black bg-opacity-[0.04] rounded-full w-12 h-12 group overflow-hidden">
        <div className="relative overflow-hidden">
          <div className="transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-0 group-hover:translate-y-[100%] group-hover:delay-[0ms] delay-[160ms]">↓</div>
          <div className={`transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] absolute inset-0 translate-y-[-100%] group-hover:translate-y-0 z-20 group-hover:delay-[160ms] text-off-white`}>↓</div>
        </div>
        <div className={`absolute inset-0 z-10 bg-off-black transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-[-100%] group-hover:translate-y-0`}></div>
      </button>

      <MetaText text="Kind Words" className="w-full lg:text-center" />

      <div className="relative w-full flex flex-wrap lg:justify-center">
        {items.map((e, i) => {
          return (
            <div className={`transition-all ease-[cubic-bezier([0.83,0,0.17,1])] duration-[1300ms] flex flex-wrap lg:block lg:pb-12 ${i == currentItem ? 'opacity-100 blur-0 delay-[400ms]' : 'opacity-0 blur-[70px]' } w-full ${i == 0 ? 'relative' : 'absolute top-0 left-0' }`} key={i}>
              <blockquote className="font-display text-[15vw] md:text-[9vw] lg:text-[7.7vw] mb-[6vw] lg:mb-[4vw] leading-[0.8] md:leading-[0.8] lg:leading-[0.8] max-w-[90%] lg:max-w-[80%] lg:text-center w-full order-3 lg:order-2 lg:mx-auto">“{e.text}”</blockquote>

              {e.images?.length && (
                <div className="w-full max-w-[70%] lg:max-w-[75%] mb-[6vw] lg:mb-[2vw] order-2 lg:order-3 lg:mx-auto">
                  <div className="flex flex-wrap justify-center">
                    {e.images?.map((ee, i) => {
                      let shift = ''
                      if (e.images.length == 3) {
                        if (i == 0) {
                          shift = 'lg:translate-x-[3vw]'
                        }
                        if (i == 2) {
                          shift = 'lg:translate-x-[-3vw]'
                        }
                      }
                      if (e.images.length == 2) {
                        if (i == 0) {
                          shift = 'lg:translate-x-[1.5vw]'
                        }
                        if (i == 1) {
                          shift = 'lg:translate-x-[-1.5vw]'
                        }
                      }

                      return (
                        <div className={`w-full lg:w-1/3 bg-black ${shift}`} key={i}>
                          <div className={`w-full aspect-square py-[3vw] px-[3vw] ${i == 0 ? 'block' : 'hidden lg:block' }`}>
                            <SanityImage layout="fill" image={ee} alt="Placeholder" className="w-full h-full absolute inset-0" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              
              <div className="w-full lg:text-center order-4 lg:order-4 lg:mx-auto">
                {e.instagramHandle ? (
                  <p>{e.instagramHandle}</p>
                ) : (
                  <p>@instagram_user</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}