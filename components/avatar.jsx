/* eslint-disable no-unused-vars */
import Image from 'next/image'

export default function Avatar({
  name,
  picture,
  className,
  date = null,
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-8 h-8 mr-2 xs:w-12 xs:h-12 xs:mr-4">
        <Image
          src={picture || '/background/download.webp'}
          alt={`photo profil ${name}`}
          layout="intrinsic"
          className="rounded-full"
          width={144}
          height={144}
        />
      </div>
      <div className="flex-grow ">
        <p className="leading-tight line-clamp-1">{name}</p>
        <div className="flex item-center ">
          <p className="mr-1 text-xs font-normal md:text-sm ">{date}</p>
          {/* <p className="mr-1">•</p> */}
          {/* <p className="">{read}</p> */}
        </div>
      </div>
    </div>
  )
}

export function AvatarRelativeDate({
  name,
  picture,
  className,
  date = null,
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-8 h-8 mr-2 xs:w-12 xs:h-12 xs:mr-4">
        <Image
          src={picture || '/background/download.webp'}
          alt={`photo profil ${name}`}
          layout="intrinsic"
          className="rounded-full"
          width={144}
          height={144}
        />
      </div>
      <div className="flex flex-grow ">
        <p className="mr-2 text-sm leading-tight line-clamp-1 ">{name}</p>
        <span className="text-xs font-normal text-gray-500 md:text-sm">{date}</span>
      </div>
    </div>
  )
}
