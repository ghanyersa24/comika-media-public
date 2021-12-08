import Image from 'next/image'
import { FunctionComponent } from 'react'

type SubsribeBannerType = {
  isShow: boolean
  onClick: any
  src:string
}

export const SubsribeBanner:FunctionComponent<SubsribeBannerType> = ({
  isShow, onClick, src,
}) => {
  if (isShow) {
    return (
      <button type="button" onClick={onClick} className="w-full py-4 lg:py-8">
        <Image
          src={src}
          alt="Subsribe Banner"
          layout="intrinsic"
          className="rounded"
          objectFit="cover"
          width={1200}
          height={258}
        />
      </button>
    )
  }
  return null
}

export default SubsribeBanner
