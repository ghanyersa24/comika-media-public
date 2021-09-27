import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import { FaSpinner } from 'react-icons/fa'
import Link from 'next/link'
import Head from 'next/head'
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
  const [submitSignupStatus, setSubmitSignupStatus] = useState('')
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      type, checked, name, value,
    } = e.target
    setSignup({ ...signup, [name]: type === 'checkbox' ? checked : value })
  }
  const handleSubmitSignUp = async (e) => {
    e.preventDefault()
    try {
      setSubmitSignupStatus('loading')
      await SignUp(signup)
      setSubmitSignupStatus('success')
      router.push('/auth/signin')
    } catch (error) {
      setSubmitSignupStatus('error')
    }
  }

  return (
    <>
      <Head>
        <title>
          Comika Media - Signup
        </title>
        {/* <meta property="og:image" content={post.ogImage.url} /> */}
      </Head>
      <div className="relative grid min-h-screen lg:grid-cols-2 bg-primary lg:bg-white">
        <BackgroundLogin className="block lg:hidden" />
        <form onSubmit={handleSubmitSignUp} className="absolute bottom-0 left-0 right-0 flex flex-col px-8 pt-6 pb-8 mx-auto bg-white lg:static rounded-t-2xl lg:rounded lg:mb-4 lg:min-w-max lg:w-2/3 place-content-center">
          <div className="hidden mb-8 lg:flex">
            <ComikamediaNavbar className="w-2/3" />
          </div>
          <div className="mb-8">
            <p className="text-3xl font-medium leading-9 text-gray-800">Sign Up </p>
            <p className="text-lg font-medium leading-9 text-gray-800 text-opacity-50">Sign up with your accunt to continue !</p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 font-bold text-gray-800 "
            >
              Nama Lengkap
              <input
                className="w-full px-3 py-2 mt-3"
                type="text"
                onChange={handleChangeValue}
                placeholder="Nama Lengkap"
                name="name"
                id="name"
              />
            </label>
            <label
              htmlFor="email"
              className="block mt-4 mb-2 font-bold text-gray-800 "
            >
              Email
              <input
                className="w-full px-3 py-2 mt-3"
                type="text"
                onChange={handleChangeValue}
                placeholder="Email"
                name="email"
                id="email"
              />
            </label>
            <label
              htmlFor="Password"
              className="block mt-4 mb-2 font-bold text-gray-800"
            >
              Password
              <input
                className="w-full px-3 py-2 mt-3"
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
              className="block font-bold text-gray-800 "
            >
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2 leading-loose"
              />
              Remember Me

            </label>
            <a className="inline-block font-bold align-baseline text-blue hover:text-blue-darker" href="/lupa-password">
              Forgot Password?
            </a>

          </div>
          <button
            className="flex justify-center px-6 py-4 mt-8 font-bold btn-primary"
            type="submit"
          >
            {submitSignupStatus === 'loading' && <FaSpinner className="w-5 h-5 mr-3 animate-spin" /> }
            Submit
          </button>
          <p className="py-4 text-sm leading-relaxed text-center text-gray-500">
            Have an account?
            <Link href="/auth/signin">
              <a className="font-bold text-primary"> Sign In</a>
            </Link>
          </p>

        </form>
        <div className="hidden h-screen overflow-hidden bg-primary lg:block">
          <BackgroundLogin className="" />
        </div>
      </div>
    </>
  )
}
export default LoginPage
