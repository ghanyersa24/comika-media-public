/* eslint-disable max-len */
import React, { ReactElement, useState } from 'react'
import Image from 'next/image'
import InnerImageZoom from 'react-inner-image-zoom'
import { productDetailsType } from '../../../res/interface'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import Content from './content'

const ProductDekstop = ({
  onClickBuy,
  onClickCart,
  itemstore,
  isDisabled,
}: productDetailsType): ReactElement => {
  const [selectedImage, setSelectedImage] = useState(
    itemstore.images[0]?.source.url,
  )
  return (
    <div className="flex max-w-screen-lg p-2 mx-auto bg-white shadow-md lg:p-4">
      <div className="flex-shrink-0 mr-4 w-96">
        {/* <Image
          src={selectedImage}
          alt="photo profil "
          layout="intrinsic"
          className="rounded"
          width={384}
          height={384}
        /> */}
        <InnerImageZoom
          src={selectedImage}
          zoomSrc={selectedImage}
          zoomType="hover"
          className="rounded"
        />
        <div className="w-full mt-2 overflow-y-auto">
          {itemstore.images.length
            && itemstore.images.map((image) => (
              <button
                type="button"
                onClick={() => setSelectedImage(image.source.url)}
                key={image.source.url}
                className="mr-2 rounded"
              >
                <Image
                  src={image.source.url}
                  alt="photo profil "
                  layout="intrinsic"
                  className="rounded"
                  width={96}
                  height={96}
                />
              </button>
            ))}
        </div>
      </div>
      <div className="relative w-full px-4 pb-24 mt-0 bg-white ">
        <Content itemstore={itemstore} />
        <div className="absolute inset-x-0 bottom-0 flex px-4 py-2 mt-8">
          {itemstore.isRedirect ? (
            <button
              type="button"
              className="px-12 py-2 text-white rounded-md bg-primary disabled:opacity-50"
              onClick={() => window.open(itemstore.redirect)}
              disabled={isDisabled}
            >
              Kunjungi
            </button>
          ) : (
            <>
              <button
                type="button"
                className="px-6 py-2 mr-2 border rounded-md border-primary text-primary disabled:opacity-50"
                onClick={onClickCart}
                disabled={isDisabled}
              >
                Tambah Keranjang
              </button>
              <button
                type="button"
                className="px-6 py-2 ml-2 text-white rounded-md bg-primary disabled:opacity-50"
                onClick={onClickBuy}
                disabled={isDisabled}
              >
                Beli Sekarang
                {' '}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDekstop
