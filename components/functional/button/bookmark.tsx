import {
  ReactElement, useState, useEffect, FunctionComponent,
} from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import {
  useSession, signIn,
} from 'next-auth/client'
// import DateFormatter from './date-formatter'
import { client } from '../../../lib/clientRaw'

type BookmarkButtonType = {
  bookmarked:number,
  slug:string,
  mutate:any,
  className?:string
}

export const BookmarkButton : FunctionComponent <BookmarkButtonType> = ({
  bookmarked, slug, mutate, className = '',
}):ReactElement => {
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false)
  const [prevBookmark, setPrevBookmark] = useState(bookmarked)
  const [session] = useSession()
  const handleBookmark = async () => {
    if (!session) signIn()
    setIsBookmarkLoading(true)
    setPrevBookmark(bookmarked)
    await client.post(`/article/bookmark/${slug}`, [])
    mutate()
  }
  useEffect(() => {
    if (bookmarked !== prevBookmark) {
      setIsBookmarkLoading(false)
    }
  }, [bookmarked])
  const isBookmarked = bookmarked === 1

  return (
    <div className={`text-xl md:text-2xl lg:text-3xl ${className}`}>
      {isBookmarkLoading ? <BsBookmarkFill className="animate-pulse" /> : (
        <button type="button" onClick={handleBookmark}>
          {isBookmarked
            ? <BsBookmarkFill className="" />
            : <BsBookmark className="" />}
        </button>
      )}
    </div>
  )
}

export default BookmarkButton
