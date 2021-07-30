import Link from 'next/link'
import { MdShoppingCart, MdNotifications } from 'react-icons/md'
import React from 'react'
import { ComikamediaThin } from '../../svg'
import { SearchBar } from './search-bar'

export const App = () => (
  <div className="bg-primary hp:pb-40 md:bg-red-400 pb-32 pt-4 ">
    <div className="flex justify-between mb-4 px-4 ">
      <Link href="/">
        <a className="hover:underline block "><ComikamediaThin className="h-9" /></a>
      </Link>
      <div className="flex  text-xl text-white items-center">
        <MdShoppingCart />
        <MdNotifications />
      </div>
    </div>
    <div className="w-full px-4">
      <SearchBar className="bg-primaryLight bg-opacity-25 text-white" />
    </div>
  </div>
)

export default App
