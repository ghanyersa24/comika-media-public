import {
  signOut,
} from 'next-auth/client'

export const Signout = () => {
  signOut({ callbackUrl: '/' })

  return (
    <>Keluar...</>
  )
}

export default Signout
