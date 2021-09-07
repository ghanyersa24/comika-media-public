import React from 'react'
import SummaryItemStore from '../../components/items/summary-item-store'
import IncreaseDecreaseDeleteButton from '../../components/button/increase-decrease-delete-button'
import BottomFixedSummaryStore from '../../components/card/bottom-fixed-summary-store'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'

export const Cart = (params) => {
  console.log('🚀 ~ file: index.tsx ~ line 2 ~ Cart ~ params', params)
  return (
    <div className="bg-bgGrayLight">
      <TopNavbarWithBackButton />
      <div className="rounded-xl p-4 pt-16 pb-44">
        <div className=" bg-white shadow-lg rounded-xl my-4">

          <label className=" p-4  flex items-center  shadow rounded-t-xl">
            <input type="checkbox" name="checked-demo" className="checkbox" />
            <span className="text-gray-900 font-medium text-lg">Pilih Semua</span>
          </label>

          <div className="px-4 py-2 divide-y">
            <div className="py-4">
              <div className="flex py-4  border-b border-gray-100 items-center">
                <input type="checkbox" name="checked-demo" className="checkbox" />
                <SummaryItemStore />
              </div>
              <div className="flex justify-between items-center text-base mt-4">
                <span className="text-sm font-medium leading-none text-primary">Tulis Catatan</span>
                <IncreaseDecreaseDeleteButton />
              </div>
            </div>
            <div className="py-4">
              <div className="flex py-4  border-b border-gray-100 items-center">
                <input type="checkbox" name="checked-demo" className="checkbox" />
                <SummaryItemStore />
              </div>
              <div className="flex justify-between items-center text-base mt-4">
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
