import { ReactElement } from 'react'

export const BottomFixedSummaryStore = ():ReactElement => (
  <div className="fixed inset-x-0 bottom-0 px-8 bg-white border-t divide-y shadow-2xl ">
    <div className="flex items-center justify-between py-4">
      <div>
        <div className="text-base">
          Total Bayar
        </div>
        <div className="text-lg font-bold">
          Rp 300.000
        </div>
      </div>
      <div className="text-lg text-gray-500">
        2 Barang
      </div>
    </div>
    <div className="py-4">
      <button type="button" className="w-full py-3 btn-primary ">
        Beli (2)
      </button>
    </div>
  </div>
)

export default BottomFixedSummaryStore
