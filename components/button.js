import Link from "next/link";

export default function Button({ href, label, outline, outlineWhite, white, block}) {
  let theme = 'bg-black text-off-white' 
  let backdropTheme = 'bg-black'
  let foreGroundTheme = 'text-off-white'
  if (outline) {
    theme = 'text-black border border-black'
    backdropTheme = 'bg-black'
    foreGroundTheme = 'text-off-white'
  }
  if (outlineWhite) {
    theme = 'text-off-white border border-off-white'
    backdropTheme = 'bg-off-white'
    foreGroundTheme = 'text-black'
  }
  if (white) {
    theme = 'bg-off-white text-off-black'
  }
  return(
    <Link href={href} className={`uppercase rounded-[50%] px-5 lg:px-5 py-6 lg:py-6 text-center text-sm lg:text-base leading-none lg:leading-none relative overflow-hidden group ${theme} ${block ? 'block' : 'inline-block'}`}>
      <div className="relative overflow-hidden">
        <div className="transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-0 group-hover:translate-y-[100%] group-hover:delay-[0ms] delay-[160ms]">{label}</div>
        <div className={`transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] absolute inset-0 translate-y-[100%] group-hover:translate-y-0 z-20 group-hover:delay-[160ms] ${foreGroundTheme}`}>{label}</div>
      </div>
      <div className={`absolute inset-0 z-10 ${backdropTheme} transition-transform ease-[cubic-bezier([0.83,0,0.17,1])] duration-[400ms] translate-y-[-100%] group-hover:translate-y-0`}></div>
    </Link>
  )
}