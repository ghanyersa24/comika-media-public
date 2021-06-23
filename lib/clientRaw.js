// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
export const bashUrl = serverRuntimeConfig.BASH_URL
console.log('🚀 ~ file: clientRaw.js ~ line 6 ~ bashUrl', bashUrl)

export default function authHeaderRaw() {
  // const token = localStorage.getItem('komika-key')
  return {
    Authorization: 'token',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}

export function client(url, {
  method, data, token = '', ...customConfig
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

client.get = function (url, data, ...customConfig) {
  console.log('🚀 ~ file: client.js ~ line 35 ~ url', url)
  return client(url, { method: 'GET', data, ...customConfig })
}
client.getData = function (url, data, ...customConfig) {
  console.log('🚀 ~ file: client.js ~ line 35 ~ url', url)
  return client(url, { method: 'GET', data, ...customConfig })
}

client.graphql = function (url, data, ...customConfig) {
  return client(url, { method: 'GET', data, ...customConfig })
}

client.post = function (url, data, ...customConfig) {
  return client(url, { method: 'POST', data, ...customConfig })
}
client.patch = function (url, data, ...customConfig) {
  return client(url, { method: 'PATCH', data, ...customConfig })
}
client.put = function (url, data, ...customConfig) {
  return client(url, { method: 'PUT', data, ...customConfig })
}
client.delete = function (url, data, ...customConfig) {
  return client(url, { method: 'DELETE', data, ...customConfig })
}
