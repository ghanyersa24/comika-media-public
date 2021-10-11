import {
  FunctionComponent, useEffect, useState,
} from 'react'
import { useDebounce } from 'use-debounce'

type props = {
	note:string,
  // eslint-disable-next-line no-unused-vars
  onChange:(note:string)=>void,
  isUseLable?:boolean,
}
export const Note: FunctionComponent<props> = ({ note, onChange, isUseLable = true }) => {
  const [currentValue, setCurrentValue] = useState(note)
  const [debouncedValue] = useDebounce(currentValue, 1000)
  useEffect(() => {
    if (debouncedValue !== note) onChange(debouncedValue)
  }, [debouncedValue])
  useEffect(() => {
    setCurrentValue(note)
  }, [note])
  return (
    <div className="flex">
      {isUseLable && <span className="font-medium">Catatan</span>}
      <input onChange={(e) => setCurrentValue(e.target.value)} value={currentValue || ''} type="text" className="ml-2 py-0.5 md:px-4  px-1 md:py-2 w-full" />
    </div>
  )
}

export default Note
