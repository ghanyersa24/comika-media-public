/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    // Providers.Email({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    // // Temporarily removing the Apple provider from the demo site as the
    // // callback URL for it needs updating due to Vercel changing domains
    // /*
    // Providers.Apple({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: {
    //     appleId: process.env.APPLE_ID,
    //     teamId: process.env.APPLE_TEAM_ID,
    //     privateKey: process.env.APPLE_PRIVATE_KEY,
    //     keyId: process.env.APPLE_KEY_ID,
    //   },
    // }),
    // */
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Providers.Twitter({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    // Providers.Auth0({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   domain: process.env.AUTH0_DOMAIN,
    // }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('🚀 ~ file: [...nextauth].js ~ line 58 ~ authorize ~ credentials', credentials)
        // console.log('🚀 ~ file: [...nextauth].js ~ line 57 ~ authorize ~ credentials',
        //   `${process.env.BASH_URL}/api/login`, credentials)
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${process.env.BASH_URL}/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        console.log('🚀 ~ file: [...nextauth].js ~ line 72 ~ authorize ~ res', res)
        const user = await res.json()
        console.log('🚀 ~ file: [...nextauth].js ~ line 70 ~ authorize ~ user', user)
        // If no error and we have user data, return it
        if (res.ok && user) {
          // {token="xx"}
          return user
        }
        // Return null if user data could not be retrieved
        throw new Error(user.msg)
        // return null
      },
    }),
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/auth/signin', // Displays signin buttons
    signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {

    async jwt(token, user, account) {
      console.log('🚀 ~ file: [...nextauth].js ~ line 147 ~ jwt ~ account', account)
      console.log('🚀 ~ file: [...nextauth].js ~ line 147 ~ jwt ~ token', token)
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      if (user?.token) {
        token.accessToken = user.token
      }
      return token
    },
    async signIn(user, account, profile) {
      console.log('🚀 ~ file: [...nextauth].js ~ line 154 ~ signIn ~ user', user)
      if (account.provider === 'google'
          && profile.verified_email === true
          && profile.email.endsWith('@gmail.com')) {
        return true
      }
      return false
    },
    // async redirect(url, baseUrl) { return baseUrl },
    // async session(session, user) { return session },
    // async jwt(token, user, account, profile, isNewUser) { return token }
    // async jwt(prevToken, token) {
    //   // console.log('🚀 ~ file: [...nextauth].js ~ line 145 ~ jwt ~ token', token)
    //   // console.log('🚀 ~ file: [...nextauth].js ~ line 145 ~ jwt ~ prevToken', prevToken)
    //   // Initial call
    //   if (token) {
    //     return {
    //       accessToken: token.token,
    //     }
    //   }

    //   // Subsequent calls
    //   return prevToken
    // },
    session: async (session, token) => {
      // console.log('🚀 ~ file: [...nextauth].js ~ line 157 ~ session: ~ token', token)
      console.log('🚀 ~ file: [...nextauth].js ~ line 157 ~ session: ~ session', session)
      session.accessToken = token.accessToken

      return session
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: 'light',

  // Enable debug messages in the console if you are having problems
  debug: false,
})
