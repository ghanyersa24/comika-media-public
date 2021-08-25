export const ItemStore = (params) => (
  <div className="flex my-2 rounded bg-white rounded-r-lg">
    <div>
      <img
        className="w-20 h-24 rounded-l-lg"
        src="https://via.placeholder.com/82x97"
      />
    </div>
    <div className="flex flex-col py-2 px-4  w-full ">
      <div className="leading-relaxed text-gray-900 font-medium">DVD</div>
      <div className="flex-1 leading-relaxed text-gray-500  text-sm">
        BHINNEKA TUNGGAL TAWA
      </div>
      <div className="text-base font-medium leading-tight text-primary">Rp 150.000</div>
    </div>
  </div>
)
export default ItemStore
