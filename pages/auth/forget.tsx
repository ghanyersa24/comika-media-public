import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import { CreateResetPassword } from '../../service/auth'
import { BackgroundLogin } from '../../components/svg'

export const LoginPage = (): ReactNode => {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitLogin = async (loginData) => {
    try {
      setIsLoading(true)
      await CreateResetPassword(loginData)
      router.push('/auth/checkYourEmail')
      setIsLoading(false)
    } catch (error) {
      setErrorMsg(error.msg)
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-2  min-h-screen">
      <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col min-w-max w-2/3 mx-auto place-content-center">
        <button type="button" className="py-4 pr-4 w-12 text-lg " onClick={() => router.back()}>
          <AiOutlineArrowLeft />
        </button>
        <div className="mb-8">
          <p className="text-3xl font-medium leading-9 text-gray-800">Forgot Password </p>
          <p className="text-lg font-medium leading-9 text-gray-800 text-opacity-50">
            Enter registered email to reset password
          </p>
        </div>

        <div className="mb-4">
          {errorMsg ? (
            <div className="bg-red-200 p-2 mb-4 rounded">
              {errorMsg}
            </div>
          ) : null}
          <label
            htmlFor="email"
            className="block text-gray-800  font-bold mb-2 mt-4 "
          >
            Email
            <input
              className="w-full py-2 px-3  mt-3"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              name="email"
              id="email"
            />
          </label>
        </div>

        <button
          className="btn-primary font-bold px-6 py-4 mt-8 flex  justify-center"
          onClick={() => handleSubmitLogin(email)}
          type="button"
        >
          {isLoading && <FaSpinner className="animate-spin h-5 w-5 mr-3" /> }
          Send
        </button>

      </div>
      <div className="bg-primary overflow-hidden h-screen">
        <BackgroundLogin className="" />
      </div>
    </div>
  )
}
export default LoginPage
