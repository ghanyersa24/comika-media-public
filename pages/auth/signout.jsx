import {
  signOut,
} from 'next-auth/client'
import React, { useEffect } from 'react'

export const Signout = () => {
  signOut({ callbackUrl: '/' })
  useEffect(() => {
    localStorage.removeItem('komika-key')
  }, [])
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-12 h-12 text-3xl text-primary">
        <span className="absolute animate-ping ">
          Logout...
        </span>
        {/* <span className="relative inline-flex w-8 h-8 rounded-full bg-primary " /> */}
      </div>
    </div>
  )
}

export default Signout
