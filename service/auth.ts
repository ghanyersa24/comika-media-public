import { client } from '../lib/clientRaw'
import { BaseFetch, ForgetPassword, Signup as SignUpType } from '../res/interface'

// const urlDetail = '/admin/article'
export const SignUp = async (postData: SignUpType) :Promise <BaseFetch> => {
  const data = await client.post('/account/signup', postData)
  return data
}
export const ResetPassword = async (postData: ForgetPassword) :Promise <BaseFetch> => {
  const data = await client.post('/account/reset-password', postData)
  return data
}
export const CreateResetPassword = async (email:string) :Promise <any> => {
  const data = await client.get(`/account/reset-password/${email}`)
  return data
}

export default SignUp
