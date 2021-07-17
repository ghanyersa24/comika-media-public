import Footer from './footer'
import Meta from './meta'
import Navbar from './blog/navigation/navbar'
import { BottomNavbar } from './blog/navigation/bottom-navbar'

export const Desktop = ({ children }) => (
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

export const Mobile = ({ children }) => (
  <>
    <Meta />
    <div className="min-h-screen ">
      {/* <Alert preview={preview} /> */}
      <main>{children}</main>
    </div>
    <BottomNavbar />
    <Footer />
  </>
)
// eslint-disable-next-line no-unused-vars
export default function Layout({ children, isMobile }) {
  console.log('🚀 ~ file: layout.jsx ~ line 7 ~ Layout ~ isMobile', isMobile)
  if (isMobile) { return <Mobile>{children}</Mobile> }
  return <Desktop>{children}</Desktop>
}
