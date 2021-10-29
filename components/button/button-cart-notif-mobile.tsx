import router from 'next/router'
import React, { FunctionComponent } from 'react'
import { IoMdBasket } from 'react-icons/io'
import useSWR from 'swr'
import cn from 'classnames'
import { useSession } from 'next-auth/client'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_CART } from '../../res/api-endpoint'
import { cartType } from '../../res/interface'

export const ButtonCartNotifMobile:FunctionComponent<{isFilled?:boolean}> = (
  { isFilled = false },
) => {
  const [session] = useSession()
  const { data: carts } = useSWR<cartType[]>(() => (session ? `${API_ENDPOINT_CART}` : null), client.get)
  const sumOfCarts = carts?.reduce((sum, cart) => sum + cart.qty, 0)
  return (
    <button
      onClick={() => router.push('/cart')}
      type="button"
      className={cn('relative p-2 text-xl',
        { 'bg-white text-black rounded-lg shadow': isFilled },
        { 'text-white': !isFilled })}
    >
      <IoMdBasket />
      { ![0, undefined].includes(sumOfCarts) && (
        <div className="absolute top-0 w-4 h-4 text-xs text-white bg-red-500 rounded-full right-1">
          {sumOfCarts}
        </div>
      )}
    </button>
  )
}

export default ButtonCartNotifMobile
