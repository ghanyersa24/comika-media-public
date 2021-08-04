import {
  signOut,
} from 'next-auth/client'
import React, { useEffect } from 'react'

export const Signout = () => {
  signOut({ callbackUrl: '/' })
  useEffect(() => {
    localStorage.setItem('komika-key', null)
  }, [])
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative h-12 w-12 text-primary text-3xl">
        <span className="animate-ping absolute ">
          Logout...
        </span>
        {/* <span className="relative inline-flex rounded-full h-8 w-8 bg-primary " /> */}
      </div>
    </div>
  )
}

export default Signout
