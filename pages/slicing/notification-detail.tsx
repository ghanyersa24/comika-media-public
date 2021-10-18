import React, { ReactElement } from 'react'

export const App = ():ReactElement => {
  console.log('App -> params')
  return (
    <div>
      <div className="flex justify-center bg-primary md:py-12">
        <div>
          <img src="/assets/info/Successful-purchase.svg" className=" md:h-80" alt="" />
          <p className="text-4xl font-medium text-center text-white" style={{ width: 414, height: 38.13 }}>Terima kasih</p>
          <p className="text-2xl text-center text-white w-96 h-7">Pesanan kamu berhasil diproses</p>
        </div>
      </div>
      <div className="container my-16">
        <p className="text-4xl font-medium text-gray-900">Detail Transaksi</p>
        <table className="w-full my-6 text-black shadow-none">
          <tr className="">
            <td className="text-2xl text-gray-500">Tanggal transaksi</td>
            <td className="text-2xl text-right text-gray-700">9 Mei 2021 16:30:29 WIB</td>
          </tr>
        </table>
        <div className="my-6">
          <textarea rows={4} className="w-full p-4 rounded-md" placeholder="Ukuran S dan warna hitam ya min, Terima kasih" />
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
