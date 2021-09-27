import { ReactElement } from 'react'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'

const IncreaseDecreaseDeleteButton = ():ReactElement => (
  <div className="flex items-center ">
    <button type="button" className="w-8 h-8 font-bold text-white rounded-full shadow flexCenter bg-primary ">
      <FaMinus />
    </button>
    <span className="px-2 mx-2 border-b">1</span>
    <button type="button" className="w-8 h-8 font-bold text-white rounded-full shadow flexCenter bg-primary">
      <FaPlus />
    </button>
    <button type="button" className="flex items-center justify-center w-8 h-8 ml-4 font-bold border border-gray-300 rounded-lg text-primary ">
      <FaTrash className="text-lg text-gray-500" />
    </button>
  </div>
)

export default IncreaseDecreaseDeleteButton
