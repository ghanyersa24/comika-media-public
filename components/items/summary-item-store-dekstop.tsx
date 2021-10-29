import Image from 'next/image'
import { ReactElement } from 'react'
import { cartType } from '../../res/interface'

const SummaryItemStoreDektop = ({ cart }:{cart:cartType}) :ReactElement => (
  <div className="flex items-center py-2">
    <div className="flex-initial">
      <Image
        height={82}
        width={82}
        layout="fixed"
        src={cart.img}
        alt="Gambar "
        className="rounded-lg"
      />
    </div>
    <div className="ml-3">
      <p className="text-base leading-normal text-gray-800 line-clamp-2">{cart.name}</p>
    </div>
  </div>
)

export default SummaryItemStoreDektop
