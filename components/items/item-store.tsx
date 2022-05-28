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
  imageUrl = '/background/download.webp',
  title = 'null',
  price = 'null',
  type,
}) => (
  <button type="button" onClick={onClick} className="flex w-full h-24 my-2 bg-white rounded-lg shadow hover:bg-gray-100">
    <div className="flex-initial w-24 h-24">
      <Image
        height={328}
        width={328}
        layout="responsive"
        src={imageUrl}
        alt="Gambar "
        className="rounded-l-lg "
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
  imageUrl = '/background/download.webp',
  title = 'null',
  price = 'null',
}) => (
  <button type="button" onClick={onClick} className="p-2 mb-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-gray-50">
    <div className="flex flex-col w-full ">
      <div className="w-full">
        <Image
          height={328}
          width={328}
          layout="responsive"
          src={imageUrl}
          alt="Gambar "
          className="rounded-lg "
        />
      </div>
      <div className="flex py-4">
        <div className="flex flex-col items-start">
          <div className="text-2xl font-medium leading-9 text-black text-opacity-90">
            {title}
          </div>
          <div className="text-lg font-medium leading-normal text-primary">{price}</div>
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
      // onClick={() => toast.info('Nantikan updatenya segera, hanya di Comika Media', {
        //   
        // })}
        key={popularStore.id}
        imageUrl={popularStore.images[0]?.source.url}
        title={popularStore.name}
        price={popularStore.rupiah}
        type={popularStore.Category}
      />
    ))
      : (
        <div className="grid grid-cols-1 hp:grid-cols-2 xs:grid-cols-2 gap-x-4 md:grid-cols-3 md:gap-x-4 lg:gap-x-8 gap-y-8 md:gap-y-16">
          { digitalStores?.map((popularStore) => (
            <ItemStoreDekstop
              onClick={() => router.push(`/product/${popularStore.slug}`)}
              // onClick={() => toast.info('Nantikan updatenya segera, hanya di Comika Media', {
              //   
              // })}
              key={popularStore.id}
              imageUrl={popularStore.images[0]?.source.url}
              title={popularStore.name}
              price={popularStore.rupiah}
              type={popularStore.Category}
            />
          ))}
        </div>
      )}
  </>
)

export default ItemStoreMobile
