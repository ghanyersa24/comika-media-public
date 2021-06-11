// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import authHeader from './auth-header'
import { BASH_URL } from '../res/string'

export const bashUrl = BASH_URL
export function client(url, {
  method, data, token = '', ...customConfig
}) {
  console.log('🚀 ~ file: client.js ~ line 7 ~ client ~ url', url)

  return fetch(`${bashUrl}${url}`, {
    method,
    headers: authHeader(),
    body: data,
  })
    .then((response) => {
      if (!response.ok) { // handling !200
        throw response // statusText itu sub dari response yg berisi terjemahan errornya, misal 401 -> unautorized
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
        const error = await err.text().then((text) => text)// jika ini berhasil, berarti kesalahan dari respone!oke
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
  const formData = new FormData()
  Object.keys(data).forEach((key) => formData.append(key, data[key]))
  return client(url, { method: 'POST', data: formData, ...customConfig })
}
client.patch = function (url, data, ...customConfig) {
  return client(url, { method: 'PATCH', data, ...customConfig })
}
client.delete = function (url, data, ...customConfig) {
  return client(url, { method: 'DELETE', data, ...customConfig })
}
