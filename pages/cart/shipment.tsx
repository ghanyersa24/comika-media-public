import React from 'react'
import { FaChevronRight, FaStore } from 'react-icons/fa'
import { IoMdPin } from 'react-icons/io'
import { BottomFixedSummaryStore } from '../../components/card/bottom-fixed-summary-store'
import SummaryItemStore from '../../components/items/summary-item-store'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'

export const Shipment = () => {
  console.log('🚀 ~ file: shipment.tsx ~ line 2 ~ Shipment ~ params')
  return (
    <div className="pt-16 pb-44 bg-bgGrayLight">
      <TopNavbarWithBackButton title="Pesanan" />
      <div className="flex px-6 py-4 m-4 bg-white rounded-lg shadow-md">
        <IoMdPin className="flex-shrink-0 mr-4 text-2xl text-primary" />
        <div className="flex-shrink">
          <p className="mb-2 text-sm leading-normal text-gray-500">ALAMAT UTAMA</p>
          <p className="text-base font-bold leading-normal text-gray-900">Aziz Kane Sugianto  (08121547411)</p>
          <p className="text-base leading-normal text-gray-400">Jl.Cipaku Indah 3 No 14, Kecamatan Ledeng Kelurahan Cipedes, Bandung, JawaBarat.40143</p>
        </div>
        <FaChevronRight className="self-center flex-shrink-0 mx-2" />
      </div>
      <div className="px-6 m-4 bg-white divide-y rounded-lg shadow-md">
        <div className="flex py-4">
          <FaStore className="flex-shrink-0 mr-4 text-2xl text-primary" />
          <p className="text-base font-medium leading-tight text-black w-28">Karya Pandji</p>
        </div>
        <div className="py-4">
          {/* <SummaryItemStore /> */}
        </div>
        <div className="py-4">
          {/* <SummaryItemStore /> */}
        </div>
        <div className="py-4">
          {/* <SummaryItemStore /> */}
        </div>
      </div>
      <div className="px-6 py-4 m-4 bg-white divide-y rounded-lg shadow-md">
        <div className="flex">
          <FaStore className="flex-shrink-0 mr-4 text-2xl text-primary" />
          <p className="flex-1 text-base font-medium leading-tight text-black w-28">Karya Pandji</p>
          <FaChevronRight className="self-center flex-shrink-0 mx-2" />
        </div>
      </div>
      <div className="px-6 py-4 m-4 ">
        <div className="flex justify-between">
          <p className="leading-normal text-gray-400 ">Subtotal untuk produk</p>
          <p className="leading-normal text-black ">Rp137.400</p>
        </div>
        <div className="flex justify-between">
          <p className="leading-normal text-gray-400 ">Subtotal pengiriman</p>
          <p className="leading-normal text-black ">Rp 0</p>
        </div>
      </div>
      {/* <BottomFixedSummaryStore /> */}

    </div>
  )
}

export default Shipment
