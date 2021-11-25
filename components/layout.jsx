import dynamic from 'next/dynamic'
import Meta from './meta'

// import Navbar from './blog/navigation/navbar'
// import { BottomNavbar } from './blog/navigation/bottom-navbar'
// import { Footer } from './footer'

const Navbar = dynamic(() => import('./blog/navigation/navbar'), { ssr: true })
const BottomNavbar = dynamic(() => import('./blog/navigation/bottom-navbar'), { ssr: true })
const Footer = dynamic(() => import('./footer'), { ssr: true })

export const Desktop = ({ children, className }) => (
  <>
    <Meta />
    <Navbar />
    <div className={`min-h-screen ${className}`}>
      {/* <Alert preview={preview} /> */}
      <main className="className">{children}</main>
    </div>
    <Footer />
  </>
)

export const Mobile = ({ children, className }) => (
  <>
    <Meta />
    <div className={`min-h-screen ${className}`}>
      {/* <Alert preview={preview} /> */}
      <main className="">{children}</main>
    </div>
    <BottomNavbar />
    {/* <Footer /> */}
  </>
)
// eslint-disable-next-line no-unused-vars
export default function Layout({ children, isMobile, className = '' }) {
  if (isMobile) { return <Mobile className={className}>{children}</Mobile> }
  return <Desktop className={className}>{children}</Desktop>
}
