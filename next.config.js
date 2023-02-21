/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    // Required:
    // appDir: true,
  },
  images: {
    unoptimized: true,
    // formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 30,
    domains: ['miro.medium.com', 'service-comika.herokuapp.com', 'awsimages.detik.net.id', 'www.static-src.com', 'betterstudio.com',
      'cdn-production-thumbor-vidio.akamaized.net', 'localhost', 'i2.wp.com', 'www.herworld.co.id', 'pbs.twimg.com',
      '1.bp.blogspot.com', 'www.comikacomedy.club', 'comika.id', 'api.comika.mediauploads', 'lh3.googleusercontent.com', 'i.ytimg.com', 'babussalambuana.com', 'api.comika.media', 'i.graphicmama.com', 'via.placeholder.com', 'i.imgur.com',
    ],
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    BASH_URL: process.env.NEXT_PUBLIC_BASH_URL, // Pass through env variables
    GOOGLE_MAP_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY, // Pass through env variables
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
})
