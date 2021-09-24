import Document, {
  Html, Head, Main, NextScript,
} from 'next/document'
import Script from 'next/script'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#006BC1" />
          <Script
            id="embedig"
            src="https://www.instagram.com/embed.js"
            strategy="lazyOnload"
          />
          <Script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" strategy="lazyOnload" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
