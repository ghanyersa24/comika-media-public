import useSWR, { } from 'swr'
import { client } from '../lib/clientRaw'
import { swrReturn, Profile, BaseFetch } from '../res/interface'

const URL = '/account/me'
// const urlDetail = '/admin/article'
export function Get():swrReturn {
  const { data, error, mutate } = useSWR(`${URL}`, client.get)
  return {
    isLoading: (!error && !data),
    error,
    data,
    mutate,
  }
}
export default Get

export const UpdateProfile = async (postData: Profile) :Promise <BaseFetch> => {
  const data = await client.put('/account/update-profile', postData)
  return data
}

export const add = async (slug:string, postData: {comment:string}) :Promise <any> => {
  const res = await client.post(`${URL}/${slug}`, postData)
  return res
}
