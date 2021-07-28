import Router from 'next/router'
import { ReactElement } from 'react'
import { BiArrowBack } from 'react-icons/bi'

type SubNavbarType = {
title: string,
className?:string
}
export const BackNavbar = ({ title, className }:SubNavbarType):ReactElement => (
  <div className={`relative flex ${className} py-2 px-4`}>
    <button onClick={() => Router.back()} type="button" className="text-2xl">
      <BiArrowBack />
    </button>
    <h1 className="text-lg font-medium ml-4">{title}</h1>
  </div>
)

BackNavbar.defaultProps = {
  className: '',
}

export default BackNavbar
