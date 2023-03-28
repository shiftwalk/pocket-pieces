export default function Container({ children, className }) {
  return(
    <div className={`px-4 mx-auto w-full lg:px-6 ${className}`}>
      {children}
    </div>
  )
}