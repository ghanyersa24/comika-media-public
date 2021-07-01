// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
export const bashUrl = serverRuntimeConfig.BASH_URL || process.env.NEXT_PUBLIC_BASH_URL

export default function authHeaderRaw() {
  // const token = localStorage.getItem('komika-key')
  return {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNTkwM2I2ODctZjI3OC00ZGNmLThjOGEtNjVlNWRhYmJhNTNmIiwibmFtZSI6IkdoYW55IEFFIiwiZW1haWwiOiJnaGFueWFlQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwicGhvbmUiOm51bGwsImFkZHJlc3MiOm51bGwsInBvc3RhbENvZGUiOm51bGwsImRpc3RyaWN0IjpudWxsLCJjaXR5IjpudWxsLCJwcm92aW5jZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMS0wNy0wMVQyMTo1NTo1Ny4wMzlaIiwidXBkYXRlZEF0IjoiMjAyMS0wNy0wMVQyMTo1NTo1Ny4wMzlaIiwiZGVsZXRlZEF0IjpudWxsfSwiaWF0IjoxNjI1MTc2NTY3LCJleHAiOjE2MjUyNjI5Njd9.K_v7jDwpjK_1XYCZM7FE9k8ODyaxahTG06q65RWzkh8',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}

export function client(url, {
  method, data,
}) {
  return fetch(`${bashUrl}${url}`, {
    method,
    headers: authHeaderRaw(),
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
