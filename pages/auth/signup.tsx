import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import { FaSpinner } from 'react-icons/fa'
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
  const handleSubmitSignUp = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    try {
      setSubmitSignupStatus('loading')
      await SignUp(signup)
      setSubmitSignupStatus('success')
      router.push('/auth/signin')
    } catch (error) {
      setErrorMsg(error.msg)
      setSubmitSignupStatus('error')
    }
  }

  return (
    <div className="grid lg:grid-cols-2  min-h-screen relative bg-primary lg:bg-white">
      <BackgroundLogin className="block lg:hidden" />
      <form onSubmit={handleSubmitSignUp} className="bg-white absolute right-0 left-0 bottom-0 lg:static rounded-t-2xl lg:rounded px-8 pt-6 pb-8 lg:mb-4 flex flex-col lg:min-w-max  lg:w-2/3 mx-auto place-content-center">
        <div className="hidden  lg:flex mb-8">
          <ComikamediaNavbar className="w-2/3" />
        </div>
        <div className="mb-8">
          <p className="text-3xl font-medium leading-9 text-gray-800">Sign Up </p>
          <p className="text-lg font-medium leading-9 text-gray-800 text-opacity-50">Sign up with your accunt to continue !</p>
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
          className="btn-primary font-bold px-6 py-4 mt-8 flex  justify-center"
          type="submit"
        >
          {submitSignupStatus === 'loading' && <FaSpinner className="animate-spin h-5 w-5 mr-3" /> }
          Submit
        </button>

      </form>
      <div className="bg-primary overflow-hidden hidden lg:block h-screen">
        <BackgroundLogin className="" />
      </div>
    </div>
  )
}
export default LoginPage
