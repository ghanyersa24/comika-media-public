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
  const classButton = 'lg:mt-8 mt-4 inline-flex items-center justify-center w-full bg-primary rounded-md hover:bg-primaryDark '
  return (
    <div
      className={`bg-white border-2 rounded-lg  mt-8 border-gray-200 relative ${className}`}
    >
      <div
        className={`rounded-t-lg h-3 relative -top-1   ${headBgColor}`}
      />
      <div className="p-4 md:p-8">
        <p className="text-2xl font-bold lg:text-3xl text-primary">{title}</p>
        <p className="text-2xl font-medium text-gray-700 lg:text-3xl lg:mt-4">
          Rp
          {price}
        </p>
        <p className="text-base font-medium text-gray-500 lg:text-lg lg:mt-4">
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
          <p className="flex-1 h-full py-1 text-xl leading-loose text-center text-white">
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
