/* eslint-disable arrow-body-style */
import Link from 'next/link'
import { FunctionComponent } from 'react'

type ButtonItemProps = {
  label: string,
  url: string,
  isActive:boolean,
  searchParam:string,
  subUrl?:string,
  filterBy?:string,
}

export const ButtonItem: FunctionComponent<ButtonItemProps> = ({
  label, url, isActive, searchParam, subUrl, filterBy,
}) => {
  const filterParams = url ? `${filterBy}=${url}` : ''
  return (
    (<Link
      href={`${subUrl}?${filterParams}${searchParam}`}
      className={isActive
        ? 'h-full text-base leading-tight text-gray-800 font-bold '
        : 'h-full text-base leading-tight text-gray-400 '}>

      {label}

    </Link>)
  );
}

type OrderByProps = {
  filterValue:string,
  searchParam:string,
  navigations:Array<{
    name:string,
    url:string,
  }>,
  subUrl?:string,
  filterBy?:string,
}

export const OrderBy : FunctionComponent<OrderByProps> = ({
  filterValue, searchParam, navigations, subUrl = '/article', filterBy = 'orderBy',
}) => {
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
