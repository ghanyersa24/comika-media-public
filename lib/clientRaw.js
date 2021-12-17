// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import getConfig from 'next/config'
import {
  getSession,
} from 'next-auth/client'
import Router from 'next/router'
import { toast } from 'react-toastify'

const { serverRuntimeConfig } = getConfig()
export const bashUrl = serverRuntimeConfig.BASH_URL || process.env.NEXT_PUBLIC_BASH_URL

export default async function authHeader(tokenParams) {
  let token
  if (typeof window !== 'undefined') { // client side
    if (localStorage.getItem('komika-key')) {
      token = localStorage.getItem('komika-key')
    } else {
      const session = await getSession()
      token = session?.accessToken
      if (token) localStorage.setItem('komika-key', token)
    }
  } else if (tokenParams) { // server side with getserversideprops
    token = tokenParams
  }
  return {
    Authorization: token,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}

export async function client(url, {
  method, data, ...customConfig
}) {
  const tokenFromSSR = customConfig?.[0]?.token
  const header = await authHeader(tokenFromSSR)
  return fetch(`${bashUrl}${url}`, {
    method,
    headers: header,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) { // handling !200
        // statusText itu sub dari response yg berisi terjemahan errornya, misal 401 -> unautorized
        throw response
      }
      return response.json()
        .then((resJson) => { // handling error = true
          if (resJson.error) {
            throw resJson
          }
          return resJson
        })
    })
    .catch(async (err) => {
      const isTokenError = err.status === 403 || err.status === 401
      if (isTokenError && header.Authorization) {
        Router.push('/auth/signout')
      }
      try {
        const error = JSON.parse(await err.text().then((text) => text))
        if (error?.msg && !isTokenError) {
          toast.error(error.msg, {
            position: 'bottom-right',
            autoClose: (error.msg.length / 5) * 1000,
          })
        }
        // jika ini berhasil, berarti kesalahan dari respone!oke
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
