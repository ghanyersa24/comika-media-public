import { ReactChild, ReactElement } from 'react'

type ButtonJustifyBetweenProps={
leftcontent :string, rightIcon:ReactChild, onClick()
}
export const ButtonJustifyBetween = (
  { leftcontent, rightIcon, onClick }:ButtonJustifyBetweenProps,
):ReactElement => {
  console.log('🚀 ~ file: button-justify-between.tsx ~ line 4 ~ ButtonJustifyBetween ~ ButtonJustifyBetween', ButtonJustifyBetween)
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:bg-gray-100 pl-4 py-2 w-full flex flex-1 h-full lg:text-2xl text-lg leading-loose text-center text-gray-700 justify-between border-t-2 border-gray-200"
    >
      <span className="">
        {leftcontent}
      </span>
      <span className="mr-2">{rightIcon}</span>
    </button>
  )
}

export default ButtonJustifyBetween
