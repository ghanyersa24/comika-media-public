import Router from 'next/router'
import NProgress from 'nprogress'
import * as ga from '../lib/ga'
// eslint-disable-next-line import/extensions
// import * as ga from '../lib/ga'

let timer
let state
let activeRequests = 0
const delay = 250
NProgress.configure({ showSpinner: false })

function load() {
  if (state === 'loading') {
    return
  }

  state = 'loading'

  timer = setTimeout(() => {
    NProgress.start()
  }, delay) // only show progress bar if it takes longer than the delay
}

function stop(url) {
  if (activeRequests > 0) {
    return
  }

  state = 'stop'
  ga.pageview(url)

  clearTimeout(timer)
  NProgress.done()
}

Router.events.on('routeChangeStart', load)
Router.events.on('routeChangeComplete', stop)
Router.events.on('routeChangeError', stop)

const originalFetch = window.fetch
window.fetch = async function (...args) {
  if (activeRequests === 0) {
    load()
  }

  activeRequests += 1

  try {
    const response = await originalFetch(...args)
    return response
  } catch (error) {
    return Promise.reject(error)
  } finally {
    activeRequests -= 1
    if (activeRequests === 0) {
      stop()
    }
  }
}

export default function () {
  return null
}