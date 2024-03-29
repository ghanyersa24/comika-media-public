import { ReactChild, ReactElement } from 'react'

type ButtonJustifyBetweenProps={
leftcontent :string, rightIcon:ReactChild, onClick()
}
export const ButtonJustifyBetween = (
  { leftcontent, rightIcon, onClick }:ButtonJustifyBetweenProps,
):ReactElement => (
  <button
    type="button"
    onClick={onClick}
    className="flex justify-between flex-1 w-full h-full py-2 pl-4 text-base leading-loose text-center text-gray-700 border-t-2 border-gray-200 hover:bg-gray-100 md:text-xl"
  >
    <span className="">
      {leftcontent}
    </span>
    <span className="mr-2">{rightIcon}</span>
  </button>
)

export default ButtonJustifyBetween
