import React, { FunctionComponent } from 'react'
import { cartType } from '../../res/interface'
import IncreaseDecreaseButton, { DeleteButton } from '../button/increase-decrease-delete-button'
import SummaryItemStoreMobile from './summary-item-store-mobile'

type props = {
	cart:cartType
	onQytChange:(qyt:number, cartId:string) => void,
  setChecked:(value:boolean, cartId:string)=>void,
  isChecked:boolean
}
const CartItemMobile : FunctionComponent<props> = ({
  cart, onQytChange, setChecked, isChecked,
}) => (
  <div className="py-4">
    <div className="flex items-center py-4 border-b border-gray-100">
      <input type="checkbox" name="checked-demo" className="checkbox" checked={isChecked} onChange={(e) => setChecked(e.target.checked, cart.id)} />
      <SummaryItemStoreMobile cart={cart} />
    </div>
    <div className="flex items-center justify-end mt-4 text-base ">
      <IncreaseDecreaseButton
        isWithButton={!(cart.type === 'subscription')}
        isMinusDisabled={cart.qty === 1}
        qyt={cart.qty}
        onQytChange={(qyt) => onQytChange(qyt, cart.productId)}
      />
      <DeleteButton onDelete={() => onQytChange(0, cart.productId)} />
    </div>
  </div>
)

export default CartItemMobile
