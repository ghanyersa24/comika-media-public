import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import { FaSpinner } from 'react-icons/fa'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { BackgroundLogin } from '../../components/svg'
import { client } from '../../lib/clientRaw'

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
  const [postData, setLogin] = useState<{password:string, passwordConfirmation:string} | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>(router?.query?.errorNextAuth as string)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // if (session) router.push('/')
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      type, checked, name, value,
    } = e.target
    setLogin({ ...postData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)
    try {
      await client.put('/account/change-password', postData)
      setIsLoading(false)
      router.back()
    } catch (error) {
      setErrorMsg(error.msg)
      setIsLoading(false)
    }
  }
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2 bg-primary lg:bg-white">
      <BackgroundLogin className="fixed block lg:hidden" />
      <form onSubmit={handleSubmitLogin} className="absolute bottom-0 flex flex-col w-full px-8 pt-6 pb-8 mx-auto overflow-auto bg-white lg:static rounded-t-2xl lg:rounded lg:mb-4 lg:w-2/3 place-content-center">
        <button type="button" className="py-4 pr-4 w-min " onClick={() => router.back()}>
          <BiArrowBack className="text-2xl" />
        </button>
        <div className="mb-8">
          <p className="text-3xl font-medium leading-9 text-gray-800">New your password</p>
          <p className="text-lg font-medium leading-9 text-gray-800 text-opacity-50">
            Enter new Password
          </p>
        </div>

        <div className="mb-4">
          {errorMsg ? (
            <div className="max-w-full p-2 mb-4 bg-red-200 rounded">{errorMsg}</div>
          ) : null}
          <label
            htmlFor="Password"
            className="relative block mt-4 mb-2 font-bold text-gray-800"
          >
            Password
            <input
              className="w-full px-3 py-2 mt-3"
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
          <label
            htmlFor="passwordConfirmation"
            className="relative block mt-4 mb-2 font-bold text-gray-800"
          >
            Konfirmasi Password
            <input
              className="w-full px-3 py-2 mt-3"
              id="passwordConfirmation"
              type={isPasswordShown ? 'text' : 'password'}
              name="passwordConfirmation"
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

        <button
          className="flex justify-center px-6 py-4 mt-8 font-bold btn-primary"
          type="submit"
        >
          {isLoading && <FaSpinner className="w-5 h-5 mr-3 animate-spin" /> }
          Confirm
        </button>

      </form>
      <div className="relative hidden h-auto overflow-hidden bg-primary lg:block">
        <BackgroundLogin className="absolute " />
      </div>
    </div>
  )
}

export default LoginPage
