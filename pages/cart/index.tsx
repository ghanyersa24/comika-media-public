/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react'
import useSWR, { mutate } from 'swr'
import SummaryItemStore from '../../components/items/summary-item-store'
import IncreaseDecreaseDeleteButton from '../../components/button/increase-decrease-delete-button'
import { BottomFixedSummaryStore } from '../../components/card/bottom-fixed-summary-store'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'
import { API_ENDPOINT_ADD_CART, API_ENDPOINT_CART } from '../../res/api-endpoint'
import { cartType } from '../../res/interface'
import { client } from '../../lib/clientRaw'
import CartItem from '../../components/items/cart-item'

export const Cart = ():ReactElement => {
  const { data: carts } = useSWR<cartType[]>(`${API_ENDPOINT_CART}`, client.get)
  const sumOfCarts = carts?.reduce((sum, cart) => sum + cart.qty, 0)
  const sumOfTotal = carts?.reduce((sum, cart) => sum + cart.total, 0)

  const handleQytChange = async (qyt:number, cartId:string) => {
    await client.post(`${API_ENDPOINT_ADD_CART}/${cartId}`, {
      qty: qyt,
      note: null,
      update: true,
    })
    await mutate(API_ENDPOINT_CART)
  }

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

            {carts?.map((cart) => (
              <CartItem
                key={cart.id}
                cart={cart}
                onQytChange={handleQytChange}
              />
            ))}
            {/* <div className="py-4">
              <div className="flex items-center py-4 border-b border-gray-100">
                <input type="checkbox" name="checked-demo" className="checkbox" />
                <SummaryItemStore />
              </div>
              <div className="flex items-center justify-between mt-4 text-base">
                <span className="text-sm font-medium leading-none text-primary">Tulis Catatan</span>

                <IncreaseDecreaseDeleteButton />
              </div>
            </div> */}

          </div>
        </div>
      </div>
      <BottomFixedSummaryStore qyt={sumOfCarts} total={sumOfTotal} />
    </div>
  )
}

export default Cart
