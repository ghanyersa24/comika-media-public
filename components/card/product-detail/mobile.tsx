/* eslint-disable max-len */
import router from 'next/router'
import React, { ReactElement } from 'react'
import Image from 'next/image'
import { BiArrowBack } from 'react-icons/bi'
import { IoMdBasket } from 'react-icons/io'
import SwipeableViews from 'react-swipeable-views'
import { productDetailsType } from '../../../res/interface'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import Content from './content'

const ImageProductMobile = ({ url }) => (
  <Image
    src={url}
    alt="photo profil "
    layout="responsive"
    className=""
    width={120}
    height={120}
  />
)

const ProductMobile = ({
  onClickBuy, onClickCart, itemstore, isDisabled, buyedProductQyt,
}:productDetailsType):ReactElement => (
  // <Layout isMobile={isMobile}>
  <div>
    <SwipeableViews
      enableMouseEvents
      className=""
      slideClassName=""
    >
      {itemstore.images.length ? itemstore.images.map((image) => (
        <ImageProductMobile url={image.source.url} key={image.source.url} />
      ))
        : <ImageProductMobile url="/background/download.webp" />}

    </SwipeableViews>

    <div className="absolute inset-x-0 top-0 flex justify-between px-4 pt-4">
      <button onClick={() => router.back()} type="button" className="p-2 text-xl bg-white rounded-lg shadow">
        <BiArrowBack />
      </button>
      <button onClick={() => router.push('/cart')} type="button" className="relative p-2 text-xl bg-white rounded-lg shadow">
        <IoMdBasket />
        <div className="absolute top-0 w-4 h-4 text-xs text-white bg-red-500 rounded-full right-1">
          {buyedProductQyt}
        </div>
      </button>
    </div>
    <div className="relative w-full px-4 pt-8 pb-24 -mt-8 bg-white rounded-2xl">
      <Content itemstore={itemstore} />
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-between px-4 py-2 mt-8 bg-white shadow hp:text-lg ">
        <button
          type="button"
          className="w-1/2 px-4 py-2 mr-2 border border-gray-200 rounded-md disabled:opacity-50"
          onClick={onClickCart}
          disabled={isDisabled}

        >
          + Keranjang
        </button>
        <button
          type="button"
          className="w-1/2 px-4 py-2 ml-2 text-white rounded-md bg-primary disabled:opacity-50"
          onClick={onClickBuy}
          disabled={isDisabled}

        >
          Beli Sekarang
          {' '}
        </button>
      </div>
    </div>
  </div>
  // </Layout>
)

export default ProductMobile
