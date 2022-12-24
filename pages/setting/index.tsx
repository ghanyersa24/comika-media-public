import React, { ReactElement } from 'react'
import { BsBookmarkFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import {
  signIn,
  useSession,
} from 'next-auth/client'
import Router from 'next/router'
import mobile from 'is-mobile'
import useSWR from 'swr'
import Layout from '../../components/layout'
import { client } from '../../lib/clientRaw'
import { Profile } from '../../res/interface'
import DateFormatter from '../../components/date-formatter'
import { ButtonNotificationMobile } from '../../components/button/button-notification-mobile'

const isMobile = mobile()

export const MenuItem = ({ icon, name, href }
  :{icon:any, name:string, href:string}) :ReactElement => (
    (<Link href={href} className="flex items-center p-4 mt-4 bg-white rounded-lg">

      <div className="p-2 mr-4 text-2xl text-white rounded-lg bg-primary">
        {icon}
      </div>
      <h2 className="text-base leading-relaxed text-gray-900">{name}</h2>

    </Link>)
)
const navigation = [
  { name: 'Akun', href: '/setting/profile', icon: <MdAccountCircle /> },
  { name: 'Bookmark Artikel', href: '/setting/bookmark', icon: <BsBookmarkFill /> },
  { name: 'About', href: '/about', icon: <BsBookmarkFill /> },
  // { name: 'Riwayat Bacaan', href: '#', icon: <RiFileHistoryFill /> },
  // { name: 'Riwayat Belanja', href: '#', icon: <AiFillShopping /> },
]
export const Setting = ():ReactElement => {
  const [session] = useSession()

  const { data, error } = useSWR<Profile>(`${'/account/me'}`, client.get)

  if (!isMobile) return <div>For Mobile Only</div>
  if (!error && !data) return <div>Loading...</div>
  if (!session) signIn()

  return (
    <Layout isMobile={isMobile} title="Setting">
      {session ? (
        <div className="h-screen bg-bgGray">
          <div className="pb-24 bg-primary">
            <div className="flex justify-end pt-4 pb-4 pr-4 text-2xl text-white">
              <ButtonNotificationMobile />
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
                    {/* <p className="text-xs leading-normal text-white">{data.phone}</p> */}
                    {/* <p className="text-xs leading-normal text-white">{data.email}</p> */}
                    {
                      data?.isPremium === 0 ? (
                        <button type="button" onClick={() => Router.push('subscribe')} className="px-4 py-2 mt-4 rounded bg-warning">
                          <p className="text-xs leading-normal text-white">Upgrade Premium</p>
                        </button>
                      ) : (
                        <div className="flex items-center mt-0.5">
                          <div className="relative w-6 h-6 mr-2">
                            <img src="/assets/blog/subscribe/premium_badge.svg" alt="" />
                          </div>
                          <span className="text-white">
                            Berlaku hingga
                            {' '}
                            <DateFormatter dateString={data.lastPremiumDate} />
                          </span>
                        </div>
                      )
                    }

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
