import { Disclosure, Transition, Menu } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { signIn, useSession } from 'next-auth/client'
import React, { Fragment, ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { MdShoppingBasket } from 'react-icons/md'
import useSWR from 'swr'
import { Session } from 'next-auth'
import { toast } from 'react-toastify'
import { ComikamediaNavbar, Comikamedia } from '../../svg'
import { SocialMediaLogo } from '../../social-media'
import { SearchBar } from './search-bar'
import {
  API_ENDPOINT_CART, API_NOTIFICATION, API_ENDPOINT_PROFILE, API_COUNT_UNREAD_NOTIFICATION,
} from '../../../res/api-endpoint'
import { client } from '../../../lib/clientRaw'
import { NotificationPopover } from '../../modal/notification-popover'
import { Notification, Profile as ProfileType, UnreadNotification } from '../../../res/interface'

const navigation = [
  {
    name: 'Home', href: '', current: true, isRequiredLogin: false,
  },
  {
    name: 'About', href: 'about', current: false, isRequiredLogin: false,
  },
  {
    name: 'Artikel', href: 'article', current: false, isRequiredLogin: false,
  },
  {
    name: 'Bookmark', href: 'setting/bookmark', current: false, isRequiredLogin: true,
  },
  {
    name: 'Store', href: 'store', current: false, isRequiredLogin: false,
  },
  {
    name: 'Subscribe', href: 'subscribe', current: false, isRequiredLogin: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export const Profile = ({ src, name }: {
  src: string, name: string
}): ReactElement => {
  const router = useRouter()
  return (
    <Menu as="div" className="relative ml-3">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <div className="w-8 h-8 rounded-full">
                {src && name ? (
                  <Image
                    className="rounded-full aspect-[1/1] object-cover"
                    src={src}
                    alt={`gambar ${name}`}
                    layout="responsive"
                    width={60}
                    height={60}
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-500 rounded-full animate-pulse" />
                )}
              </div>
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block w-full px-4 py-2 text-sm text-gray-700 text-left',
                    )}
                    onClick={() => router.push('/setting/profile')}
                    type="button"
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block w-full px-4 py-2 text-sm text-gray-700 text-left',
                    )}
                    onClick={() => router.push('/auth/changePassword')}
                    type="button"
                  >
                    Ubah Password
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block w-full px-4 py-2 text-sm text-gray-700 text-left',
                    )}
                    onClick={() => router.push('/auth/signout')}
                    type="button"
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
export const SideBar = ({ isShowing, session, subUrlAdmin }: {
  isShowing: boolean, session: Session, subUrlAdmin: string
}): ReactElement => (
  /* This `show` prop controls all nested `Transition.Child` components. */
  <Transition show={isShowing}>
    {/* Background overlay */}
    {/* Sliding sidebar */}
    <Transition.Child
      enter="duration-200 ease-out"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveTo="opacity-0 scale-100"
    >
      <Disclosure.Button className="fixed top-0 w-full h-screen bg-black bg-opacity-75" style={{ zIndex: 99 }} />

      <div className="fixed top-0 w-full h-screen px-4 pt-2 pb-3 space-y-1 text-white md:w-80 bg-primary " style={{ zIndex: 100 }}>
        <div className="flex justify-end">
          <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <XIcon className="block w-6 h-6" aria-hidden="true" />
          </Disclosure.Button>
        </div>
        <div className="pt-4 divide-y ">
          <div className="flex flex-col items-left ">

            <Comikamedia className="w-full px-4 " />
            <span className="py-4 pl-4 text-sm font-medium text-left text-gray-200 ">
              Lucunya Tuh di Sana
              {' '}
              Beritanya Tuh di Sini
            </span>
          </div>
          <div className="pt-8 pb-8 text-base font-bold md:text-2xl">
            {navigation.map((item) => (
              (!item.isRequiredLogin || session)
              && (
              (<Link
                href={`/${item.href}`}
                key={item.name}
                className={classNames(
                  item.href === subUrlAdmin
                    ? 'bg-gray-900 bg-opacity-20 text-white'
                    : 'text-gray-300 hover:text-white  ',
                  'block px-3 py-2 rounded-md ',
                )}
                aria-current={item.current ? 'page' : undefined}>

                {item.name}

              </Link>)
              )
            ))}

            <Link
              href={session ? '/auth/signout' : '/auth/signin'}
              key="auth"
              className={classNames(
                'text-gray-300 hover:text-white  ',
                'block px-3 py-2 rounded-md',
              )}>

              {session ? 'Logout' : 'Login'}

            </Link>

          </div>
          <div className="px-3">
            {/* <p>Social Media</p> */}
            <div className="py-4 text-lg font-medium text-gray-300 ">Social Media</div>
            <div className="flex flex-row">
              <SocialMediaLogo className="mr-4 text-2xl text-white fill-current " />
            </div>
          </div>
        </div>
      </div>
    </Transition.Child>
  </Transition>
)

