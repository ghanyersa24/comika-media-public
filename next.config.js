module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    BASH_URL: process.env.NEXT_PUBLIC_BASH_URL, // Pass through env variables
    GOOGLE_MAP_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
  images: {
    domains: ['miro.medium.com', 'service-comika.herokuapp.com'],
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}