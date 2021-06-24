// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

import { BASH_URL } from '../res/string'

export const bashUrl = BASH_URL

// import { selectToken } from './slices/authSlice'
// import { useDispatch ,useSelector} from 'react-redux'

export default function authHeader() {
  const token = localStorage.getItem('komika-key')
  return {
    Authorization: token,
  }
}

export function client(url, {
  method, data,
}) {
  console.log('🚀 ~ file: client.js ~ line 7 ~ client ~ url', url)

  return fetch(`${bashUrl}${url}`, {
    method,
    headers: authHeader(),
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
