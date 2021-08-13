import React, { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaSpinner } from 'react-icons/fa'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { ComikamediaNavbar, BackgroundLogin } from '../../components/svg'
import { ForgetPassword as ForgetPasswordType } from '../../res/interface'
import { ResetPassword } from '../../service/auth'

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
  const { token } = router.query
  console.log('🚀 ~ file: [token].tsx ~ line 20 ~ LoginPage ~ token', token as string)

  const [ForgetPassword, setForgetPassword] = useState<ForgetPasswordType >()
  useEffect(() => {
    if (token) setForgetPassword({ ...ForgetPassword, token: token as string })
  }, [token])
  const [errorMsg, setErrorMsg] = useState<string>(null)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      type, checked, name, value,
    } = e.target
    setForgetPassword({ ...ForgetPassword, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)

    try {
      await ResetPassword(ForgetPassword)
      setIsLoading(false)
      router.push('/auth/signin')
    } catch (error) {
      setErrorMsg(error.msg)
      setIsLoading(false)
    }
  }
  return (
    <div className="grid lg:grid-cols-2  min-h-screen relative bg-primary lg:bg-white">
      <BackgroundLogin className="block lg:hidden" />
      <form onSubmit={handleSubmitLogin} className="bg-white absolute bottom-0 lg:static rounded-t-2xl lg:rounded px-8 pt-6 pb-8 lg:mb-4 flex flex-col lg:min-w-max w-full lg:w-2/3 mx-auto place-content-center">
        <div className="hidden  lg:flex mb-8">
          <ComikamediaNavbar className="w-2/3" />
        </div>
        <div className="mb-8">
          <p className="text-3xl font-medium leading-9 text-gray-800">Lupa Password </p>
          <p className="text-lg font-medium leading-9 text-gray-800 text-opacity-50">
            Jangan lupa password lagi ya
          </p>
        </div>

        <div className="mb-4">
          {errorMsg ? (
            <div className="bg-red-200 p-2 mb-4 rounded">{errorMsg}</div>
          ) : null}
          <label
            htmlFor="Password"
            className="block text-gray-800  font-bold mb-2 mt-4 relative"
          >
            Password
            <input
              className="w-full py-2 px-3  mt-3"
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
            htmlFor="Password"
            className="block text-gray-800  font-bold mb-2 mt-4 relative"
          >
            Konfirmasi Password
            <input
              className="w-full py-2 px-3  mt-3"
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
          className="btn-primary font-bold px-6 py-4 mt-8 flex  justify-center"
          type="submit"
        >
          {isLoading && <FaSpinner className="animate-spin h-5 w-5 mr-3" /> }
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
