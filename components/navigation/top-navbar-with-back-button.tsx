import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

const TopNavbarWithBackButton = (params) => (
  <div className="bg-primary flex text-white items-center fixed inset-x-0 top-0 z-50 ">
    <button type="button" className="py-4 px-4">
      <BiArrowBack className="text-2xl" />
    </button>
    <p className="text-base font-bold leading-tight ">Keranjang Belanja</p>
  </div>
)

export default TopNavbarWithBackButton
