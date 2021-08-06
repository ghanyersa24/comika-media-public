import Link from 'next/link'
import { SocialMediaLogo } from './social-media'
import { Comikamedia } from './svg'

const navigation = [
  { name: 'Artikel', href: '/article', current: true },
  { name: 'Store', href: '/store', current: false },
]
export default function Footer() {
  return (
    <footer className="bg-primary border-t border-accent-2 text-white">
      <div className="grid md:grid-cols-3 gap-4 h-72 py-8 ">
        <div className="flex items-center ">
          <Comikamedia className="md:mx-8 lg:mx-16 mx-4 w-full " />
        </div>
        <div className="flex text-left justify-between  flex-col pt-8 ">
          {navigation.map((item) => (
            <Link href={item.href} key={item.name}>
              <a
                className="font-bold hover:underline"
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            </Link>
          ))}
          <h5
            className="font-bold"
          >
            Temukan kami di
          </h5>
          <div className="flex flex-row">
            <SocialMediaLogo className="fill-current text-white mr-4 text-2xl " />
          </div>
        </div>
      </div>
      <div className=" flex justify-center items-center text-center h-12 bg-black bg-opacity-5 ">
        © Copyright COMIKAMEDIA 2021. All right reserved.
      </div>
    </footer>
  )
}
