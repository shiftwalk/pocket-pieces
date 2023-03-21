import Link from "next/link";

export default function Button({ href, label, outline}) {
  return(
    <Link href={href} className={`btn relative ${outline ? 'text-black' : 'text-white'}`}>
      <span className="relative z-10">
        {label}
      </span>
      
      {outline && (
        <div className="btn--inner absolute inset-0 z-0 bg-white"></div>
      )}
    </Link>
  )
}