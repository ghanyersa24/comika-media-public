import { Disclosure, Transition, Menu } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import {
  signIn, signOut, useSession,
} from 'next-auth/client'
import React, { Fragment, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ComikamediaNavbar, Comikamedia } from '../../svg'
import { SocialMediaLogo } from '../../social-media'

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Article', href: '#', current: false },
  { name: 'Store', href: '#', current: false },
  { name: 'Subscribe', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export const Profile = ({ src, name }) => {
  const router = useRouter()
  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src={src}
                alt={`gambar ${name}`}
              />
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
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                    onClick={signOut}
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
export const SideBar = ({ isShowing }) => (
  /* This `show` prop controls all nested `Transition.Child` components. */
  <Transition show={isShowing}>
    {/* Background overlay */}
    <Transition.Child
      enter="transition-opacity ease-linear duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed z-40 top-0 h-screen w-full bg-black bg-opacity-80 " />
    </Transition.Child>
    {/* Sliding sidebar */}
    <Transition.Child
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="fixed w-full top-0  z-50  px-4 pt-2 pb-3 space-y-1  md:w-80 min-h-screen bg-primary text-white ">
        <div className="flex justify-end">
          <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md  hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <XIcon className="block h-6 w-6" aria-hidden="true" />
          </Disclosure.Button>
        </div>
        <div className="divide-y pt-4 ">
          <div className="flex items-center flex-col  ">
            {/* <img src="/assets/logo/comikamedia.svg"
            className="w-full px-2 " alt="logo komika" /> */}
            <Comikamedia className="w-full px-2 " />
            <span className="py-4">Tempat mencari kebahagiaan</span>
          </div>
          <div className="pt-8 pb-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-900 bg-opacity-20 text-white' : 'text-gray-300 hover:text-white  ',
                  'block px-3 py-2 rounded-md text-base font-bold text-3xl',
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div>
            {/* <p>Social Media</p> */}
            <div className="pt-8 flex flex-row ">
              <SocialMediaLogo className="fill-current text-white mr-4 text-2xl " />
            </div>
          </div>
        </div>
      </div>
    </Transition.Child>

  </Transition>
)

export default function Navbar() {
  const [session, loading] = useSession()
  useEffect(() => {
    if (!loading) localStorage.setItem('komika-key', session?.accessToken)
  }, [session, loading])
  // console.log('🚀 ~ file: navbar.jsx ~ line 92 ~ Navbar ~ loading', session, loading)
  return (
    <Disclosure as="nav" className="fixed z-30 bg-white w-screen top-0">
      {({ open }) => (
        <>
          <div className=" mx-auto px-6  lg:px-8 ">
            <div className=" flex items-center justify-between h-16">
              <div className=" inset-y-0 left-0 flex items-center">
                {/* Mobile menu button */}
                <Disclosure.Button className={classNames(
                  open ? 'text-gray-900' : 'text-gray-500',
                  'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                )}
                >
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>
              <div className="">
                <Link href="/">
                  <a className="hover:underline"><ComikamediaNavbar className="h-12" /></a>
                </Link>
              </div>
              <div className=" text-blue-500 flex flex-row  ">
                <SocialMediaLogo className="fill-current text-primary mr-2 text-xl mt-1 " />
                {session ? (
                  <Profile
                    name="dummy"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                )
                  : (
                    <button onClick={signIn} type="button">
                      Login
                    </button>
                  )}
              </div>

            </div>
          </div>
          <SideBar isShowing={open} />
        </>
      )}
    </Disclosure>
  )
}
