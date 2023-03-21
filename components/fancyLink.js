import Link from 'next/link'

export default function FancyLink( {destination, a11yText, label, className, active, nav} ) {
  return (
    <Link href={destination} aria-label={a11yText} className={`flex items-center ${className} group`}>
      { nav && (
        <svg className={`${active ? 'bg-black' : '' } transition-transform ease-in-out duration-[300ms] group-hover:rotate-90 w-[10px] lg:w-[12px] mr-2`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12"><path stroke="#000" d="M12 11.5H9M0 11.5h3M0 .5h3M.5 0v3M11.5 0v3M12 .5H9M11.5 12V9M.5 12V9"/></svg>
      )}

      {label}
    </Link>
  )
}