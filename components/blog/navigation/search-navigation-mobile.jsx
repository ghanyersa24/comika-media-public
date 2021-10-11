import Link from 'next/link'
import { MdNotifications } from 'react-icons/md'
import React from 'react'
import { Comikamedia } from '../../svg'
import { SearchBar } from './search-bar'
import { ButtonCartNotifMobile } from '../../button/button-cart-notif-mobile'

export const App = () => (
  <div className="pt-4 pb-32 bg-primary hp:pb-40 md:bg-red-400 ">
    <div className="flex items-center justify-between px-4 mb-4">
      <Link href="/">
        <a className="block hover:underline "><Comikamedia className="h-5 w-36" /></a>
      </Link>
      <div className="flex items-center text-xl text-white">
        <ButtonCartNotifMobile />
        <MdNotifications />
      </div>
    </div>
    <div className="w-full px-4">
      <SearchBar className="text-white bg-opacity-25 bg-primaryLight" />
    </div>
  </div>
)

export default App
