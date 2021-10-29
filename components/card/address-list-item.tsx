import React, { FunctionComponent, ReactElement } from 'react'
import cn from 'classnames'
import { getBodyAddress, getTitleAddress } from '../../helper/address'
import { address as addressType } from '../../res/interface'

type props = {
	isMobile:boolean,
	address:addressType,
	leftElement:ReactElement,
	rightElement?:ReactElement|string,
	title?:string,
	onClickRight?:(id:string)=>void,
	isList?:boolean
}

export const AdddressListItem:FunctionComponent<props> = ({
  isMobile, address,
  onClickRight, rightElement: rightText, leftElement, title, isList = false,
}):ReactElement => (
  isMobile
    ? (
      <button type="button" onClick={() => onClickRight(address.id)} className="flex px-6 py-4 m-4 text-left bg-white rounded-lg shadow-md ">
        <div className="flex-shrink-0 mr-2 ">
          {leftElement}
        </div>
        <div className="flex-shrink">
          {title && <p className="mb-2 text-sm leading-normal text-gray-500">{title}</p>}
          <p className="text-base font-bold leading-normal text-gray-900">
            {address && getTitleAddress(address)}
          </p>
          <p className="text-base leading-normal text-gray-400">
            {address && getBodyAddress(address)}
          </p>
        </div>
        <div className="self-center flex-shrink-0 mx-2">
          {rightText}
        </div>
      </button>
    )
    : (
      <div className={cn('flex', { 'py-6 mb-6 bg-white rounded-lg shadow-md mycontainer': !isList })}>
        {leftElement}
        <div className="flex-grow">
          {title && <p className="mb-2 text-sm leading-normal text-gray-500">{title}</p>}
          <p className="text-base font-bold leading-normal text-gray-900">
            {address && getTitleAddress(address)}

          </p>
          <p className="text-base leading-normal text-gray-400">
            {address && getBodyAddress(address)}

          </p>
        </div>
        <div className="flex items-center">
          <div className="mr-6 font-medium text-gray-400">
            {address.active && 'Utama'}
          </div>
          <button type="button" onClick={() => onClickRight(address.id)} className="font-bold text-primary hover:underline">
            {rightText}
          </button>
        </div>
      </div>
    )
)
export default AdddressListItem
