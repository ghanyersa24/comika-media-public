import { ReactElement } from 'react'
import { AiFillBell, AiFillShopping } from 'react-icons/ai'
import { BsBookmarkFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import { RiFileHistoryFill } from 'react-icons/ri'
import Image from 'next/image'
import Link from 'next/link'
import {
  signIn,
  useSession,
} from 'next-auth/client'
import Router from 'next/router'
import mobile from 'is-mobile'
import { Get as GetProfile } from '../../service/user-profile'
import Layout from '../../components/layout'

const isMobile = mobile()

export const MenuItem = ({ icon, name, href }
  :{icon:any, name:string, href:string}) :ReactElement => (
    <Link href={href}>
      <a className="flex items-center p-4 mt-4 bg-white rounded-lg">
        <div className="p-2 mr-4 text-2xl text-white rounded-lg bg-primary">
          {icon}
        </div>
        <h2 className="text-base leading-relaxed text-gray-900">{name}</h2>
      </a>
    </Link>
)
const navigation = [
  { name: 'Akun', href: '/setting/profile', icon: <MdAccountCircle /> },
  { name: 'Bookmark Artikel', href: '/setting/bookmark', icon: <BsBookmarkFill /> },
  // { name: 'Riwayat Bacaan', href: '#', icon: <RiFileHistoryFill /> },
  // { name: 'Riwayat Belanja', href: '#', icon: <AiFillShopping /> },
]
export const Setting = ():ReactElement => {
  const [session] = useSession()

  const { data, isLoading } = GetProfile()

  if (!isMobile) return <div>For Mobile Only</div>
  if (isLoading) return <div>Loading...</div>
  if (!session) signIn()

  return (
    <Layout isMobile={isMobile}>
      {session ? (
        <div className="h-screen">
          <div className="pb-24 bg-primary">
            <div className="flex justify-end pt-4 pb-4 pr-4 text-2xl text-white">
              <AiFillBell />
            </div>
            <div className="px-4">
              {data ? (
                <div className="flex items-start justify-end space-x-3">
                  <div className="w-16 mt-1">
                    <Image
                      src={data.photo}
                      alt="photo profil "
                      layout="responsive"
                      className="rounded-full"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-end w-3/4 h-full ">
                    <p className="text-xl font-bold leading-relaxed text-white">{data.name}</p>
                    <p className="text-xs leading-normal text-white">{data.phone}</p>
                    <p className="text-xs leading-normal text-white">{data.email}</p>
                    <button type="button" onClick={() => Router.push('subscribe')} className="px-4 py-2 mt-4 rounded bg-warning">
                      <p className="text-xs leading-normal text-white">Upgrade Premium</p>
                    </button>
                  </div>
                </div>
              ) : 'loading'}
            </div>
          </div>
          <div className="px-4 py-8 pb-24 -mt-16 bg-bgGray rounded-xl ">
            <h1 className="text-base font-medium leading-tight text-gray-900">Pengaturan</h1>
            <div className="">
              {navigation.map(({ name, href, icon }) => (
                <MenuItem name={name} href={href} icon={icon} key={name} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <h1 className="text-2xl text-warning ">Anda Belum Login</h1>
        </div>
      ) }
    </Layout>

  )
}

export default Setting
