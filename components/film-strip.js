import { useScroll, useMotionValueEvent } from 'framer-motion'
import CrosshairIcon from '@/icons/crosshair.svg'
import StarIcon from '@/icons/star.svg'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import SanityImage from './sanity-image'

export default function FilmStrip({ images }) {
  const horiScrollerWrapper = useRef(null)
  const horiScroller = useRef(null)
  const horiScrollerMeta = useRef(null)
  const horiScrollerMeta2 = useRef(null)
  const horiScrollerImage1 = useRef(null)
  const horiScrollerImage2 = useRef(null)
  const horiScrollerImage3 = useRef(null)
  const horiScrollerItem1 = useRef(null)
  const horiScrollerItem2 = useRef(null)
  const horiScrollerItem3 = useRef(null)

  const { scrollYProgress } = useScroll({
    target: horiScrollerWrapper,
    offset: ["start end", "end start"]
  })
  
  useEffect(() => {
    horiScroller.current.style.transform = `translateX(-${(16) + scrollYProgress * 15}vw)`
    horiScrollerMeta.current.style.transform = `translateX(-${(-2) + scrollYProgress * 15}vw)`
    horiScrollerMeta2.current.style.transform = `translateX(-${(-2) + scrollYProgress * 15}vw)`

    horiScrollerImage1.current.style.transform = `translateX(${(-3) + scrollYProgress * 3}vw) scale(1.125)`
    horiScrollerImage2.current.style.transform = `translateX(${(-3) + scrollYProgress * 3}vw) scale(1.125)`
    horiScrollerImage3.current.style.transform = `translateX(${(-3) + scrollYProgress * 3}vw) scale(1.125)`
  });
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    horiScroller.current.style.transform = `translateX(-${(16) + latest * 15}vw)`;
    horiScrollerMeta.current.style.transform = `translateX(-${ (-2) + latest * 15}vw)`;
    horiScrollerMeta2.current.style.transform = `translateX(-${ (-2) + latest * 15}vw)`;

    horiScrollerImage1.current.style.transform = `translateX(${(-3) + latest * 3}vw) scale(1.125)`;
    horiScrollerItem1.current.style.transform = `rotate(${(latest - 100) / 1000}deg), translateY(-20px)`;
    horiScrollerImage2.current.style.transform = `translateX(${(-3) + latest * 3}vw) scale(1.125)`;
    horiScrollerItem2.current.style.transform = `rotate(${(latest - 50) / 1000}deg)`;

    horiScrollerImage3.current.style.transform = `translateX(${(-3) + latest * 3}vw) scale(1.125)`;
    horiScrollerItem3.current.style.transform = `rotate(${latest / 1000}deg), translateY(20px)`;
  })

  return(
    <div className="bg-black text-off-white overflow-hidden">
      <div className="px-4 lg:px-6 pt-3 lg:pt-5 pb-3 lg:pb-6">
        <div className="flex flex-wrap w-full items-center px-[5vw] will-change-transform" ref={horiScrollerMeta}>
          <div className="relative block">
            <span className="block scale-y-[50%] scale-x-[150%] text-4xl leading-none opacity-10 blur-[2px]" role="presentation" aria-hidden="true">►</span>
            <span className="block scale-y-[50%] scale-x-[150%] text-4xl leading-none opacity-30 blur-[2px] absolute inset-0 translate-y-[3px] translate-x-[-3px] select-none" role="presentation" aria-hidden="true" tabIndex="-1">►</span>
          </div>

          <span className="block opacity-30 font-bold mx-auto pl-[20vw] text-sm lg:text-lg blur-[1px] select-none" role="presentation" aria-hidden="true" tabIndex="-1">KODAK FILM 400</span>
        </div>
      </div>

      <div className="w-full overflow-hidden" ref={horiScrollerWrapper}>
        <div className="whitespace-nowrap py-2 will-change-transform" ref={horiScroller}>
          <div className="w-[45vw] lg:w-[35vw] h-[63vw] lg:h-[45vw] mx-[5.5vw] lg:mx-[5.5vw] overflow-hidden rounded-2xl inline-block rotate-2 blur-[2px] relative will-change-transform" ref={horiScrollerItem1}>
            <div className="inner-shadow absolute inset-0 w-full h-full z-[1]"></div>
            <div ref={horiScrollerImage1} className="opacity-90 will-change-transform absolute inset-0">
              <SanityImage layout="fill" image={images[0]} sizes="(min-width: 1024px) 65vw, 66vw" className="block absolute inset-0 w-full h-full object-cover object-center z-[-1]" alt="placeholder" />
            </div>
          </div>

          <div className="w-[45vw] lg:w-[35vw] h-[63vw] lg:h-[45vw] mx-[5.5vw] lg:mx-[5.5vw] overflow-hidden rounded-2xl inline-block relative group will-change-transform" ref={horiScrollerItem2}>
            <div className="inner-shadow absolute inset-0 w-full h-full z-[3]"></div>
            
            <div className="absolute inset-0 transition-opacity ease-in-out duration-[330ms] z-[2]">
              <div className="absolute inset-y-[6%] inset-x-[7%] border-white border flex items-center justify-center z-[2]">
                <div className="w-[20%] lg:w-[10%] text-white">
                  <CrosshairIcon className="w-full pointer-events-none" />
                </div>
              </div>

              <div className="absolute inset-0 z-[1]">
                <div ref={horiScrollerImage2} className="opacity-90 will-change-transform absolute inset-0 z-[1]">
                  <SanityImage layout="fill" image={images[1]} sizes="(min-width: 1024px) 65vw, 66vw" className="block w-full h-full pointer-events-none object-cover object-center absolute inset-0" alt="placeholder" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[45vw] lg:w-[35vw] h-[63vw] lg:h-[45vw] mx-[5.5vw] lg:mx-[5.5vw] overflow-hidden rounded-2xl inline-block rotate-1 blur-[2px] relative will-change-transform" ref={horiScrollerItem3}>
            <div className="inner-shadow absolute inset-0 w-full h-full z-[1]"></div>
            <div ref={horiScrollerImage3} className="opacity-90 will-change-transform absolute inset-0">
              <SanityImage layout="fill" image={images[2]} sizes="(min-width: 1024px) 65vw, 66vw" className="block absolute inset-0 w-full h-full object-cover object-center z-[-1]" alt="placeholder" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 lg:px-6 pt-3 lg:pt-5 pb-3 lg:pb-6">
        <div className="px-[10vw] will-change-transform flex" ref={horiScrollerMeta2}>
          <span className="block opacity-30 font-bold blur-[1px] text-sm lg:text-lg select-none" role="presentation" aria-hidden="true" tabIndex="-1">FF 1 2010 TX</span>

          <span className="opacity-30 font-bold blur-[1px] text-sm lg:text-lg select-none ml-auto flex items-center" role="presentation" aria-hidden="true" tabIndex="-1">
          <span className="inline-block">POCKET_PIECES</span><span className="inline-block w-[35px] lg:w-[45px] ml-2"><StarIcon /></span></span>
        </div>
      </div>
    </div>
  )
}