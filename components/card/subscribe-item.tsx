import { ReactChild, ReactElement } from 'react'

type SubsribeItemProps = {
className?: string,
children: ReactChild,
title: string,
price: string,
}

export const SubsribeItem = ({
  className, children, title, price,
}: SubsribeItemProps): ReactElement => {
  console.log('🚀 ~ file: subscribe-item.tsx ~ line 4 ~ SubsribeItem ~ SubsribeItem')
  return (
    <div className={`bg-white border-2 rounded-lg border-gray-200 relative ${className}`}>
      <div className="bg-gray-300  rounded-tl-lg rounded-tr-lg h-3 -m-0.5 " />
      <div className="p-4">
        <p className="text-3xl font-bold  text-blue-700">Satu Paham</p>
        <p className="text-3xl font-medium mt-2  text-gray-700">Rp29.900</p>
        <p className="text-lg font-medium mt-2  text-gray-500">Berlaku untuk 7 Hari</p>
        <button type="button" className="mt-4 inline-flex items-center justify-center w-full bg-primary rounded hover:bg-primaryDark">
          <p className="flex-1 h-full text-2xl leading-loose text-center text-white">Subscribe Harian</p>
        </button>
      </div>
      {children}
    </div>
  )
}
export default SubsribeItem

SubsribeItem.defaultProps = {
  className: '',
}
