import React, { ReactElement } from 'react'

export const App = ():ReactElement => {
  console.log('App -> params')
  return (
    <div className="relative min-h-screen p-4 bg-bgBlueLight">
      <div className="mb-16">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div className="flex px-4 py-3 my-2 bg-white rounded-lg shadow" key={i}>
            <div className="flex-shrink-0 mt-2 mr-4 bg-blue-200 rounded shadow w-14 h-14">
              {' '}
            </div>
            <div>
              <div className="font-medium">
                Pembayaran berhasil
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Pesanan kamu dengan nomor 123123 berhasil dibayarkan
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 flex justify-center bottom-6 ">
        <button type="button" className="font-medium text-primary hover:underline">
          Tampilkan Semua
        </button>
      </div>
    </div>
  )
}

export default App
