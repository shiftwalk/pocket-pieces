import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Roller({ items }) {
  const textRoller = useRef(null)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    textRoller.current.style.transform = `translateY(0)`
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    textRoller.current.style.transform = `translateY(-${(latest * ((items.length - 1) * 100))}%)`;
  })

  return(
    <>
      <span className="block tabular-nums">
        <span className="block overflow-hidden relative">
          <span className="opacity-0">01</span>
          <span className="block absolute inset-0" ref={textRoller}>
            {items.map((e, i) => {
              return (
                <span key={i} className="block">{i+1 < 10 ? '0' : ''}{i + 1}</span>
              )
            })}
          </span>
        </span>
      </span>
      <span className="block">/{items.length < 10 ? '0' : ''}{items.length}</span>
    </>
  )
}