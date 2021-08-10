import React, { ReactNode, useState } from 'react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaSpinner } from 'react-icons/fa'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { ComikamediaNavbar, BackgroundLogin } from '../../components/svg'
import { Login } from '../../res/interface'
// enum Severity {
//   error='bg-red-200',
//   success='bg-green-200',
// }
// type ErrorMsg ={
//   0:Severity,
//   1:string
// }
export const LoginPage = (): ReactNode => {
  const router = useRouter()
  const [login, setLogin] = useState<Login | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>(null)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      type, checked, name, value,
    } = e.target
    setLogin({ ...login, [name]: type === 'checkbox' ? checked : value })
  }
  const handleSubmitLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)
    const { callbackUrl } = router.query
    const callbackUrlString = callbackUrl as string
    signIn('credentials', { redirect: false, ...login, callbackUrlString }).then(
      (result) => {
        console.log('🚀 ~ file: signin.tsx ~ line 18 ~ .then ~ result', result)
        if (result?.error !== null) {
          setErrorMsg(result.error)
          setIsLoading(false)
        } else if (callbackUrl) router.push(`${callbackUrl}`)
        else router.push('/')
      },
    )
  }
  return (
    <div className="grid lg:grid-cols-2  min-h-screen relative bg-primary lg:bg-white">
      <BackgroundLogin className="block lg:hidden" />
      <form onSubmit={handleSubmitLogin} className="bg-white absolute bottom-0 lg:static rounded-t-2xl lg:rounded px-8 pt-6 pb-8 lg:mb-4 flex flex-col lg:min-w-max w-full lg:w-2/3 mx-auto place-content-center">
        <div className="hidden  lg:flex mb-8">
          <ComikamediaNavbar className="w-2/3" />
        </div>
        <div className="mb-8">
          <p className="text-3xl font-medium leading-9 text-gray-800">Login </p>
          <p className="text-lg font-medium leading-9 text-gray-800 text-opacity-50">
            Log in to Comicamedia
          </p>
        </div>

        <div className="mb-4">
          {errorMsg ? (
            <div className="bg-red-200 p-2 mb-4 rounded">{errorMsg}</div>
          ) : null}
          <label
            htmlFor="email"
            className="block text-gray-800  font-bold mb-2 mt-4 "
          >
            Email
            <input
              className="w-full py-2 px-3  mt-3"
              type="text"
              onChange={handleChangeValue}
              placeholder="Email"
              name="email"
              id="email"
            />
          </label>
          <label
            htmlFor="Password"
            className="block text-gray-800  font-bold mb-2 mt-4 relative"
          >
            Password
            <input
              className="w-full py-2 px-3  mt-3"
              id="password"
              type={isPasswordShown ? 'text' : 'password'}
              name="password"
              onChange={handleChangeValue}
              placeholder="******************"
            />
            <button
              type="button"
              className="absolute right-4 bottom-3"
              onClick={() => setIsPasswordShown(!isPasswordShown)}
            >
              {isPasswordShown ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </label>
        </div>

        <div className="flex items-center justify-between mt-4">
          <label
            htmlFor="rememberMe"
            className="block  text-gray-800  font-bold "
          >
            <input
              type="checkbox"
              id="rememberMe"
              className="leading-loose mr-2"
            />
            Remember Me
          </label>
          <Link href="/auth/forget">
            <a
              className="inline-block align-baseline font-bold  text-blue hover:text-blue-darker"
            >
              Forgot Password?
            </a>
          </Link>

        </div>
        <button
          className="btn-primary font-bold px-6 py-4 mt-8 flex  justify-center"
          type="submit"
        >
          {isLoading && <FaSpinner className="animate-spin h-5 w-5 mr-3" /> }
          Sign In
        </button>
      </form>
      <div className="bg-primary overflow-hidden hidden lg:block h-screen">
        <BackgroundLogin className="" />
      </div>
    </div>
  )
}
export default LoginPage
