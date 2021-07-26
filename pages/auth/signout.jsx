import {
  signOut,
} from 'next-auth/client'

export const Signout = () => {
  localStorage.setItem('komika-key', null)
  signOut({ callbackUrl: '/' })

  return (
    <>Keluar...</>
  )
}

export default Signout
