import { ReactElement } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaUser, FaTicketAlt } from 'react-icons/fa'
import { RiArticleFill } from 'react-icons/ri'
import { MdShoppingBasket } from 'react-icons/md'
import { useRouter } from 'next/router'
import Link from 'next/link'

type ButtonItemType = {
  icon:any,
  url:string,
  isActive:boolean
}
export const ButtonItem = ({
  icon, url, isActive,
}:ButtonItemType):ReactElement => (
  <Link href={url || '/'}>
    <a className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
      <div className={isActive
        ? 'text-2xl w-full flex justify-center text-primary mt-2 mb-0 '
        : 'text-2xl w-full flex justify-center text-gray-400 mt-2 mb-3  '}
      >
        {icon}
      </div>
    </a>
  </Link>

)

const navigations = [
  {
    name: 'Home', url: '', icon: <AiFillHome />,
  },
  {
    name: 'Article', url: 'test', icon: <RiArticleFill />,
  },
  {
    name: 'Store', url: 'store', icon: <MdShoppingBasket />,
  },
  {
    name: 'Subscribe', url: 'subscribe', icon: <FaTicketAlt />,
  },
  {
    name: 'Profile', url: 'setting', icon: <FaUser />,
  },
]

export const BottomNavbar = ():ReactElement => {
  const router = useRouter()
  const urlComponent = router.route.split('/')
  const subUrlAdmin = urlComponent?.[1] || ''
  console.log('🚀 ~ file: bottom-navbar.tsx ~ line 31 ~ BottomNavbar ~ subUrlAdmin', subUrlAdmin)

  return (

    <div className="w-full">
      <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
        <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
          <div id="tabs" className="flex justify-between ">
            {navigations.map((navigation) => (
              <ButtonItem
                icon={navigation.icon}
                url={navigation.url}
                isActive={navigation.url === subUrlAdmin}
                key={navigation.name}
              />
            ))}
          </div>
        </section>
      </section>
    </div>

  )
}

export default BottomNavbar
