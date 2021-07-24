import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'
import { AiFillBell, AiFillShopping } from 'react-icons/ai'
import { BsBookmarkFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import { RiFileHistoryFill } from 'react-icons/ri'
import Image from 'next/image'
import Link from 'next/link'
import {
  signIn,
} from 'next-auth/client'
import { Get as GetProfile } from '../../service/user-profile'
import Layout from '../../components/layout'

export const MenuItem = ({ icon, name, href }
  :{icon:any, name:string, href:string}) :ReactElement => (
    <Link href={href}>
      <a className="flex items-center p-4 bg-white rounded-lg mt-4">
        <div className="bg-primary rounded-lg p-2 text-2xl text-white mr-4">
          {icon}
        </div>
        <h2 className="text-base leading-relaxed text-gray-900">{name}</h2>
      </a>
    </Link>
)
const navigation = [
  { name: 'Akun', href: '/setting/profile', icon: <MdAccountCircle /> },
  { name: 'Bookmark Artikel', href: '#', icon: <BsBookmarkFill /> },
  { name: 'Riwayat Bacaan', href: '#', icon: <RiFileHistoryFill /> },
  { name: 'Riwayat Belanja', href: '#', icon: <AiFillShopping /> },
]
export const Setting = ({ isMobile }:{isMobile:boolean}):ReactElement => {
  console.log('🚀 ~ file: index.tsx ~ line 4 ~ Setting ~ Setting', isMobile)
  const { data, isLoading } = GetProfile()

  if (!isMobile) return <div>For Mobile Only</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <Layout isMobile={isMobile}>
      {data ? (
        <div className="h-screen">
          <div className="bg-primary h-64">
            <div className="text-xl text-white flex justify-end pb-4 pt-4">
              <AiFillBell />
            </div>
            <div className="px-4">
              <div className="flex space-x-3 items-start justify-end">
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
                  <div className="py-2 mt-4 px-4 bg-warning rounded">
                    <p className="text-xs leading-normal text-white">Upgrade Premium</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="-mt-16 bg-bgGray rounded-xl px-4 py-8 pb-24  ">
            <h1 className="text-base leading-tight font-medium text-gray-900">Pengaturan</h1>
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
          {signIn() }
        </div>
      ) }
    </Layout>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))

  // will be passed to the page component as props
  return {
    props: {
      isMobile,
    },
  }
}

export default Setting
