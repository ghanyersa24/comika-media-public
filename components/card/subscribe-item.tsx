import { ReactChild, ReactElement } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'

type SubsribeItemProps = {
  className?: string;
  children: ReactChild;
  title: string;
  price: string;
  until: string;
  buttonText: string;
  headBgColor: string;
  loading: boolean;
  onClick: () => void;
};

export const SubsribeItem = ({
  className,
  children,
  title,
  price,
  until,
  buttonText,
  headBgColor,
  loading,
  onClick,
}: SubsribeItemProps): ReactElement => {
  console.log(
    '🚀 ~ file: subscribe-item.tsx ~ line 4 ~ SubsribeItem ~ SubsribeItem',
  )
  const classButton = 'lg:mt-8 mt-4 inline-flex items-center justify-center w-full bg-primary rounded hover:bg-primaryDark '
  return (
    <div
      className={`bg-white border-2 rounded-lg  mt-8 border-gray-200 relative ${className}`}
    >
      <div
        className={`rounded-t-lg h-3 relative -top-1   ${headBgColor}`}
      />
      <div className="p-8">
        <p className=" text-2xl lg:text-3xl font-bold  text-primary">{title}</p>
        <p className="text-2xl lg:text-3xl font-medium lg:mt-4  text-gray-700">
          Rp
          {price}
        </p>
        <p className=" text-base lg:text-lg font-medium lg:mt-4  text-gray-500">
          <AiOutlineClockCircle className="inline mr-2" />
          {until}
        </p>
        <button
          type="button"
          className={
            (loading ? 'cursor-not-allowed opacity-50 ' : ' ') + classButton
          }
          onClick={onClick}
        >
          <p className="flex-1 h-full text-2xl leading-loose text-center text-white">
            {buttonText}
          </p>
        </button>
        {children}
      </div>
    </div>
  )
}
export default SubsribeItem

SubsribeItem.defaultProps = {
  className: '',
}
