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
    domains: ['miro.medium.com', 'service-comika.herokuapp.com', 'awsimages.detik.net.id',
      'cdn-production-thumbor-vidio.akamaized.net', 'localhost', 'i2.wp.com', 'www.herworld.co.id', 'pbs.twimg.com',
      '1.bp.blogspot.com', 'www.comikacomedy.club', 'lh3.googleusercontent.com', 'i.ytimg.com', 'babussalambuana.com', 'api.comika.media', 'i.graphicmama.com', 'via.placeholder.com', 'i.imgur.com',
    ],
    imageSizes: [16, 32, 48, 64], // This array is concatenated to deviceSizes.
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Next.js default
    deviceSizes: [96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // default
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
