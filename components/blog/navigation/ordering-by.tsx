import Link from 'next/link'
import { FunctionComponent } from 'react'

export const ButtonItem: FunctionComponent = ({
  label, url, isActive, searchParam, subUrl, filterBy,
}) => {
  const filterParams = url ? `${filterBy}=${url}` : ''
  return (
    <Link href={`${subUrl}?${filterParams}${searchParam}`}>
      <a className={isActive
        ? 'h-full text-base leading-tight text-gray-800 font-bold '
        : 'h-full text-base leading-tight text-gray-400 '}
      >
        {label}
      </a>
    </Link>

  )
}
export const OrderBy : FunctionComponent = ({
  filterValue, searchParam, navigations, subUrl = '/article', filterBy = 'orderBy',
}) => {
  console.log('🚀 ~ file: ordering-by.jsx ~ line 19 ~ navigations', navigations.url, filterValue)
  return (
    <div className="">
      <div className="flex items-center justify-start flex-1 h-full rounded-lg">
        <div className="flex items-center justify-start flex-1 h-full space-x-5">
          {navigations?.map((navigation) => (
            <ButtonItem
              label={navigation.name}
              url={navigation.url}
              searchParam={searchParam}
              isActive={navigation.url === filterValue}
              subUrl={subUrl}
              filterBy={filterBy}
              key={navigation.name}
            />
          ))}
          {/* <p className="h-full text-base leading-tight text-gray-800 ">All</p>
            <p className="h-full text-base leading-tight text-gray-400 ">Most populer</p>
            <p className="h-full text-base leading-tight text-gray-400 ">Latest</p> */}
        </div>
      </div>
    </div>
  )
}

export default OrderBy
