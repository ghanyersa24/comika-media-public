import Image from 'next/image'
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'

export default function Avatar({
  name, picture, className, date, read,
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="xs:w-12 xs:h-12 w-8 h-8  xs:mr-4 mr-2">
        <Image
          src={picture}
          alt={`photo profil ${name}`}
          layout="responsive"
          className="rounded-full"
          width={60}
          height={60}
        />
      </div>
      <div className="flex-grow text-xs lg:text-base text-gray-800">
        <p className="leading-tight line-clamp-1">{name}</p>
        <div className="flex item-center  ">
          <p className="mr-1">{date}</p>
          {/* <p className="mr-1">•</p> */}
          {/* <p className="">{read}</p> */}
        </div>
      </div>
      <div>
        <BsBookmark className="text-xl " />
      </div>
    </div>
  )
}
