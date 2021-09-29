import React, { FunctionComponent } from 'react'
import { cartType } from '../../res/interface'
import IncreaseDecreaseDeleteButton from '../button/increase-decrease-delete-button'
import SummaryItemStore from './summary-item-store'

type props = {
	cart:cartType
	// eslint-disable-next-line no-unused-vars
	onQytChange:(qyt:number, cartId:string) => void
}
const CartItem : FunctionComponent<props> = ({ cart, onQytChange }) => (
  <div className="py-4">
    <div className="flex items-center py-4 border-b border-gray-100">
      <input type="checkbox" name="checked-demo" className="checkbox" />
      <SummaryItemStore cart={cart} />
    </div>
    <div className="flex items-center justify-between mt-4 text-base ">
      <span className="text-sm font-medium leading-none text-primary">Tulis Catatan</span>
      <IncreaseDecreaseDeleteButton
        qyt={cart.qty}
        onQytChange={(qyt) => onQytChange(qyt, cart.productId)}
      />
    </div>
  </div>
)

export default CartItem
