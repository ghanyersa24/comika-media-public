export default function PostTitle({ children }) {
  return (
    <h1 className="mt-24 mb-12 text-5xl font-bold leading-tight tracking-tighter text-center text-primary md:text-6xl md:leading-none md:text-left">
      {children}
    </h1>
  )
}
