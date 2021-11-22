import { AiOutlineSearch } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import Router, { } from 'next/router'
import React, { useState } from 'react'

export const SearchBarMobile = ({ onChange, onSubmit, searchValue }) => (
  <form className="flex items-center justify-end w-full " onSubmit={onSubmit}>
    <button type="submit" className="">
      <AiOutlineSearch className="text-2xl " />
    </button>
    <input
      onChange={onChange}
      value={searchValue}
      type="text"
      className="w-full ml-2 text-base leading-normal bg-transparent border-transparent focus:ring-0 h-9"
    />
  </form>
)

export const SearchBarDekstop = ({ onChange, onSubmit, searchValue }) => {
  const [isInputOpen, setIsInputOpen] = useState(false)
  return (
    <form
      className="relative h-10 mx-auto mr-0 text-gray-600"
      onMouseOver={() => setIsInputOpen(true)}
      onFocus={() => setIsInputOpen(true)}
      onSubmit={onSubmit}
      // onMouseOut={() => setIsInputOpen(false)}
      onMouseLeave={() => setIsInputOpen(false)}
    >
      {isInputOpen && (
      <input
        className="absolute right-0 h-full px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
        value={searchValue}
        onChange={onChange}
      />
      )}
      <button
        type="submit"
        className="absolute right-0 h-full mx-2 "
        onClick={onSubmit}
      >
        <div className="flex items-center">
          <FaSearch className="text-xl fill-current text-primary" />
        </div>
      </button>
    </form>
  )
}

export const SearchBar = ({ className = '', searchValue = '', isMobile = true }) => {
  const [search, setSearch] = useState(searchValue)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (search) {
      Router.push(`/article?search=${search}`)
    }
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
