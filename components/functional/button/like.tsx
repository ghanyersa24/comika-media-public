import {
  ReactElement, useState, useEffect, FunctionComponent,
} from 'react'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import {
  useSession, signIn,
} from 'next-auth/client'
// import DateFormatter from './date-formatter'
import { client } from '../../../lib/clientRaw'

type LikeButtonType = {
  liked:number,
  slug:string,
  mutate:any,
  className?:string
}

export const LikeButton : FunctionComponent <LikeButtonType> = ({
  liked, slug, mutate, className = '',
}):ReactElement => {
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false)
  const [prevBookmark, setPrevBookmark] = useState(liked)
  const [session] = useSession()
  const handleBookmark = async () => {
    if (!session) signIn()
    setIsBookmarkLoading(true)
    setPrevBookmark(liked)
    await client.post(`/article/like/${slug}`, [])
    mutate()
  }
  useEffect(() => {
    if (liked !== prevBookmark) {
      setIsBookmarkLoading(false)
    }
  }, [liked])
  const isBookmarked = liked === 1

  return (
    <div className={`text-xl md:text-2xl lg:text-3xl ${className}`}>
      {isBookmarkLoading ? <FaSpinner className="animate-spin mr-2" /> : (
        <button type="button" onClick={handleBookmark}>
          {isBookmarked
            ? <AiFillLike className="  " />
            : <AiOutlineLike className=" " />}
        </button>
      )}
    </div>
  )
}

export default LikeButton
