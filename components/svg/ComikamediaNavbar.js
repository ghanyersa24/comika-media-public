import React from 'react'
import Image from 'next/image'

function SvgComikamediaNavbar(props) {
  return (
    <div {...props}>
      <Image
        src="https://api.comika.media/uploads/comika/media.png"
        alt="logo comika media"
        layout="intrinsic"
        width={320 * 1.2}
        height={52 * 1.2}

      />
    </div>
  )
}

export default SvgComikamediaNavbar
