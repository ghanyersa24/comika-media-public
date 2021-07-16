import { ReactElement } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaUser,FaTicketAlt } from 'react-icons/fa'
import { RiArticleFill } from 'react-icons/ri'
import { MdLocalGroceryStore,MdShoppingBasket } from 'react-icons/md'

const navigations = [
  {
    name: 'Home', href: '#', icon: <AiFillHome />,
  },
  {
    name: 'Article', href: '#', icon: <RiArticleFill />,
  },
  {
    name: 'Store', href: '#', icon: <MdShoppingBasket />,
  },
  {
    name: 'Subscribe', href: '#', icon: <FaTicketAlt />,
  },
  {
    name: 'Profile', href: '#', icon: <FaUser />, 
  },
]

export const BottomNavbar = ():ReactElement => {

  return(

    <div className="w-full h-screen">
      <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
        <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
          <div id="tabs" className="flex justify-between">
            {navigations.map((navigation, index) => (
              <ButtonItem
                icon={navigation.icon}
                label={navigation.name}
                url={navigation.href}
  
                key={navigation.name}
              />
            ))}
          </div>
        </section>
      </section>
    </div>
  
  )
}

type ButtonItemType = {
icon:any,
label:string,
url:string,

}
export const ButtonItem = ({
  icon, label, url, 
}:ButtonItemType):ReactElement => (

  <a href={url} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
    <div className="text-2xl w-full flex justify-center text-gray-400 my-2 mb-3 ">
    {icon}
    </div>
    {/* <span className="tab tab-home block text-xs">{label}</span> */}
  </a>

)

export default BottomNavbar
