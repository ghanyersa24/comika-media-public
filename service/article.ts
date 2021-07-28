import useSWR, { } from 'swr'
import { client } from '../lib/clientRaw'
import { swrReturn } from '../res/interface'

const URL = '/article'
// const urlDetail = '/admin/article'
export function Get(search:string):swrReturn {
  const { data, error, mutate } = useSWR(`${URL}?${search}`, client.get)
  return {
    isLoading: (!error && !data),
    error,
    data,
    mutate,
  }
}
export default Get
