import React, {
  ReactNode, useState,
} from 'react'
import {
  getProviders,
} from 'next-auth/client'
import { useRouter } from 'next/router'
import {
  FaSpinner,
} from 'react-icons/fa'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BackgroundLogin } from '../../components/svg'

import { CreateResetPassword } from '../../service/auth'
import { BackButtonAbsoluteMobile } from '../../components/button/back-button-absolute-mobile'

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
  const [email, setEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await CreateResetPassword(email)
      router.push('/auth/checkYourEmail')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Head>
        <title>
          Comika Media - Lupa Password
        </title>
        {/* <meta property="og:image" content={post.ogImage.url} /> */}
      </Head>
      <div className="relative grid min-h-screen lg:grid-cols-2 bg-primary lg:bg-white">
        <BackgroundLogin className="fixed block lg:hidden" />
        <BackButtonAbsoluteMobile />
        <form onSubmit={handleSubmit} className="absolute bottom-0 flex flex-col w-full px-8 pt-6 pb-8 mx-auto overflow-auto bg-white lg:static rounded-t-2xl lg:rounded lg:mb-4 lg:w-2/3 place-content-center">
          <button type="button" className="hidden w-12 py-4 pr-4 text-lg md:block " onClick={() => router.back()}>
            <AiOutlineArrowLeft />
          </button>

          <div className="mb-8">
            <p className="text-3xl font-medium leading-9 text-gray-800">Lupa </p>
            <p className="text-lg font-medium leading-9 text-gray-800 text-opacity-50">
              Password ?
            </p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mt-4 mb-2 font-bold text-gray-800 "
            >
              Email
              <input
                className="w-full px-3 py-2 mt-3"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
                id="email"
              />
            </label>
          </div>

          <button
            className="flex justify-center px-6 py-4 mt-8 font-bold btn-primary"
            onClick={handleSubmit}
            type="submit"
          >
            {isLoading && <FaSpinner className="w-5 h-5 mr-3 animate-spin" /> }
            Send
          </button>
        </form>
        <div className="relative hidden h-auto overflow-hidden bg-primary lg:block">
          <BackgroundLogin className="absolute " />
        </div>
      </div>
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
export default LoginPage
