import { PortableText } from "@portabletext/react";
import { useInView } from "framer-motion"
import { useRouter } from "next/router";
import { useRef } from "react"
import slugify from "slugify"

export default function AccordionItem({ item }) {
  const router = useRouter();
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.75})

  return(
    <div className={`block mb-16 lg:mb-24 xl:mb-32 scroll-mt-28`} id={slugify(item.heading, { lower: true })}>
      <h2 className="text-[48px] lg:text-[58px] leading-none lg:leading-none border-b border-current pb-1 mb-8 lg:mb-12">{item.heading}</h2>
      
      {item.questions.map((e, i) => {
        return (
          <div ref={ref} key={i} className="mb-8 lg:mb-12 max-w-screen-lg w-[95%] lg:w-[90%]">
            <h3 className="font-normal text-lg leading-none block mb-6">{e.question}</h3>
            <div className="font-light content"><PortableText value={e.answer} /></div>
          </div>
        )
      })}
    </div>
  )
}