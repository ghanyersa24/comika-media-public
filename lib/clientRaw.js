// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import getConfig from 'next/config'
import { getSession } from 'next-auth/client'

const { serverRuntimeConfig } = getConfig()
export const bashUrl = serverRuntimeConfig.BASH_URL || process.env.NEXT_PUBLIC_BASH_URL

export default async function authHeaderRaw(req) {
  // const token = localStorage.getItem('komika-key')
  let token
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('komika-key')
  } else {
    token = await getSession({ req })?.accessToken
  }
  return {
    Authorization: token,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}

export async function client(url, {
  method, data,
}) {
  return fetch(`${bashUrl}${url}`, {
    method,
    headers: await authHeaderRaw(),
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) { // handling !200
        // statusText itu sub dari response yg berisi terjemahan errornya, misal 401 -> unautorized
        throw response
      }
      return response.json()
        .then((resJson) => { // handling error = true
          // console.log('🚀 ~ file: client.js ~ line 23 ~ .then ~ response', response)
          if (resJson.error) {
            throw resJson
          }
          return resJson
        })
    })
    .catch(async (err) => {
      try {
        // jika ini berhasil, berarti kesalahan dari respone!oke
        const error = JSON.parse(await err.text().then((text) => text))
        return Promise.reject(error)
      } catch (error) {
        return Promise.reject(err)
      }
    })
}

client.get = (url, data, ...customConfig) => client(url, { method: 'GET', data, ...customConfig })
client.getData = (url, data, ...customConfig) => client(url, { method: 'GET', data, ...customConfig })

client.graphql = (url, data, ...customConfig) => client(url, { method: 'GET', data, ...customConfig })

client.post = (url, data, ...customConfig) => client(url, { method: 'POST', data, ...customConfig })
client.patch = (url, data, ...customConfig) => client(url, { method: 'PATCH', data, ...customConfig })
client.put = (url, data, ...customConfig) => client(url, { method: 'PUT', data, ...customConfig })
client.delete = (url, data, ...customConfig) => client(url, { method: 'DELETE', data, ...customConfig })
