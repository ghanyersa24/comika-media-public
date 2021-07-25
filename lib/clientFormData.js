// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

import {
  getSession,
} from 'next-auth/client'
import { BASH_URL } from '../res/string'

export const bashUrl = BASH_URL

// import { selectToken } from './slices/authSlice'
// import { useDispatch ,useSelector} from 'react-redux'

export default async function authHeader(tokenParams) {
  let token
  if (typeof window !== 'undefined') { // client side
    if (localStorage.getItem('komika-key') !== 'undefined') {
      console.log("🚀 ~ file: clientRaw.js ~ line 15 ~ authHeaderRaw ~ localStorage.getItem('komika-key') ", localStorage.getItem('komika-key'))
      token = localStorage.getItem('komika-key')
    } else {
      const session = await getSession()
      token = session?.accessToken
      localStorage.setItem('komika-key', token)
    }
  } else if (tokenParams) { // server side with getserversideprops
    token = tokenParams
  }
  return {
    Authorization: token,
  }
}

export function client(url, {
  method, data, ...customConfig
}) {
  console.log('🚀 ~ file: client.js ~ line 7 ~ client ~ url', url)
  const token = customConfig?.[0]?.token
  return fetch(`${bashUrl}${url}`, {
    method,
    headers: authHeader(token),
    body: data,
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
client.put = (url, data, ...customConfig) => {
  const formData = new FormData()
  Object.keys(data).forEach((key) => formData.append(key, data[key]))
  return client(url, { method: 'PUT', data: formData, ...customConfig })
}
client.post = (url, data, ...customConfig) => {
  const formData = new FormData()
  Object.keys(data).forEach((key) => formData.append(key, data[key]))
  return client(url, { method: 'POST', data: formData, ...customConfig })
}
client.patch = (url, data, ...customConfig) => client(url, { method: 'PATCH', data, ...customConfig })
client.delete = (url, data, ...customConfig) => client(url, { method: 'DELETE', data, ...customConfig })
