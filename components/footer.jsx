import Link from 'next/link'
import { IoLogoYoutube, IoLogoTwitter } from 'react-icons/io'
import { SiTiktok } from 'react-icons/si'
import { RiInstagramFill } from 'react-icons/ri'
import { Comikamedia } from './svg'

const navigation = [
  { name: 'Artikel', href: '/article', current: true },
  { name: 'Store', href: '/store', current: false },
]
export function Footer2() {
  return (
    <footer className="text-white border-t bg-primary border-accent-2">
      <div className="grid gap-4 py-8 md:grid-cols-3 h-72 ">
        <div className="flex items-center ">
          <Comikamedia className="w-full mx-4 md:mx-8 lg:mx-16 " />
        </div>
        <div className="flex flex-col pt-8 text-left ">
          <h5 className="text-xl font-bold leading-loose">Menu</h5>
          {navigation.map((item) => (
            (<Link
              href={item.href}
              key={item.name}
              className="font-medium leading-loose hover:underline"
              aria-current={item.current ? 'page' : undefined}>

              {item.name}

            </Link>)
          ))}
        </div>
        <div className="flex flex-col pt-8 text-left ">
          <h5 className="text-xl font-bold leading-loose">Menu</h5>
          {navigation.map((item) => (
            (<Link
              href={item.href}
              key={item.name}
              className="font-medium leading-loose hover:underline"
              aria-current={item.current ? 'page' : undefined}>

              {item.name}

            </Link>)
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center h-12 text-center bg-black bg-opacity-5">
        <div className="justify-center">
          <div>© Copyright COMIKAMEDIA 2021. All right reserved.</div>
          <div>PT Wongsoyudan Pratama Indonesia</div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = () => (
  <footer className="text-gray-600 body-font bg-primary ">
    <div className="container flex flex-col flex-wrap px-5 py-16 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
      <div className="flex justify-center flex-1 flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
        <a className="flex w-80 ">
          <Comikamedia className="w-full " />
        </a>
      </div>
      <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
        <div className="w-full px-4 lg:w-1/2 md:w-1/2">
          <h2 className="h2-text-gray-light">NAVIGASI</h2>
          <nav className="mb-10 list-none">
            {navigation.map((item) => (
              (<Link
                href={item.href}
                key={item.name}
                className="block text-gray-light"
                aria-current={item.current ? 'page' : undefined}>

                {item.name}

              </Link>)
            ))}
          </nav>
        </div>
        <div className="w-full px-4 lg:w-1/2 md:w-1/2">
          <h2 className="h2-text-gray-light">HUBUNGI KAMI</h2>
          <nav className="mb-10 list-none">
            <Link href="/x" className="flex items-center text-gray-light">

              <RiInstagramFill className="mr-2 text-xl" />@Comikamedia
            </Link>
            <Link href="/x" className="flex items-center text-gray-light">

              <IoLogoYoutube className="mr-2 text-xl" />COMIKA MEDIA
            </Link>
            <Link href="/x" className="flex items-center text-gray-light">

              <IoLogoTwitter className="mr-2 text-xl" />Comikamedia
            </Link>
            <Link href="/x" className="flex items-center text-gray-light">

              <SiTiktok className="mr-2 text-xl" />@Comikamedia
            </Link>
          </nav>
        </div>
      </div>
    </div>
    <div className="bg-primaryDark">
      <div className="container flex flex-col justify-center px-5 py-4 mx-auto text-lg text-white sm:flex-row">
        <div className="text-center">
          <div>© COMIKA MEDIA 2021. </div>
          <div>PT Wongsoyudan Pratama Indonesia</div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
