// import { selectToken } from './slices/authSlice'
// import { useDispatch ,useSelector} from 'react-redux'

export default function authHeader() {
  const token = localStorage.getItem('tt')
  // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImI0MjQwZjIzLTJhY2MtNDNmYy1iZDJhLWFkYjQ0NDE2YjI3YyIsIm5hbWUiOiJQdXRyYTIiLCJyZWZlcmVuY2VfaWQiOm51bGwsImVtYWlsIjoicHV0cmEyQGdtYWlsLmNvbSIsInRlbHAiOiIwODU3OTE1NDU1MTEiLCJwYXNzd29yZCI6IiQyeSQxMCRLbUhMNmRqS2dVWklQbUQ2XC9jQXFKZWZ5VWFtNVwvQWdaWjZPRGtwRlp4TFpcL2xUeUVjaTk0RyIsInBvaW50IjoiODU2NCIsInN0YXR1cyI6ImFjdGl2YXRlZCIsImZjbSI6bnVsbCwiY3JlYXRlZF9ieSI6IiIsImNyZWF0ZWRfYXQiOiIyMDIxLTA0LTEwIDEwOjA5OjQwIiwidXBkYXRlZF9ieSI6Ijc5ZjdmNzIyLTJhYzktNGEyOS1hOGQzLTUxMjI1ZTYzYTM4MyIsInVwZGF0ZWRfYXQiOiIyMDIxLTA0LTExIDA4OjUzOjQ0IiwiZGVsZXRlZCI6IjAiLCJyb2xlIjoibWVyY2hhbnQiLCJ0aW1lc3RhbXAiOjE2MTgxMDY0MzYsInRva2VuIjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBaQ0k2SW1JME1qUXdaakl6TFRKaFkyTXRORE5tWXkxaVpESmhMV0ZrWWpRME5ERTJZakkzWXlJc0ltNWhiV1VpT2lKUWRYUnlZVElpTENKeVpXWmxjbVZ1WTJWZmFXUWlPbTUxYkd3c0ltVnRZV2xzSWpvaWNIVjBjbUV5UUdkdFlXbHNMbU52YlNJc0luUmxiSEFpT2lJd09EVTNPVEUxTkRVMU1URWlMQ0p3WVhOemQyOXlaQ0k2SWlReWVTUXhNQ1JMYlVoTU5tUnFTMmRWV2tsUWJVUTJYQzlqUVhGS1pXWjVWV0Z0TlZ3dlFXZGFXalpQUkd0d1JscDRURnBjTDJ4VWVVVmphVGswUnlJc0luQnZhVzUwSWpvaU9EVTJOQ0lzSW5OMFlYUjFjeUk2SW1GamRHbDJZWFJsWkNJc0ltWmpiU0k2Ym5Wc2JDd2lZM0psWVhSbFpGOWllU0k2SWlJc0ltTnlaV0YwWldSZllYUWlPaUl5TURJeExUQTBMVEV3SURFd09qQTVPalF3SWl3aWRYQmtZWFJsWkY5aWVTSTZJamM1WmpkbU56SXlMVEpoWXprdE5HRXlPUzFoT0dRekxUVXhNakkxWlRZellUTTRNeUlzSW5Wd1pHRjBaV1JmWVhRaU9pSXlNREl4TFRBMExURXhJREE0T2pVek9qUTBJaXdpWkdWc1pYUmxaQ0k2SWpBaUxDSnliMnhsSWpvaWJXVnlZMmhoYm5RaUxDSjBhVzFsYzNSaGJYQWlPakUyTVRneE1EWTBNelo5LlZLMHJlSHpHaDZ6WTBGdjNNTjlweWxfVkNLaGQ1RFFnVDRVSmFmSVRHNFkifQ.4twAaO5W-4SKqnwn8qbXq6oPwTe-H2ql_QuBWvcwbNQ'
  // console.log("authHeader -> token", token)

  if (token) {
    return {
      'Zero-Token': token,
      // 'Accept': 'application/json',
      // 'Content-Type': false,
      // Authorization: `Bearer ${token}`
    }
  }
  return {
    // 'Accept': 'application/json',
    // 'Content-Type': false,
  }
}
