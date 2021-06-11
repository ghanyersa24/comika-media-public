export default function Container({ children, className }) {
  return <div className={`container mx-auto px-8 max-w-screen-xl ${className}`}>{children}</div>
}
