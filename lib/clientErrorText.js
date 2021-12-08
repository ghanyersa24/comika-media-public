// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import { BASH_URL } from '../res/string'

export const bashUrl = BASH_URL

export default function authHeaderRaw() {
  const token = localStorage.getItem('komika-key')
  return {
    Authorization: token,
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
          if (resJson.error) {
            throw resJson
          }
          return resJson
        })
    })
    .catch(async (err) => {
      try {
        // jika ini berhasil, berarti kesalahan dari respone!oke
        const error = await err.text().then((text) => text)
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