export const Navbar = (): ReactElement => {
  const [session] = useSession()
  const router = useRouter()
  const searchAbleRoutes = ['article', 'store']
  const domainUrl = router.route.split('/')?.[1]

  const currentRoute = searchAbleRoutes.find((searchAbleRoute) => searchAbleRoute === domainUrl) ? domainUrl : 'article'
  const urlComponent = router.route.split('/')
  const subUrlAdmin = urlComponent?.[1] || ''
  const { search } = router.query

  const { data } = useSWR<ProfileType>(() => (session ? `${API_ENDPOINT_PROFILE}` : null), client.get)
  const { data: carts } = useSWR(() => (session ? `${API_ENDPOINT_CART}` : null), client.get)
  const { data: unreadNotifications } = useSWR<UnreadNotification>(() => (session ? `${API_COUNT_UNREAD_NOTIFICATION}` : null), client.get, { errorRetryCount: 0 })
  const { data: messagesNotification } = useSWR<Notification[]>(() => (data ? `${API_NOTIFICATION}?limit=5&page=1&type=informasi` : null), client.get, { errorRetryCount: 0 })
  const { data: transactionsNotification } = useSWR<Notification[]>(() => (data ? `${API_NOTIFICATION}?limit=5&page=1&type=transaksi` : null), client.get, { errorRetryCount: 0 })
  const sumOfCarts = carts?.reduce((sum, cart) => sum + cart.qty, 0)

  return <>
    <Disclosure as="nav" className="fixed top-0 z-30 w-screen bg-white">
      {({ open }) => (
        <>
          <SideBar isShowing={open} session={session} subUrlAdmin={subUrlAdmin} />

          <div className="pl-4 pr-2 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 ">
              <div className="inset-y-0 left-0 flex items-center ">
                {/* Mobile menu button */}
                <Disclosure.Button
                  className={classNames(
                    open ? 'text-gray-900' : 'text-gray-500',
                    'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                  )}
                >
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>
              <div className="">
                <Link href="/" className="relative hidden hover:underline md:block ">

                  <ComikamediaNavbar className="h-8 w-52" />

                </Link>
              </div>
              <div className="flex items-center text-primary sm:pr-4">
                <SearchBar
                  className=""
                  isMobile={false}
                  searchValue={search as string}
                  onSubmit={(searchInput) => router.push(`/${currentRoute}?search=${searchInput}`)}
                />
                <button
                  type="button"
                  className="relative"
                  onClick={() => (session ? router.push('/cart') : toast.info('Harap Login terlebih dahulu', {
                    position: 'bottom-right',
                    onClose: () => signIn(),
                    autoClose: 2000,
                  }))}
                >
                  {![0, undefined].includes(sumOfCarts) && (
                    <div className="absolute top-0 w-4 h-4 text-xs text-white bg-red-500 rounded-full right-1">
                      {sumOfCarts}
                    </div>
                  )}
                  <MdShoppingBasket className="mx-2 text-2xl" />
                </button>
                {session && (
                <NotificationPopover
                  unreadNotifications={unreadNotifications}
                  messagesNotification={messagesNotification}
                  transactionsNotification={transactionsNotification}
                />
                )}
                <div className="hidden ml-2 sm:block">
                  {session ? (
                    <Profile name={data?.name} src={data?.photo} />
                  ) : (
                    <button onClick={() => signIn()} type="button">
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

        </>
      )}
    </Disclosure>

  </>;
}

export default Navbar
