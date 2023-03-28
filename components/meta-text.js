export default function MetaText({ text, className }) {
  return(
    <span className={`block uppercase mb-5 lg:mb-8 text-sm leading-none lg:leading-none lg:text-lg ${className}`}>({text})</span>
  )
}