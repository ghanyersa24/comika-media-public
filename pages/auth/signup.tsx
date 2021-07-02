import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import { ComikamediaNavbar, BackgroundLogin } from '../../components/svg'
import { Signup } from '../../res/interface'
import { SignUp } from '../../service/auth'
// enum Severity {
//   error='bg-red-200',
//   success='bg-green-200',
// }
// type ErrorMsg ={
//   0:Severity,
//   1:string
// }
export const LoginPage = ():ReactNode => {
  const router = useRouter()
  const [signup, setSignup] = useState<Signup|null>(null)
  const [errorMsg, setErrorMsg] = useState<string>(null)
  const [submitSignupStatus, setSubmitSignupStatus] = useState('')
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      type, checked, name, value,
    } = e.target
    setSignup({ ...signup, [name]: type === 'checkbox' ? checked : value })
  }
  const handleSubmitSignUp = async (loginData) => {
    setErrorMsg('')
    try {
      setSubmitSignupStatus('loading')
      const result = await SignUp(loginData)
      console.log('🚀 ~ file: signup.tsx ~ line 29 ~ handleSubmitSignUp ~ result', result)
      setSubmitSignupStatus('success')
      router.push('/auth/signin')
    } catch (error) {
      setErrorMsg(error.msg)
      setSubmitSignupStatus('error')
    }
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
          {errorMsg ? (
            <div className="bg-red-200 p-2 mb-4 rounded">
              {errorMsg}
            </div>
          ) : null}
          <label
            htmlFor="name"
            className="block text-gray-800  font-bold mb-2 "
          >
            Nama Lengkap
            <input
              className="w-full py-2 px-3  mt-3"
              type="text"
              onChange={handleChangeValue}
              placeholder="Nama Lengkap"
              name="name"
              id="name"
            />
          </label>
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
            className="block text-gray-800  font-bold mb-2 mt-4"
          >
            Password
            <input
              className="w-full py-2 px-3  mt-3"
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
            className="block  text-gray-800  font-bold "
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
          className="btn-primary font-bold px-6 py-4 mt-8"
          onClick={() => handleSubmitSignUp(signup)}
          type="button"
          disabled={submitSignupStatus === 'loading'}
        >
          {submitSignupStatus === 'loading' ? 'loading...' : 'Sign Up'}
        </button>

      </div>
      <div className="bg-primary overflow-hidden h-screen">
        <BackgroundLogin className="" />
      </div>
    </div>
  )
}
export default LoginPage
