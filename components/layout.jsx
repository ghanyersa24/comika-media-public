import Footer from './footer'
import Meta from './meta'
import Navbar from './blog/navigation/navbar'

// eslint-disable-next-line no-unused-vars
export default function Layout({ children, url }) {
  return (
    <>
      <Meta />
      <Navbar />
      <div className="min-h-screen ">
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
