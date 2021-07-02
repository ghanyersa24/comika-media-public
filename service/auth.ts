import { client } from '../lib/clientRaw'
import { BaseFetch } from '../res/interface'

// const urlDetail = '/admin/article'
export const SignUp = async (postData: string[]) :Promise <BaseFetch> => {
  const data = await client.post('/account/signup', postData)
  return data
}
export default SignUp
