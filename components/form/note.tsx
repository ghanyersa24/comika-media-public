import {
  FunctionComponent, useState,
} from 'react'

type props = {
	note:string,
  isReadOnly?:boolean,
  // eslint-disable-next-line no-unused-vars
  onChange?:(note:string)=>void,
  isUseLable?:boolean,
}
export const Note: FunctionComponent<props> = ({
  note, onChange, isUseLable = true, isReadOnly = false,
}) => {
  const [currentValue, setCurrentValue] = useState(note)
  return (
    <div className="">
      {isUseLable && <span className="font-medium">Catatan</span>}
      <input
        readOnly={isReadOnly}
        disabled={isReadOnly}
        onBlur={() => (onChange ? onChange(currentValue) : null)}
        onChange={(e) => setCurrentValue(e.target.value)}
        value={currentValue || ''}
        type="text"
        className=" py-0.5 md:px-4  px-1 md:py-2 w-full"
      />
    </div>
  )
}

export default Note
