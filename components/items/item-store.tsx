import Image from 'next/image'
import { FunctionComponent } from 'react'

type props = {
  onClick: any
  imageUrl:string,
  title:string,
  price:string,
  type:string,
}
export const ItemStore: FunctionComponent<props> = ({
  onClick,
  imageUrl = 'https://via.placeholder.com/62x62',
  title = 'null',
  price = 'null',
  type,
}) => (
  <button type="button" onClick={onClick} className="flex my-2 bg-white rounded-lg w-full h-24 shadow hover:bg-gray-100">
    <div className="flex-initial h-24 w-24">
      <Image
        height={82}
        width={82}
        layout="responsive"
        src={imageUrl}
        alt="Gambar "
        className="rounded-lg "
      />
    </div>
    <div className="flex flex-col py-2 px-4 items-start h-full">
      <div className="leading-relaxed text-gray-900 font-medium">{type}</div>
      <div className="flex-1 leading-relaxed text-gray-500  text-sm">
        {title}
      </div>
      <div className="text-base font-medium leading-tight text-primary">{price}</div>
    </div>
  </button>
)
export default ItemStore
