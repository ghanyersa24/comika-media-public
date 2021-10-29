import React, { ReactElement } from 'react'
import SummaryItemStoreMobile from '../../components/items/summary-item-store-mobile'
import { cartType } from '../../res/interface'

const carts = [
  {
    id: '65d552a2-1ad3-400d-8807-4f03164295ed',
    productId: '0734f6b2-6b4c-45b9-be8c-d1aaf6803352',
    qty: 1,
    img: 'https://pbs.twimg.com/profile_images/1341056153468354574/kcfQnHeI_400x400.jpg',
    note: null,
    name: 'Daftar Polisi',
    weight: 400,
    price: 20000,
    priceRp: 'Rp 20,000',
    total: 20000,
    totalRp: 'Rp 20,000',
  },
  {
    id: '80694d41-1a48-4e4c-a3db-ad37f0b9e6dd',
    productId: '0734f6b2-6b4c-45b9-be8c-d1aaf6803351',
    qty: 1,
    img: 'https://pbs.twimg.com/profile_images/1341056153468354574/kcfQnHeI_400x400.jpg',
    note: null,
    name: 'Kelana',
    weight: 400,
    price: 30000,
    priceRp: 'Rp 30,000',
    total: 30000,
    totalRp: 'Rp 30,000',
  },
]
export const App = ():ReactElement => {
  console.log('App -> params')
  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full bg-primary md:py-12">
        <img src="/assets/info/Successful-purchase.svg" className=" md:h-80" alt="" />
        <p className="text-lg font-medium text-center text-white md:text-4xl w-max">Terima kasih</p>
        <p className="text-center text-white md:text-2xl h-7 w-max">Pesanan kamu berhasil diproses</p>
      </div>
      <div className="container my-8 md:my-16">
        <p className="text-lg font-bold text-gray-900 md:font-medium md:text-4xl">Detail Transaksi</p>
        <table className="w-full my-6 text-black shadow-none">
          <tr className="">
            <td className="text-gray-500 md:text-2xl">Tanggal transaksi</td>
            <td className="text-right text-gray-700 md:text-2xl">9 Mei 2021 16:30:29 WIB</td>
          </tr>
        </table>
        <div className="my-6">
          <p className="my-2 text-base font-medium text-gray-900 md:my-4 md:font-medium md:text-4xl">Rincian</p>
          {carts.map((cart) => (
            <div key={cart.id} className="flex justify-between my-1 md:my-2 ">
              <SummaryItemStoreMobile cart={cart} />
              <p className="font-bold">{`${cart.qty} barang`}</p>
            </div>
          ))}
        </div>
        <div className="my-6">
          <p className="my-2 text-base font-medium text-gray-900 md:font-medium md:text-4xl">Catatan</p>
          <textarea className="w-full p-4 rounded-md" value="Ukuran S dan warna hitam ya min, Terima kasih" />
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
