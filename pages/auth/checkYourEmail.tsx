import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BackgroundLogin } from '../../components/svg'

export const LoginPage = (): ReactNode => {
  const router = useRouter()

  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex flex-col w-2/3 px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded min-w-max place-content-center">
        <button type="button" className="w-12 py-4 pr-4 text-lg " onClick={() => router.back()}>
          <AiOutlineArrowLeft />
        </button>
        <div className="mb-8">
          <p className="text-xl leading-relaxed text-gray-700">Please</p>
          <p className="text-2xl font-bold leading-loose text-gray-700">Check your Email</p>
        </div>

        <button
          className="px-6 py-4 mt-8 font-bold btn-primary"
          type="button"
        >
          OK
        </button>

      </div>
      <div className="h-screen overflow-hidden bg-primary">
        <BackgroundLogin className="" />
      </div>
    </div>
  )
}
export default LoginPage
