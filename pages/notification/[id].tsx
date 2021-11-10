import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import useSWR from 'swr'
import { DateFormatterWithHour } from '../../components/date-formatter'
import Note from '../../components/form/note'
import SummaryItemStoreMobile from '../../components/items/summary-item-store-mobile'
import { client } from '../../lib/clientRaw'
import { API_NOTIFICATION } from '../../res/api-endpoint'
import { cartType, Notification } from '../../res/interface'

export const App = ():ReactElement => {
  const router = useRouter()
  const { id } = router.query
  const [session] = useSession()

  const { data: notification } = useSWR<Notification>(() => (session && id ? `${API_NOTIFICATION}/${id}` : null), client.get)
  if (!notification) return <div>Loading...</div>
  console.log('🚀 ~ file: [id].tsx ~ line 43 ~ App ~ notification', notification)
  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full bg-primary md:py-12">
        <img src="/assets/info/Successful-purchase.svg" className=" md:h-80" alt="" />
        <p className="text-lg font-medium text-center text-white md:text-4xl w-max">Terima kasih</p>
        <p className="text-center text-white md:text-2xl h-7 w-max">Pesanan kamu berhasil diproses</p>
      </div>
      <div className="container my-8 md:my-16">
        <p className="text-lg font-bold text-gray-900 md:font-medium md:text-4xl">Detail Transaksi</p>
        <table className="w-full my-4 text-black border-b border-dashed divide-y shadow-none divide-dashed">
          <tr>
            <td className="py-2 text-gray-500 md:text-2xl">Tanggal transaksi</td>
            <td className="font-medium text-right text-gray-700 md:text-2xl">
              <DateFormatterWithHour dateString={notification?.createdAt} />
            </td>
          </tr>
          <tr>
            <td className="py-2 text-gray-500 md:text-2xl">Nomor Transaksi</td>
            <td className="font-medium text-right text-gray-700 md:text-2xl">
              {notification?.OrderId}
            </td>
          </tr>
          <tr>
            <td className="py-2 text-gray-500 md:text-2xl">Kategori</td>
            <td className="font-medium text-right text-gray-700 md:text-2xl">
              xxx
            </td>
          </tr>
          <tr>
            <td className="py-2 text-gray-500 md:text-2xl">Metode Pembayaran</td>
            <td className="font-medium text-right text-gray-700 md:text-2xl">
              xxx
            </td>
          </tr>
          <tr>
            <td className="py-2 text-gray-500 md:text-2xl">Total yang dibayarkan</td>
            <td className="text-lg font-medium text-right text-primaryLight md:text-2xl">
              {notification?.Order.priceRp}
            </td>
          </tr>

        </table>
        <div className="my-6">
          <p className="my-2 text-base font-medium text-gray-900 md:my-4 md:font-medium md:text-4xl">Rincian</p>
          {notification?.Order?.details?.map((cart) => (
            <div key={cart.id} className="my-4 md:my-2">
              <div className="flex justify-between text-sm ">
                <SummaryItemStoreMobile cart={cart as cartType} />
                <p className="flex-shrink-0 font-bold">
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
        <div className="flex justify-center w-full my-6">
          <button type="button" className="px-16 btn-primary">
            Ok
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
