import { AiOutlineSearch } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import Router, { useRouter } from 'next/router'
import React, { useState } from 'react'

export const SearchBarMobile = ({ onChange, onSubmit, searchValue }) => (
  <form className="flex items-center justify-end w-full " onSubmit={onSubmit}>
    <button type="submit" className="">
      <AiOutlineSearch className=" text-2xl" />
    </button>
    <input
      onChange={onChange}
      value={searchValue}
      type="text"
      className="ml-2 text-base bg-transparent  leading-normal border-transparent focus:ring-0 w-full h-9"
    />
  </form>
)

export const SearchBarDekstop = ({ onChange, onSubmit, searchValue }) => {
  const [isInputOpen, setIsInputOpen] = useState(false)
  return (
    <form
      className="relative mx-auto text-gray-600 mr-0  h-10"
      onMouseOver={() => setIsInputOpen(true)}
      onFocus={() => setIsInputOpen(true)}
      onSubmit={onSubmit}
      // onMouseOut={() => setIsInputOpen(false)}
      onMouseLeave={() => setIsInputOpen(false)}
    >
      {isInputOpen && (
      <input
        className=" border-2 border-gray-300 h-full bg-white px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
        value={searchValue}
        onEmptied={(e) => console.log('x')}
        onChange={onChange}
      />
      )}
      <button
        type="submit"
        className="absolute right-0 mr-4 h-full "
        onClick={onSubmit}
      >
        <div className="flex items-center">
          <FaSearch className="fill-current text-primary text-xl mt-1" />
        </div>
      </button>
    </form>
  )
}

export const SearchBar = ({ className = '', searchValue = '', isMobile = true }) => {
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
      {isMobile
        ? (
          <SearchBarMobile
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={handleSubmit}
            searchValue={search}
          />
        )
        : (
          <SearchBarDekstop
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={handleSubmit}
            searchValue={search}
          />
        )}
    </div>
  )
}

export default SearchBar
