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
    <footer className="bg-primary border-t border-accent-2 text-white">
      <div className="grid md:grid-cols-3 gap-4 h-72 py-8 ">
        <div className="flex items-center ">
          <Comikamedia className="md:mx-8 lg:mx-16 mx-4 w-full " />
        </div>
        <div className="flex text-left   flex-col pt-8 ">
          <h5 className="text-xl font-bold leading-loose">Menu</h5>
          {navigation.map((item) => (
            <Link href={item.href} key={item.name}>
              <a
                className="font-medium hover:underline leading-loose"
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex text-left   flex-col pt-8 ">
          <h5 className="text-xl font-bold leading-loose">Menu</h5>
          {navigation.map((item) => (
            <Link href={item.href} key={item.name}>
              <a
                className="font-medium hover:underline leading-loose"
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className=" flex justify-center items-center text-center h-12 bg-black bg-opacity-5 ">
        © Copyright COMIKAMEDIA 2021. All right reserved.
      </div>
    </footer>
  )
}

export const Footer = () => (
  <footer className="text-gray-600 body-font bg-primary ">
    <div className="container px-5 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
      <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left flex-1 flex justify-center">
        <a className="flex w-80 ">
          <Comikamedia className="w-full " />
        </a>
      </div>
      <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
        <div className="lg:w-1/2 md:w-1/2 w-full px-4">
          <h2 className="h2-text-gray-light">NAVIGASI</h2>
          <nav className="list-none mb-10">
            {navigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <a
                  className="text-gray-light block"
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
        </div>
        <div className="lg:w-1/2 md:w-1/2 w-full px-4">
          <h2 className="h2-text-gray-light">HUBUNGI KAMI</h2>
          <nav className="list-none mb-10">
            <Link href="/x">
              <a className=" flex items-center text-gray-light ">
                <RiInstagramFill className="mr-2 text-xl" />
                @Comikamedia
              </a>
            </Link>
            <Link href="/x">
              <a className=" flex items-center text-gray-light ">
                <IoLogoYoutube className="mr-2 text-xl" />
                COMIKA MEDIA
              </a>
            </Link>
            <Link href="/x">
              <a className=" flex items-center text-gray-light ">
                <IoLogoTwitter className="mr-2 text-xl" />
                Comikamedia
              </a>
            </Link>
            <Link href="/x">
              <a className=" flex items-center text-gray-light ">
                <SiTiktok className="mr-2 text-xl" />
                @Comikamedia
              </a>
            </Link>

          </nav>
        </div>

      </div>
    </div>
    <div className="bg-primaryDark">
      <div className="container mx-auto py-4 px-5 flex justify-center flex-col sm:flex-row  text-white text-lg">
        {/* <p className="text-sm text-center sm:text-left text-gray-light">
          © 2021 Komika Media — @danang_tp
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start ">
          <SocialMediaLogo className=" mr-2 text-xl text-gray-light" />
        </span> */}
        © 2021 Comika Media
      </div>
    </div>
  </footer>
)

export default Footer
