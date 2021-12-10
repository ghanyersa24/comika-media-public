import React, { FunctionComponent, ReactElement } from 'react'
import {
  Popover, Tab, Transition,
} from '@headlessui/react'
import { MdNotifications } from 'react-icons/md'
import router from 'next/router'
import { Notification, UnreadNotification } from '../../res/interface'
import { NotificationList } from '../list/notification-list'
import NotificationHint from '../general/animation/notification-hint'

type props = {
  messagesNotification: Notification[],
  transactionsNotification: Notification[],
  unreadNotifications:UnreadNotification
};

export const ClickToMoreBtn: FunctionComponent<{ onClick: () => void, name?: string}> = ({ onClick, name = 'Tampilkan Semua' }):ReactElement => (
  <div className="flex justify-center my-4 ">
    <button onClick={onClick} type="button" className="font-medium text-primary hover:underline">
      {name}
    </button>
  </div>
)

export const NotificationPopover: FunctionComponent<props> = ({
  messagesNotification, transactionsNotification, unreadNotifications,
}) => (
  <Popover className="relative mt-1.5 ">
    <Popover.Button>
      {![0, undefined].includes(unreadNotifications?.unreadAll) ? (
        <div className="absolute top-0 w-4 h-4 text-xs text-white bg-red-500 rounded-full right-1">
          {unreadNotifications?.unreadAll}
        </div>
      ) : null}
      <MdNotifications className="mx-2 text-2xl " />
    </Popover.Button>
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Popover.Panel className="absolute z-10 mt-2 text-gray-800 bg-white shadow-md w-96 -right-6 md:rounded-lg ring-1 ring-black ring-opacity-5">
        <div className="relative">
          <div className="px-6 py-4 border-b ">
            <p className="text-xl font-bold ">Notifikasi</p>
          </div>
          {/* <div className="">
              <NotificationList notifications={notifications} />

            </div>
            <div className="flex justify-center my-4 ">
              <button type="button" className="font-medium text-primary hover:underline">
                Tampilkan Semua
              </button>
            </div> */}
          <Tab.Group>
            <Tab.List className="flex justify-between w-full text-lg ">
              <Tab className={({ selected }) => ` flex-1 py-3 focus:ring-0 ${selected ? 'text-primary font-medium' : 'text-gray-500'}`}>

                <div className="relative mx-auto w-min">
                  Pesan
                  {unreadNotifications?.unreadInformasi !== 0 && (
                  <NotificationHint />
                  )}
                </div>

              </Tab>
              <Tab className={({ selected }) => ` flex-1 py-3 focus:ring-0 ${selected ? 'text-primary font-medium ' : 'text-gray-500'}`}>
                <div className="relative mx-auto w-min">
                  Transaksi
                  {unreadNotifications?.unreadTransaksi !== 0 && (
                    <NotificationHint />
                  )}
                </div>

              </Tab>
            </Tab.List>
            <Tab.Panels className="relative px-2 rounded-t-xl ">
              <Tab.Panel
                style={{
                  maxHeight: '65vh',
                  overflow: 'auto',
                }}
                className="mb-4 scrollbar"
              >
                <NotificationList
                  notifications={messagesNotification}
                  notifLenght={4}
                  btnClassName="bg-white my-1 px-4"
                />
                {messagesNotification?.length > 4 && (
                <ClickToMoreBtn onClick={() => router.push('/notification')} />
                )}
              </Tab.Panel>
              <Tab.Panel
                style={{
                  maxHeight: '65vh',
                  overflow: 'auto',
                }}
                className="mb-4 scrollbar"
              >
                <NotificationList
                  notifications={transactionsNotification}
                  notifLenght={4}
                  btnClassName="bg-white my-1 px-4"
                />
                {transactionsNotification?.length > 4 && (
                <ClickToMoreBtn onClick={() => router.push('/notification')} />)}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

        </div>
      </Popover.Panel>
    </Transition>
  </Popover>
)

export default NotificationPopover
