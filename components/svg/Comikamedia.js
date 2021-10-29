import React from 'react'
import Image from 'next/image'

function SvgComikamedia(props) {
  return (
    <div {...props}>
      <Image
        src="https://api.comika.media/uploads/comika/media-white.png"
        alt="logo comika media"
        layout="intrinsic"
        width={320 * 1.2}
        height={52 * 1.2}
      />
    </div>

  )
}

export default SvgComikamedia
