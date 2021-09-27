import Image from 'next/image'
import { FunctionComponent, ReactElement } from 'react'

type SubsribeBannerType = {
isShow: boolean,
isMobile: boolean,
onClick: any,
src:string
}

export const SubsribeBanner:FunctionComponent<SubsribeBannerType> = ({
  isShow, onClick, isMobile, src,
}): ReactElement => {
  if (isShow) {
    return (
      <button type="button" onClick={onClick} className="w-full py-4 lg:py-8">
        <Image
          src={src}
          alt="Subsribe Banner"
          layout="intrinsic"
          className="rounded"
          width={isMobile ? 354 : 1200}
          height={isMobile ? 125 : 258}
        />
      </button>
    )
  }
  return null
}

export default SubsribeBanner
