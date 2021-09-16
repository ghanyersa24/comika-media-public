import Image from 'next/image'
import { ReactElement } from 'react'

const SummaryItemStore = ():ReactElement => {
  console.log('SummaryItemStore')
  return (
    <div className="flex">
      <div className="flex-initial">
        <Image
          height={82}
          width={82}
          layout="fixed"
          src="/background/download.webp"
          alt="Gambar "
          className="rounded-lg"
        />
      </div>
      <div className="ml-3">
        <p className="text-sm leading-normal text-gray-400 line-clamp-2">Brontosaurus</p>
        <p className="text-lg leading-relaxed text-black">Rp 36.000</p>
      </div>
    </div>
  )
}

export default SummaryItemStore
