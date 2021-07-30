import Link from 'next/link'
import { useRouter } from 'next/router'

const navigations = [
  {
    name: 'All', url: '',
  },
  {
    name: 'Most populer', url: 'most-populer',
  },
  {
    name: 'Latest', url: 'latest',
  },
]

export const ButtonItem = ({
  label, url, isActive,
}) => (
  <Link href={`/artikel/${url}`}>
    <a className={isActive
      ? 'h-full text-base leading-tight text-gray-800'
      : 'h-full text-base leading-tight text-gray-400 '}
    >
      {label}
    </a>
  </Link>

)
export const OrderBy = () => {
  const router = useRouter()
  const urlComponent = router.route.split('/')
  const subUrlAdmin = urlComponent?.[2] || ''
  return (
    <div className="">
      <div className="flex items-center justify-start flex-1 h-full rounded-lg">
        <div className="flex space-x-5 items-center justify-start flex-1 h-full">
          {navigations.map((navigation) => (
            <ButtonItem
              label={navigation.name}
              url={navigation.url}
              isActive={navigation.url === subUrlAdmin}
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
