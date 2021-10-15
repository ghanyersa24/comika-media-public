import Router from 'next/router'
import React, { FunctionComponent } from 'react'
import { BiArrowBack } from 'react-icons/bi'

const TopNavbarWithBackButton : FunctionComponent<{title:string,
  rightComponent?:any}> = ({ title, rightComponent = null }) => (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center text-white bg-primary ">
      <button type="button" className="px-4 py-4" onClick={() => Router.back()}>
        <BiArrowBack className="text-2xl" />
      </button>
      <p className="flex-grow text-base font-bold leading-tight ">{title}</p>
      <div>
        {rightComponent}
      </div>
    </div>
  )

export default TopNavbarWithBackButton
