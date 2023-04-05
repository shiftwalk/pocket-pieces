import Link from "next/link";

export default function Button({ href, label, outline, outlineWhite, white, block}) {
  let theme = 'bg-black text-off-white' 
  if (outline) {
    theme = 'text-black border border-black'
  }
  if (outlineWhite) {
    theme = 'text-off-white border border-off-white hover:bg-off-white hover:text-off-black'
  }
  if (white) {
    theme = 'bg-off-white text-off-black'
  }
  return(
    <Link href={href} className={`uppercase rounded-[50%] px-5 lg:px-5 py-6 lg:py-6 text-center text-sm lg:text-base leading-none lg:leading-none ${theme} ${block ? 'block' : 'inline-block'}`}>
      {label}
    </Link>
  )
}