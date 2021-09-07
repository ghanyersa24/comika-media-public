import React from 'react'
import { FaChevronRight, FaStore } from 'react-icons/fa'
import { IoMdPin } from 'react-icons/io'
import BottomFixedSummaryStore from '../../components/card/bottom-fixed-summary-store'
import SummaryItemStore from '../../components/items/summary-item-store'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'

export const Shipment = (params) => {
  console.log('🚀 ~ file: shipment.tsx ~ line 2 ~ Shipment ~ params', params)
  return (
    <div className="pt-16 pb-44 bg-bgGrayLight">
      <TopNavbarWithBackButton />
      <div className="flex m-4 bg-white py-4 px-6 rounded-lg shadow-md">
        <IoMdPin className="text-2xl text-primary flex-shrink-0   mr-4" />
        <div className="flex-1">
          <p className="text-sm leading-normal text-gray-500 mb-2">ALAMAT UTAMA</p>
          <p className="text-base font-bold leading-normal text-gray-900">Aziz Kane Sugianto  (08121547411)</p>
          <p className="w-64 text-base leading-normal text-gray-400">Jl.Cipaku Indah 3 No 14, Kecamatan Ledeng Kelurahan Cipedes, Bandung, JawaBarat.40143</p>
        </div>
        <FaChevronRight className="self-center flex-shrink-0 mx-2" />
      </div>
      <div className="m-4 bg-white px-6 rounded-lg shadow-md divide-y">
        <div className="flex py-4">
          <FaStore className="text-2xl text-primary flex-shrink-0   mr-4" />
          <p className="w-28 text-base font-medium leading-tight text-black">Karya Pandji</p>
        </div>
        <div className="py-4">
          <SummaryItemStore />
        </div>
        <div className="py-4">
          <SummaryItemStore />
        </div>
        <div className="py-4">
          <SummaryItemStore />
        </div>
      </div>
      <div className="m-4 bg-white py-4 px-6 rounded-lg shadow-md divide-y">
        <div className="flex">
          <FaStore className="text-2xl text-primary flex-shrink-0   mr-4" />
          <p className="w-28 text-base font-medium leading-tight text-black flex-1">Karya Pandji</p>
          <FaChevronRight className="self-center flex-shrink-0 mx-2" />
        </div>
      </div>
      <div className="m-4 py-4 px-6 ">
        <div className="flex justify-between">
          <p className="text-sm leading-normal text-gray-400">Subtotal untuk produk</p>
          <p className="text-sm leading-normal text-black">Rp137.400</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm leading-normal text-gray-400">Subtotal pengiriman</p>
          <p className="text-sm leading-normal text-black">Rp 0</p>
        </div>
      </div>
      <BottomFixedSummaryStore />

    </div>
  )
}

export default Shipment
