export default function MetaText({ text, className, sm }) {
  return(
    <span className={`block uppercase mb-5 lg:mb-8 ${sm ? 'text-xs lg:text-sm' : 'text-sm lg:text-lg' } leading-none lg:leading-none ${className}`}>({text})</span>
  )
}