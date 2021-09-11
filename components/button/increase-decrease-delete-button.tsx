import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'

const IncreaseDecreaseDeleteButton = (params) => {
  console.log('🚀 ~ file: increase-decrease-button.tsx ~ line 2 ~ IncreaseDecreaseButton ~ params', params)

  return (
    <div className="flex items-center ">
      <button type="button" className="w-8 h-8 shadow rounded-full font-bold flexCenter text-white bg-primary ">
        <FaMinus />
      </button>
      <span className="px-2 border-b mx-2">1</span>
      <button type="button" className="w-8 h-8 shadow rounded-full font-bold flexCenter text-white bg-primary">
        <FaPlus />
      </button>
      <button type="button" className="ml-4 w-8 h-8 border border-gray-300 rounded-lg font-bold flex items-center justify-center text-primary ">
        <FaTrash className="text-gray-500 text-lg" />
      </button>
    </div>
  )
}

export default IncreaseDecreaseDeleteButton
