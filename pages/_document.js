import Document, {
  Html, Head, Main, NextScript,
} from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#006BC1" />
          <script async src="https://www.instagram.com/embed.js" />
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
