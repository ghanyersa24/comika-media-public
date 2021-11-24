import { NextPage } from 'next'
import { ReactElement, useEffect, useState } from 'react'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'
import { useDebounce } from 'use-debounce'
import cn from 'classnames'

type props = {
  isPlusDisabled?: boolean,
  isMinusDisabled?: boolean,
  isWithButton?:boolean,
	qyt:number,
  // eslint-disable-next-line no-unused-vars
  onQytChange:(qyt:number)=>void,
}
const IncreaseDecreaseButton:NextPage<props> = ({
  isPlusDisabled = false, isMinusDisabled = false, isWithButton = true, qyt, onQytChange,
}) => {
  const [currentQyt, setCurrentQyt] = useState(qyt)
  const [debouncedQyt] = useDebounce(currentQyt, 500)
  useEffect(() => {
    if (debouncedQyt !== qyt) onQytChange(debouncedQyt)
  }, [debouncedQyt])
  useEffect(() => {
    setCurrentQyt(qyt)
  }, [qyt])

  return (
    <div className="flex items-center ">
      {isWithButton && (
      <button type="button" disabled={currentQyt <= 0 || isMinusDisabled} onClick={() => setCurrentQyt(currentQyt - 1)} className="w-8 h-8 font-bold text-white rounded-full shadow flexCenter bg-primary ">
        <FaMinus />
      </button>
      )}
      <span className={cn('px-2 mx-2',
        { 'border-b': isWithButton },
        { '': !isWithButton })}
      >
        {currentQyt}

      </span>
      {isWithButton && (
        <button type="button" disabled={isPlusDisabled} onClick={() => setCurrentQyt(currentQyt + 1)} className="w-8 h-8 font-bold text-white rounded-full shadow flexCenter bg-primary">
          <FaPlus />
        </button>
      )}
    </div>
  )
}

export const DeleteButton = ({ onDelete }:{onDelete:()=>void}):ReactElement => (
  <button onClick={onDelete} type="button" className="flex items-center justify-center w-8 h-8 ml-4 font-bold border border-gray-300 rounded-lg text-primary ">
    <FaTrash className="text-lg text-gray-500" />
  </button>
)

export default IncreaseDecreaseButton
