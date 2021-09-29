import { ReactElement, useEffect, useState } from 'react'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'
import { useDebounce } from 'use-debounce'

type props = {
	qyt:number,
  // eslint-disable-next-line no-unused-vars
  onQytChange:(qyt:number)=>void,
}
const IncreaseDecreaseDeleteButton = ({ qyt, onQytChange }:props) :ReactElement => {
  const [currentQyt, setCurrentQyt] = useState(qyt)
  const [debouncedQyt] = useDebounce(currentQyt, 500)
  useEffect(() => {
    onQytChange(debouncedQyt)
  }, [debouncedQyt])
  useEffect(() => {
    setCurrentQyt(qyt)
  }, [qyt])

  return (
    <div className="flex items-center ">
      <button type="button" disabled={currentQyt <= 0} onClick={() => setCurrentQyt(currentQyt - 1)} className="w-8 h-8 font-bold text-white rounded-full shadow flexCenter bg-primary ">
        <FaMinus />
      </button>
      <span className="px-2 mx-2 border-b">{currentQyt}</span>
      <button type="button" onClick={() => setCurrentQyt(currentQyt + 1)} className="w-8 h-8 font-bold text-white rounded-full shadow flexCenter bg-primary">
        <FaPlus />
      </button>
      <button type="button" className="flex items-center justify-center w-8 h-8 ml-4 font-bold border border-gray-300 rounded-lg text-primary ">
        <FaTrash className="text-lg text-gray-500" />
      </button>
    </div>
  )
}

export default IncreaseDecreaseDeleteButton
