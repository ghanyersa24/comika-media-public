import Link from 'next/link'
import { MdShoppingCart, MdNotifications } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { ComikamediaThin } from '../../svg'

export const App = () => {
  console.log('🚀 ~ file: search-navigation-mobile.jsx ~ line 14 ~ App ~ App')

  return (
    <div className="bg-primary hp:pb-40 md:bg-red-400 pb-36 pt-4 ">
      <div className="flex justify-between mb-4 px-4 ">
        <Link href="/">
          <a className="hover:underline block "><ComikamediaThin className="h-9" /></a>
        </Link>
        <div className="flex  text-xl text-white items-center">
          <MdShoppingCart />
          <MdNotifications />
        </div>
      </div>
      <div className="w-full px-4">
        <div className="flex items-center justify-start  pl-3  bg-primaryLight bg-opacity-25 rounded">
          <div className="flex items-center justify-end w-full ">
            <AiOutlineSearch className="text-white text-2xl" />
            <input className="ml-2 text-base bg-transparent  leading-normal border-transparent focus:ring-0 text-white w-full h-9" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
