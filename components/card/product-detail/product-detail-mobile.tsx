/* eslint-disable max-len */
import router from 'next/router'
import React, { ReactElement } from 'react'
import Image from 'next/image'
import { BiArrowBack } from 'react-icons/bi'
import SwipeableViews from 'react-swipeable-views'
import { productDetailsType } from '../../../res/interface'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import Content from './content'
import { ButtonCartNotifMobile } from '../../button/button-cart-notif-mobile'

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

const ProductDetailMobile = ({
  onClickBuy, onClickCart, itemstore, isDisabled,
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
      <ButtonCartNotifMobile isFilled />

    </div>
    <div className="relative w-full px-4 pt-8 pb-24 -mt-8 bg-white rounded-2xl">
      <Content itemstore={itemstore} />
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-between px-4 py-2 mt-8 bg-white shadow hp:text-lg ">
        {itemstore.isRedirect ? (
          <button
            type="button"
            className="w-full px-4 py-2 ml-2 text-white rounded-md bg-primary disabled:opacity-50"
            onClick={() => window.open(itemstore.redirect)}
            disabled={isDisabled}
          >
            Kunjungi
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  </div>
  // </Layout>
)

export default ProductDetailMobile
