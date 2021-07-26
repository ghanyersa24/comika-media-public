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
    <>Keluar...</>
  )
}

export default Signout
