import Image from 'next/image'

export default function Avatar({ name, picture, className }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-12 h-12  mr-4">
        <Image
          src={picture}
          alt={`photo profil ${name}`}
          layout="responsive"
          className="rounded-full"
          width={60}
          height={60}
        />
      </div>

      <div className="">{name}</div>
    </div>
  )
}
