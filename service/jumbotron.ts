/* eslint-disable no-unused-vars */
import useSWR, { useSWRInfinite, mutate as mutateSwr } from 'swr'
import { client } from '../lib/clientRaw'
import { swrReturn } from '../res/interface'

const URL = '/jumbotron'
// const urlDetail = '/admin/article'
export function Get():swrReturn {
  const { data, error, mutate } = useSWR(URL, client.get)
  return {
    isLoading: (!error && !data),
    error,
    data,
    mutate,
  }
}
export default Get
