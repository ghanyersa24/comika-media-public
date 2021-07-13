import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BackgroundLogin } from '../../components/svg'

export const LoginPage = (): ReactNode => {
  const router = useRouter()

  return (
    <div className="grid grid-cols-2  min-h-screen">
      <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col min-w-max w-2/3 mx-auto place-content-center">
        <button type="button" className="py-4 pr-4 w-12 text-lg " onClick={() => router.back()}>
          <AiOutlineArrowLeft />
        </button>
        <div className="mb-8">
          <p className="text-xl leading-relaxed text-gray-700">Please</p>
          <p className="text-2xl font-bold leading-loose text-gray-700">Check your Email</p>
        </div>

        <button
          className="btn-primary font-bold px-6 py-4 mt-8"
          type="button"
        >
          OK
        </button>

      </div>
      <div className="bg-primary overflow-hidden h-screen">
        <BackgroundLogin className="" />
      </div>
    </div>
  )
}
export default LoginPage
