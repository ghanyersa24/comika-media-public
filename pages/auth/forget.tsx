import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import { CreateResetPassword } from '../../service/auth'
import { BackgroundLogin } from '../../components/svg'

export const LoginPage = (): ReactNode => {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitLogin = async (loginData) => {
    try {
      setIsLoading(true)
      await CreateResetPassword(loginData)
      router.push('/auth/checkYourEmail')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex flex-col w-2/3 px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded min-w-max place-content-center">
        <button type="button" className="w-12 py-4 pr-4 text-lg " onClick={() => router.back()}>
          <AiOutlineArrowLeft />
        </button>
        <div className="mb-8">
          <p className="text-3xl font-medium leading-9 text-gray-800">Forgot Password </p>
          <p className="text-lg font-medium leading-9 text-gray-800 text-opacity-50">
            Enter registered email to reset password
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
          onClick={() => handleSubmitLogin(email)}
          type="button"
        >
          {isLoading && <FaSpinner className="w-5 h-5 mr-3 animate-spin" /> }
          Send
        </button>

      </div>
      <div className="h-screen overflow-hidden bg-primary">
        <BackgroundLogin className="" />
      </div>
    </div>
  )
}
export default LoginPage
