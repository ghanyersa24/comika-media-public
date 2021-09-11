import Image from 'next/image'
import router from 'next/router'
import { FunctionComponent, ReactElement } from 'react'
import { ItemStoreType } from '../../res/interface'

type props = {
  onClick: any
  imageUrl:string,
  title:string,
  price:string,
  type:string,
}
export const ItemStoreMobile: FunctionComponent<props> = ({
  onClick,
  imageUrl = 'https://via.placeholder.com/62x62',
  title = 'null',
  price = 'null',
  type,
}) => (
  <button type="button" onClick={onClick} className="flex w-full h-24 my-2 bg-white rounded-lg shadow hover:bg-gray-100">
    <div className="flex-initial w-24 h-24">
      <Image
        height={82}
        width={82}
        layout="responsive"
        src={imageUrl}
        alt="Gambar "
        className="rounded-lg "
      />
    </div>
    <div className="flex flex-col items-start h-full px-4 py-2">
      <div className="font-medium leading-relaxed text-gray-900">{type}</div>
      <div className="flex-1 text-sm leading-relaxed text-gray-500">
        {title}
      </div>
      <div className="text-base font-medium leading-tight text-primary">{price}</div>
    </div>
  </button>
)

export const ItemStoreDekstop: FunctionComponent<props> = ({
  onClick,
  imageUrl = 'https://via.placeholder.com/62x62',
  title = 'null',
  price = 'null',
  type,
}) => (
  <button type="button" onClick={onClick} className="mb-4 rounded-lg shadow-lg hover:shadow-xl">
    <div className="flex flex-col w-full bg-white rounded-lg hover:bg-gray-100">
      <div className="w-full">
        <Image
          height={82}
          width={82}
          layout="responsive"
          src={imageUrl}
          alt="Gambar "
          className="rounded-t-lg "
        />
      </div>
      <div className="flex px-4 py-4">
        <div className="flex flex-col items-start">
          <div className="text-lg font-medium leading-9 text-black text-opacity-90">
            {title}
          </div>
          <div className="text-base font-medium leading-tight text-gray-500">{price}</div>
        </div>
      </div>
    </div>
  </button>
)

export const ItemStores: FunctionComponent<{
  digitalStores:ItemStoreType[],
  isMobile:boolean
}> = ({ digitalStores, isMobile }):ReactElement => (
  <>
    {isMobile ? digitalStores?.map((popularStore) => (
      <ItemStoreMobile
        onClick={() => router.push(`/product/${popularStore.slug}`)}
        key={popularStore.id}
        imageUrl={popularStore.images[0]?.url}
        title={popularStore.name}
        price={popularStore.rupiah}
        type={popularStore.Category.name}
      />
    ))
      : (
        <div className="grid grid-cols-5 gap-4">
          { digitalStores?.map((popularStore) => (
            <ItemStoreDekstop
              onClick={() => router.push(`/product/${popularStore.slug}`)}
              key={popularStore.id}
              imageUrl={popularStore.images[0]?.url}
              title={popularStore.name}
              price={popularStore.rupiah}
              type={popularStore.Category.name}
            />
          ))}
        </div>
      )}
  </>
)

export default ItemStoreMobile
