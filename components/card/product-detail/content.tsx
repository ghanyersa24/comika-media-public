/* eslint-disable max-len */
import React, { ReactElement } from 'react'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import { ItemStoreType } from '../../../res/interface'

const Content = ({ itemstore }:{itemstore:ItemStoreType}):ReactElement => (
  <>
    <p className="mt-2 mb-1 title-store">{itemstore.Category.name}</p>
    <p className="text-2xl text-gray-900">{itemstore.name}</p>
    <div className="flex items-center ">
      <p className="flex-1 text-2xl font-bold text-primary">{itemstore.rupiah}</p>
    </div>
    {/* <div>
            <p className="mt-6 mb-1 title-store">Ukuran</p>
            <button type="button"
            className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold text-white border bg-primary border-primary rounded-xl ">S</button>
            <button type="button"
            className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold border text-primary border-primary rounded-xl ">M</button>
            <button type="button"
            className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold border text-primary border-primary rounded-xl ">L</button>
            <button type="button"
            className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold border text-primary border-primary rounded-xl ">Xl</button>
            <button type="button"
            className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold border text-primary border-primary rounded-xl ">XXL</button>
          </div> */}
    <div className="mt-6 mb-1 ">
      <p className="title-store">Deskripsi</p>
      <p className="leading-relaxed text-gray-500 xtext-base">
        {itemstore.description}
      </p>
    </div>
  </>
)
export default Content
