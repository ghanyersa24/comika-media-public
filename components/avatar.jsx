/* eslint-disable no-unused-vars */
import Image from 'next/image'
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'

export default function Avatar({
  name,
  picture,
  className,
  date = null,
  read = null,
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
          <p className="mr-1">{date}</p>
          {/* <p className="mr-1">•</p> */}
          {/* <p className="">{read}</p> */}
        </div>
      </div>
    </div>
  )
}
