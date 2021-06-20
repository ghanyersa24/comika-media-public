import { EXAMPLE_PATH } from '../lib/constants'
import { SocialMediaLogo } from './social-media'
import { Comikamedia } from './svg'

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-accent-2 text-white">
      <div className="grid md:grid-cols-3 gap-4 h-72 py-8 ">
        <div className="flex items-center ">
          <Comikamedia className="md:mx-8 lg:mx-16 mx-4 w-full " />
        </div>
        <div className="flex text-left justify-between  flex-col pt-8 ">
          <a
            href="https://nextjs.org/docs/basic-features/pages"
            className="font-bold hover:underline"
          >
            Konten
          </a>
          <a
            href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
            className="font-bold hover:underline"
          >
            Store
          </a>
          <a
            href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
            className="font-bold hover:underline"
          >
            Kontak kami
          </a>
          <a
            href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
            className="font-bold hover:underline"
          >
            Temukan kami di
          </a>
          <div className="flex flex-row">
            <SocialMediaLogo className="fill-current text-white mr-4 w-8" />
          </div>
        </div>
      </div>
      <div className=" flex justify-center items-center text-center h-12 bg-black bg-opacity-5 ">
        © Copyright COMIKAMEDIA 2021. All right reserved.
      </div>
    </footer>
  )
}
