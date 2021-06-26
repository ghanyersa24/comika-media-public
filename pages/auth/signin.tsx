import React, { ReactNode, useState } from 'react'
import { signIn } from 'next-auth/client'
import { ComikamediaNavbar, BackgroundLogin } from '../../components/svg'
import { Login } from '../../res/interface'

export const LoginPage = ():ReactNode => {
  const [login, setLogin] = useState<Login|null>(null)
  const [, set] = useState();
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      type, checked, name, value,
    } = e.target
    setLogin({ ...login, [name]: type === 'checkbox' ? checked : value })
  }
  const handleSubmitLogin = (loginData) => {
    signIn('credentials', { redirect: false, ...loginData })
      .then((result) => {
        console.log('🚀 ~ file: signin.tsx ~ line 17 ~ .then ~ result', result)
      })
      .catch((error) => {
        console.log('🚀 ~ file: signin.tsx ~ line 17 ~ handleSubmitLogin ~ error', error)
      })
  }

  return (
    <div className="grid grid-cols-2  min-h-screen">
      <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-2/3 mx-auto place-content-center">
        <div className="flex mb-8">
          <ComikamediaNavbar className="w-2/3" />
        </div>
        <div className="mb-8">
          <p className="text-3xl font-medium leading-9 text-gray-800">Login </p>
          <p className="text-lg font-medium leading-9 text-gray-800 text-opacity-50">Log in to Comicamedia</p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-800  font-bold mb-2 "
          >
            Email
            <input
              className=" appearance-none border rounded w-full py-2 px-3 text-grey-darker mt-3"
              type="text"
              onChange={handleChangeValue}
              placeholder="Email"
              name="email"
              id="email"
            />
          </label>
        </div>

        <div className="mb-4">
          <label
            htmlFor="Password"
            className="block text-gray-800  font-bold mb-2"
          >
            Password
            <input
              className=" appearance-none border rounded w-full py-2 px-3 text-grey-darker mt-3"
              id="password"
              type="password"
              name="password"
              onChange={handleChangeValue}
              placeholder="******************"
            />
          </label>
        </div>

        <div className="flex items-center justify-between mt-4">
          <label
            htmlFor="rememberMe"
            className="block text-gray-800  font-bold "
          >
            <input
              type="checkbox"
              id="rememberMe"
              className="leading-loose mr-2"
            />
            Remember Me

          </label>
          <a className="inline-block align-baseline font-bold  text-blue hover:text-blue-darker" href="/lupa-password">
            Forgot Password?
          </a>

        </div>
        <button
          className="bg-primary hover:bg-primaryDark text-white font-bold px-6 py-4 rounded mt-8"
          onClick={() => handleSubmitLogin(login)}
          type="button"
        >
          Sign In
        </button>

      </div>
      <div className="bg-primary overflow-hidden h-screen">
        <BackgroundLogin className="" />
      </div>
    </div>
  )
}
export default LoginPage
