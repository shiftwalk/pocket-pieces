import { useRef } from "react";
import {
  m,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import Image from "next/image";
import CrosshairIcon from '@/icons/crosshair.svg'
import StarIcon from '@/icons/star.svg'

export default function FilmStripTest({ image1, image2, image3, image4, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 2500], [0, 5], {
    clamp: false
  });


  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1200);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className="bg-black text-off-white">
      <div className="parallax">
        <m.div className="scroller will-change-transform" style={{ x }}>
          {Array.from(Array(4), (e, i) => {
            return (
            <div className="w-[133vw] flex flex-wrap py-5" key={e}>
              <div className="block w-[33%] px-[5.5vw] rotate-1 blur-2">
                <div className="relative overflow-hidden rounded-[30px]">
                  <div className="w-full h-[45vw]">
                    <div className="inner-shadow absolute inset-0 w-full h-full z-[3]"></div>
                    
                    <m.img src={image1} className="opacity-80 absolute inset-0 w-full h-full object-cover object-center z-[2] scale-[1.25]" alt="placeholder"/>
                  </div>
                </div>
              </div>
              
              <div className="block w-[33%] px-[5.5vw]">
                <div className="relative overflow-hidden rounded-[30px]">
                  <div className="w-full h-[45vw]">
                    <div className="inner-shadow absolute inset-0 w-full h-full z-[3]"></div>
                    <div className="absolute inset-y-[9%] lg:inset-y-[7%] inset-x-[10%] lg:inset-x-[8%] border-white border flex items-center justify-center z-[2]">
                      <div className="w-[20%] lg:w-[10%] text-white">
                        <CrosshairIcon className="w-full pointer-events-none" />
                      </div>
                    </div>
                    
                    <m.img src={image2} className="opacity-80 absolute inset-0 w-full h-full object-cover object-center z-[2] scale-[1.25]" alt="placeholder"/>
                  </div>
                </div>
              </div>

              <div className="block w-[33%] px-[5.5vw] -rotate-1 blur-2">
                <div className="relative overflow-hidden rounded-[30px]">
                  <div className="w-full h-[45vw]">
                    <div className="inner-shadow absolute inset-0 w-full h-full z-[3]"></div>
                    
                    <m.img src={image3} className="opacity-80 absolute inset-0 w-full h-full object-cover object-center z-[2] scale-[1.25]" alt="placeholder"/>
                  </div>
                </div>
              </div>
            </div>
            )
          })}
        </m.div>
      </div>
    </div>
  );
}