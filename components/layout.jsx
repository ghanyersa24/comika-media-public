import dynamic from 'next/dynamic'

import Meta from './meta'

const Navbar = dynamic(() => import('./blog/navigation/navbar'), { ssr: false })
const BottomNavbar = dynamic(() => import('./blog/navigation/bottom-navbar'), { ssr: false })
const Footer = dynamic(() => import('./footer'), { ssr: false })

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
  console.log('🚀 ~ file: layout.jsx ~ line 7 ~ Layout ~ isMobile', isMobile)
  if (isMobile) { return <Mobile className={className}>{children}</Mobile> }
  return <Desktop className={className}>{children}</Desktop>
}
