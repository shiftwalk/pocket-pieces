import Link from "next/link";

export default function Button({ href, label, outline, white, block}) {
  let theme = 'bg-black text-off-white' 
  if (outline) {
    theme = 'text-black border border-black'
  }
  if (white) {
    theme = 'bg-off-white text-off-black'
  }
  return(
    <Link href={href} className={`uppercase rounded-[50%] px-3 lg:px-5 py-6 lg:py-8 text-center lg:text-lg lg:leading-none ${theme} ${block ? 'block' : 'inline-block'}`}>
      {label}
    </Link>
  )
}