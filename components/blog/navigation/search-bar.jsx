import { AiOutlineSearch } from 'react-icons/ai'
import Router, { useRouter } from 'next/router'
import React, { useState } from 'react'

export const SearchBar = ({ className = '', searchValue = '' }) => {
  const router = useRouter()
  const urlComponent = router.route.split('/')
  const urlType = urlComponent?.[2] || ''
  console.log('🚀 ~ file: search-bar.jsx ~ line 9 ~ SearchBar ~ urlType', urlType)
  const [search, setSearch] = useState(searchValue)
  const handleSubmit = (e) => {
    e.preventDefault()
    Router.push(`/article/search/${search}`)
  }
  return (
    <div className={`flex items-center justify-start  pl-3 rounded ${className}`}>
      <form className="flex items-center justify-end w-full " onSubmit={handleSubmit}>
        <button type="submit" className="">
          <AiOutlineSearch className=" text-2xl" />
        </button>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          className="ml-2 text-base bg-transparent  leading-normal border-transparent focus:ring-0 w-full h-9"
        />
      </form>
    </div>
  )
}

export default SearchBar
