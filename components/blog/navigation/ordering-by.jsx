import Link from 'next/link'

const navigations = [
  {
    name: 'All', url: 'createdAt',
  },
  {
    name: 'Most populer', url: 'popular',
  },
]

export const ButtonItem = ({
  label, url, isActive,
}) => (
  <Link href={`/article?orderBy=${url}`}>
    <a className={isActive
      ? 'h-full text-base leading-tight text-gray-800'
      : 'h-full text-base leading-tight text-gray-400 '}
    >
      {label}
    </a>
  </Link>

)
export const OrderBy = ({ orderBy }) => {
  console.log('🚀 ~ file: ordering-by.jsx ~ line 27 ~ OrderBy ~ orderBy', orderBy)

  return (
    <div className="">
      <div className="flex items-center justify-start flex-1 h-full rounded-lg">
        <div className="flex space-x-5 items-center justify-start flex-1 h-full">
          {navigations.map((navigation) => (
            <ButtonItem
              label={navigation.name}
              url={navigation.url}
              isActive={navigation.url === orderBy}
              key={navigation.name}
            />
          ))}
          {/* <p className=" h-full text-base leading-tight text-gray-800">All</p>
          <p className=" h-full text-base leading-tight text-gray-400">Most populer</p>
          <p className=" h-full text-base leading-tight text-gray-400">Latest</p> */}
        </div>
      </div>
    </div>
  )
}

export default OrderBy
