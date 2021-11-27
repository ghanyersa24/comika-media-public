import { ReactElement } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaUser, FaTicketAlt } from 'react-icons/fa'
import { RiArticleFill } from 'react-icons/ri'
import { MdShoppingBasket } from 'react-icons/md'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

type ButtonItemType = {
  icon:any,
  url:string,
  isActive:boolean,
  // eslint-disable-next-line no-unused-vars
  onClick:(string)=>void
}
export const ButtonItem = ({
  icon, url, isActive, onClick,
}:ButtonItemType):ReactElement => (
  <button onClick={() => onClick(url)} type="button" className="justify-center inline-block w-full pt-2 pb-1 text-center focus:ring-0 focus:text-teal-500 hover:text-teal-500">
    <div className={isActive
      ? 'text-2xl w-full flex justify-center text-primary mt-2 mb-3 '
      : 'text-2xl w-full flex justify-center text-gray-400 mt-2 mb-3  '}
    >
      {icon}
    </div>
  </button>

)

const navigations = [
  {
    name: 'Home', url: '', icon: <AiFillHome />,
  },
  {
    name: 'Article', url: 'article', icon: <RiArticleFill />,
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
  const handleClick = (selectedUrl) => {
    if (selectedUrl === '#') {
      toast.info('Nantikan updatenya segera, hanya di Comika Media', {
        position: 'top-right',
      })
    } else {
      router.push(`/${selectedUrl}`)
    }
  }

  return (

    <div className="w-full">
      <section id="bottom-navigation" className="fixed inset-x-0 bottom-0 z-10 block bg-white shadow md:hidden">
        <section id="bottom-navigation" className="fixed inset-x-0 bottom-0 z-10 block bg-white shadow">
          <div id="tabs" className="flex justify-between ">
            {navigations.map((navigation) => (
              <ButtonItem
                onClick={handleClick}
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
