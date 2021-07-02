import useSWR, { } from 'swr'
import { client } from '../lib/clientRaw'
import { swrReturn } from '../res/interface'

const URL = '/comment'
// const urlDetail = '/admin/article'
export function Get(slug:string):swrReturn {
  const { data, error, mutate } = useSWR(`${URL}/${slug}`, client.get)
  return {
    isLoading: (!error && !data),
    error,
    data,
    mutate,
  }
}
export default Get

export const add = async (slug:string, postData: {comment:string}) :Promise <any> => {
  const res = await client.post(`${URL}/${slug}`, postData)
  return res
}
