import Link from 'next/link'
import { MdShoppingCart, MdNotifications } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import Router from 'next/router'
import React, { useState } from 'react'
import { ComikamediaThin } from '../../svg'

export const App = () => {
  const [search, setSearch] = useState('a')
  const handleSubmit = (e) => {
    e.preventDefault()
    Router.push(`/search/${search}`)
  }

  return (
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
        <div className="flex items-center justify-start  pl-3  bg-primaryLight bg-opacity-25 rounded">
          <form className="flex items-center justify-end w-full " onSubmit={handleSubmit}>
            <button type="submit" className="">
              <AiOutlineSearch className="text-white text-2xl" />
            </button>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              className="ml-2 text-base bg-transparent  leading-normal border-transparent focus:ring-0 text-white w-full h-9"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
export default App
