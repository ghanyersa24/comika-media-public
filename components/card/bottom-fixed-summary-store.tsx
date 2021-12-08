import { FunctionComponent } from 'react'
import { numberWithCommas } from '../../helper/accounting'

export const BottomFixedSummaryStore:FunctionComponent<{total:number,
  qyt:number,
  onSubmit:()=>void,
  isDisabled?:boolean,
 }> = ({
   total, qyt, onSubmit, isDisabled = false,
 }) => (
   <div className="fixed inset-x-0 bottom-0 px-8 bg-white border-t divide-y shadow-2xl ">
     <div className="flex items-center justify-between py-4">
       <div>
         <div className="text-base">
           Total Bayar
         </div>
         <div className="text-lg font-bold">
           Rp
           {' '}
           {numberWithCommas(total)}
         </div>
       </div>
       <div className="text-lg text-gray-500">
         {qyt}
         {' '}
         Barang
       </div>
     </div>
     <div className="py-4">
       <button type="button" className="w-full py-3 btn-primary" onClick={onSubmit} disabled={isDisabled}>
         Beli
       </button>
     </div>
   </div>
 )

export default BottomFixedSummaryStore
