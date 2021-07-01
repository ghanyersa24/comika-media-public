export default function Avatar({ name, picture, className }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      <div className="">{name}</div>
    </div>
  )
}
