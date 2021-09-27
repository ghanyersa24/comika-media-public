import Link from 'next/link'
import { MdShoppingCart, MdNotifications } from 'react-icons/md'
import React from 'react'
import { Comikamedia } from '../../svg'
import { SearchBar } from './search-bar'

export const App = () => (
  <div className="pt-4 pb-32 bg-primary hp:pb-40 md:bg-red-400 ">
    <div className="flex justify-between px-4 mb-4 ">
      <Link href="/">
        <a className="block hover:underline "><Comikamedia className="h-5" /></a>
      </Link>
      <div className="flex items-center text-xl text-white">
        <MdShoppingCart />
        <MdNotifications />
      </div>
    </div>
    <div className="w-full px-4">
      <SearchBar className="text-white bg-opacity-25 bg-primaryLight" />
    </div>
  </div>
)

export default App
