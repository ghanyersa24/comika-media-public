import React, { ReactElement, useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useDebounce } from 'use-debounce'
import { Promo } from '../../res/interface'

type props = {
	promo:Promo
	promoCodeInitial:string
  isUseLable?:boolean
	onPromoCodeChange: (qyt: string) => void
}
const PromoForm = ({
  promoCodeInitial, promo, onPromoCodeChange, isUseLable = true,
}: props): ReactElement => {
  const [promoCode, setPromoCode] = useState<string>(promoCodeInitial)
  const [debouncedPromoCode] = useDebounce(promoCode, 2000)
  const isPromoCodeSameWithInitial = debouncedPromoCode === promoCodeInitial
  useEffect(() => {
    if (!isPromoCodeSameWithInitial) onPromoCodeChange(debouncedPromoCode)
  }, [debouncedPromoCode])
  return (
    <>
      {isUseLable && <div className="font-medium text-gray-800 text-md">Kode Promo</div>}
      <div className="relative ">
        <input
          className="w-full px-3 py-2 my-2 rounded-md"
          type="text"
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Masukkan kode promo disini"
          name="email"
          id="email"
        />
        <div className="absolute inset-y-0 top-0 right-0 flex items-center px-4 text-sm font-medium text-red-500 ">

          {debouncedPromoCode === promoCode ? promo?.rupiah : <FaSpinner className="w-5 h-5 mr-3 animate-spin text-primary" /> }
        </div>
      </div>
    </>
  )
}

export default PromoForm
