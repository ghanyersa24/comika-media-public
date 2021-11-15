import React, { FunctionComponent } from 'react'
import { DateFormatterWithHour } from '../../date-formatter'
import { Note } from '../../form/note'
import SummaryItemStoreMobile from '../../items/summary-item-store-mobile'
import { cartType, Notification } from '../../../res/interface'
import TopNavbarWithBackButton from '../../navigation/top-navbar-with-back-button'

type propsTypes = {
	notification: Notification
}

const NotificationTransaction:FunctionComponent<propsTypes> = ({ notification }) => (
  <div className="relative w-full min-h-screen bg-primary md:bg-white">
    <div className="flex flex-col items-center w-full pt-12 md:py-16 md:bg-primary">
      <img src={notification.img} className=" md:h-80" alt="" />
      <p className="text-lg font-medium text-center text-white md:text-4xl w-max">Terima kasih</p>
      <p className="text-xl text-center text-white w-max">Pesanan kamu berhasil diproses</p>
    </div>
    <div className="max-w-screen-lg px-4 py-4 mt-8 mb-16 prose bg-white md:mx-auto md:my-16 rounded-t-2xl lg:prose-lg">
      <h2 className="">Detail Transaksi</h2>
      <table className="w-full my-4 text-black border-b border-dashed divide-y shadow-none divide-dashed">
        <tr>
          <td className="py-2 text-gray-500 ">Tanggal transaksi</td>
          <td className="font-bold text-right text-gray-700 ">
            <DateFormatterWithHour dateString={notification?.createdAt} />
          </td>
        </tr>
        <tr>
          <td className="py-2 text-gray-500 ">Nomor Transaksi</td>
          <td className="font-bold text-right text-gray-700 ">
            {notification?.Order.code}
          </td>
        </tr>
        <tr>
          <td className="py-2 text-gray-500 ">Kategori</td>
          <td className="font-bold text-right text-gray-700 ">
            xxx
          </td>
        </tr>
        <tr>
          <td className="py-2 text-gray-500 ">Metode Pembayaran</td>
          <td className="font-bold text-right text-gray-700 ">
            {notification?.Order.paymentType || 'Belum dibayar'}
          </td>
        </tr>
        <tr>
          <td className="py-2 text-gray-500 ">Total yang dibayarkan</td>
          <td className="font-bold text-right text-primaryLight ">
            {notification?.Order.priceRp}
          </td>
        </tr>

      </table>
      <div className="my-6">
        <p className="my-2 text-base font-medium text-gray-900 md:my-4 md:font-medium md:text-4xl">Rincian</p>
        {notification?.Order?.details?.map((cart) => (
          <div key={cart.id} className="my-6 md:my-8">
            <div className="flex justify-between text-sm ">
              <SummaryItemStoreMobile cart={cart as cartType} />
              <p className="flex-shrink-0 font-bold md:text-base ">
                <span>
                  {`${cart.quantity} `}
                  <span className="">barang</span>
                </span>
              </p>
            </div>
            <div>
              <Note
                note="xxx"
                isReadOnly
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full mt-12">
        <button type="button" className="px-16 btn-primary">
          Bayar Sekarang
        </button>
      </div>
    </div>
  </div>
)

export default NotificationTransaction
