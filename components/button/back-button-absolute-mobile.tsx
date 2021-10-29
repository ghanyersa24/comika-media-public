import Router from 'next/router'
import React, { FunctionComponent } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export const BackButtonAbsoluteMobile:FunctionComponent = () => (
  <button onClick={() => Router.back()} type="button" className="absolute top-0 z-20 p-2 mt-6 ml-6 text-xl bg-white rounded-lg shadow md:hidden">
    <BiArrowBack />
  </button>
)

export default BackButtonAbsoluteMobile
