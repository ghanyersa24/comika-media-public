import React from 'react'
import SummaryItemStore from '../../components/items/summary-item-store'
import IncreaseDecreaseDeleteButton from '../../components/button/increase-decrease-delete-button'
import BottomFixedSummaryStore from '../../components/card/bottom-fixed-summary-store'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'

export const Cart = (params) => {
  console.log('🚀 ~ file: index.tsx ~ line 2 ~ Cart ~ params', params)
  return (
    <div className="bg-bgGrayLight">
      <TopNavbarWithBackButton title="Keranjang Belanja" />
      <div className="p-4 pt-16 rounded-xl pb-44">
        <div className="my-4 bg-white shadow-lg rounded-xl">

          <label className="flex items-center p-4 shadow rounded-t-xl">
            <input type="checkbox" name="checked-demo" className="checkbox" />
            <span className="text-lg font-medium text-gray-900">Pilih Semua</span>
          </label>

          <div className="px-4 py-2 divide-y">
            <div className="py-4">
              <div className="flex items-center py-4 border-b border-gray-100">
                <input type="checkbox" name="checked-demo" className="checkbox" />
                <SummaryItemStore />
              </div>
              <div className="flex items-center justify-between mt-4 text-base ">
                <span className="text-sm font-medium leading-none text-primary">Tulis Catatan</span>
                <IncreaseDecreaseDeleteButton />
              </div>
            </div>
            <div className="py-4">
              <div className="flex items-center py-4 border-b border-gray-100">
                <input type="checkbox" name="checked-demo" className="checkbox" />
                <SummaryItemStore />
              </div>
              <div className="flex items-center justify-between mt-4 text-base">
                <span className="text-sm font-medium leading-none text-primary">Tulis Catatan</span>

                <IncreaseDecreaseDeleteButton />
              </div>
            </div>

          </div>
        </div>
      </div>
      <BottomFixedSummaryStore />
    </div>
  )
}

export default Cart
