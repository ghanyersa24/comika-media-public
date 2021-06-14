import { useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Article', href: '#', current: false },
  { name: 'Store', href: '#', current: false },
  { name: 'Subscribe', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
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
      <div className="fixed z-10 h-screen w-full bg-black bg-opacity-80 " />
    </Transition.Child>
    {/* Sliding sidebar */}
    <Transition.Child
      enter="transition ease-in-out duration-200 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-200 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <div className="relative    z-50  px-4 pt-2 pb-3 space-y-1 w-screen md:w-full min-h-screen bg-primary text-white ">
        <div className="flex justify-end">
          <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md  hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <XIcon className="block h-6 w-6" aria-hidden="true" />
          </Disclosure.Button>
        </div>
        <div className="divide-y pt-4 ">
          <div className="flex items-center flex-col  ">
            <img src="/assets/logo/comikamedia.svg" className="w-full px-2 " alt="logo komika" />
            <span className="py-4">Tempat mencari kebahagiaan</span>
          </div>
          <div className="pt-8" >
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-900 bg-opacity-20 text-white' : 'text-gray-300 hover:text-white  ',
                  'block px-3 py-2 rounded-md text-base font-medium text-2xl',
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Transition.Child>

  </Transition>
)

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-transparent z-40 fixed w-80 ">
      {({ open }) => (
        <>
          <Transition
            show={!open}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute mx-auto px-2 sm:px-6 lg:px-8 ">
              <div className="relative flex items-center justify-between h-16">
                <div className=" inset-y-0 left-0 flex items-center">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  </Disclosure.Button>
                </div>

              </div>
            </div>
          </Transition>

          <SideBar isShowing={open} />
        </>
      )}
    </Disclosure>
  )
}
