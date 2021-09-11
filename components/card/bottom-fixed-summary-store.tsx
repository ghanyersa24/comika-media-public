export const BottomFixedSummaryStore = (params) => {
  console.log('🚀 ~ file: bottom-fixed-summary-store.tsx ~ line 2 ~ BottomFixedSummaryStore ~ params', params)
  return (
    <div className="px-8 bg-white divide-y fixed inset-x-0 bottom-0 shadow-2xl border-t ">
      <div className="flex items-center justify-between py-4">
        <div>
          <div className="text-base">
            Total Bayar
          </div>
          <div className="font-bold text-lg">
            Rp 300.000
          </div>
        </div>
        <div className="text-gray-500 text-lg">
          2 Barang
        </div>
      </div>
      <div className="py-4">
        <button type="button" className="btn-primary w-full py-3 ">
          Beli (2)
        </button>
      </div>
    </div>
  )
}

export default BottomFixedSummaryStore
