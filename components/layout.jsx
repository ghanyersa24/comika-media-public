import dynamic from 'next/dynamic'
import Head from 'next/head'
import Meta from './meta'

// import Navbar from './blog/navigation/navbar'
// import { BottomNavbar } from './blog/navigation/bottom-navbar'
// import { Footer } from './footer'

const Navbar = dynamic(() => import('./blog/navigation/navbar'), { ssr: true })
const BottomNavbar = dynamic(() => import('./blog/navigation/bottom-navbar'), { ssr: true })
const Footer = dynamic(() => import('./footer'), { ssr: true })

export const Desktop = ({
  children, className, title, prevTitle,
}) => (
  <>
    <Head>
      <title>
        {prevTitle?.length > 0 ? `${prevTitle}` : ''}
        {prevTitle?.length > 0 && title?.length > 0 ? ' - ' : ''}
        {title ? `${title}` : null }
      </title>
    </Head>
    <Meta />
    <Navbar />
    <div className={`min-h-screen ${className}`}>
      {/* <Alert preview={preview} /> */}
      <main className="className">{children}</main>
    </div>
    <Footer />
  </>
)

export const Mobile = ({
  children, className, title, prevTitle,
}) => (
  <>
    <Head>
      <title>
        {prevTitle?.length > 0 ? `${prevTitle}` : ''}
        {prevTitle?.length > 0 && title?.length > 0 ? ' - ' : ''}
        {title ? `${title}` : null }
      </title>
    </Head>
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
export default function Layout({
  children, isMobile, prevTitle = 'Comika Media', title = null, className = '',
}) {
  if (isMobile) {
    return (
      <Mobile
        prevTitle={prevTitle}
        title={title}
        className={className}
      >
        {children}
      </Mobile>
    )
  }
  return (
    <Desktop
      prevTitle={prevTitle}
      title={title}
      className={className}
    >
      {children}
    </Desktop>
  )
}
