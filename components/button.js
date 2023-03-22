import Link from "next/link";

export default function Button({ href, label, outline}) {
  return(
    <Link href={href} className={`uppercase inline-block ${outline ? 'text-black border border-black' : 'text-white bg-black'} rounded-[50%] px-5 py-5`}>
      {label}
    </Link>
  )
}