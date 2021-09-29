import Image from 'next/image'
import { ReactElement } from 'react'
import { cartType } from '../../res/interface'

const SummaryItemStore = ({ cart }:{cart:cartType}) :ReactElement => (
  <div className="flex">
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
      <p className="text-sm leading-normal text-gray-400 line-clamp-2">{cart.name}</p>
      <p className="text-lg leading-relaxed text-black">{cart.price}</p>
    </div>
  </div>
)

export default SummaryItemStore
