import { FunctionComponent } from 'react'

type ItemStoreType = {
  onClick: any
}
export const ItemStore: FunctionComponent<ItemStoreType> = ({ onClick }) => (
  <button type="button" onClick={onClick} className="flex my-2 bg-white rounded-lg w-full h-24 shadow hover:bg-gray-100">
    <div>
      <img
        className="w-20 h-24  rounded-l-lg"
        src="https://via.placeholder.com/82x97"
      />
    </div>
    <div className="flex flex-col py-2 px-4 items-start h-full">
      <div className="leading-relaxed text-gray-900 font-medium">DVD</div>
      <div className="flex-1 leading-relaxed text-gray-500  text-sm">
        BHINNEKA TUNGGAL TAWA
      </div>
      <div className="text-base font-medium leading-tight text-primary">Rp 150.000</div>
    </div>
  </button>
)
export default ItemStore
