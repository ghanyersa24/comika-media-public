import React, { FunctionComponent } from 'react'
import { Dialog } from '@headlessui/react'
import { EstimateDelivery, Notification } from '../../res/interface'
import { NotificationList } from '../list/notification-list'

type props = {
	notifications: Notification[]
	isOpen: boolean;
	onClose: () => void;
	onClick: (id:string) => void;
};
export const NotificationModal: FunctionComponent<props> = ({
  notifications,
  isOpen,
  onClose,
  onClick,
}) => (
  <Dialog
    open={isOpen}
    id="xx"
    onClose={onClose}
    className="fixed z-50 max-w-lg mx-auto overflow-y-auto bg-white border-t shadow-md right-16 top-20 md:border-t-0 md:rounded-lg "
  >
    <Dialog.Overlay />
    <Dialog.Title>
      <div className="px-4 py-4 lg:px-6">
        <p className="text-xl font-bold">Notifikasi</p>
      </div>
    </Dialog.Title>
    <Dialog.Description>
      <div className="relative ">
        <div className="">
          <NotificationList notifications={notifications} />
        </div>
        <div className="flex justify-center my-4 ">
          <button type="button" className="font-medium text-primary hover:underline">
            Tampilkan Semua
          </button>
        </div>
      </div>

    </Dialog.Description>

    {/* <button type="button" className="w-full mt-4 btn-primary" onClick={onClose}>
      Simpan
    </button> */}
  </Dialog>
)

export default NotificationModal
