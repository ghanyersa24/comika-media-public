import React, { FunctionComponent } from 'react'
import { cartType } from '../../res/interface'
import IncreaseDecreaseButton, { DeleteButton } from '../button/increase-decrease-delete-button'
import { numberWithCommas } from '../../helper/accounting'
import SummaryItemStoreDektop from './summary-item-store-dekstop'

type props = {
  cart: cartType
  onQytChange: (qyt: number, cartId: string) => void,
  setChecked: (value: boolean, cartId: string) => void,
  isChecked: boolean
}
const CartItemDekstop: FunctionComponent<props> = ({
  cart, onQytChange, setChecked, isChecked,
}) => (
  <tr className="table-auto">
    <td>
      <input type="checkbox" name="checked-demo" className="checkbox" checked={isChecked} onChange={(e) => setChecked(e.target.checked, cart.id)} />
    </td>
    <td>
      <SummaryItemStoreDektop cart={cart} />
    </td>
    <td className="text-center">{cart.priceRp}</td>
    <td>
      <div className="flex justify-center">
        <IncreaseDecreaseButton
          isWithButton={!(cart.type === 'subscription')}
          isMinusDisabled={cart.qty === 1}
          qyt={cart.qty}
          onQytChange={(qyt) => onQytChange(qyt, cart.productId)}
        />
      </div>
    </td>
    <td className="font-bold text-right text-primary">{`Rp ${numberWithCommas(cart.price * cart.qty)}`}</td>
    <td>
      <div className="flex justify-center ">
        <DeleteButton onDelete={() => onQytChange(0, cart.productId)} />
      </div>
    </td>
  </tr>
)

export default CartItemDekstop
