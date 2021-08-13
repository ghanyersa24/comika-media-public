import Link from 'next/link'
import { ReactElement, useState, useEffect } from 'react'
import Image from 'next/image'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { FaSpinner } from 'react-icons/fa'
import {
  useSession, signIn,
} from 'next-auth/client'
import Avatar from './avatar'
// import DateFormatter from './date-formatter'
import { CoverImageDekstop } from './cover-image'
import { Post } from '../res/interface'
import { client } from '../lib/clientRaw'

type PostPreviewProps= {
  post : Post, mutate
}

export default function PostPreview({
  post, mutate,
}: PostPreviewProps): ReactElement {
  const {
    slug, title, banner, isPremium, Comika, bookmarked,
  } = post
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
  const isBookmarked = bookmarked === '1'

  return (
    <div className="text-textSecondary">
      <div className="xs:mb-5 mb-2 relative">
        <CoverImageDekstop
          slug={slug}
          title={title}
          src={banner}
          height={75}
          width={153}
        />
        {isPremium ? (
          <div className="lg:w-16 lg:h-16 w-8 h-8 absolute bottom-0 lg:ml-2">
            <Image
              src="/assets/blog/subscribe/premium_badge.png"
              alt="premium badge"
              layout="responsive"
              width={144}
              height={144}
            />
          </div>
        ) : null}
      </div>
      <div className="xs:px-4 divide-y">
        <h3 className=" mb-3 font-bold  xs:leading-loose xs:mt-4 ">
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a className="hover:underline text-gray-700 md:text-2xl text-sm line-clamp-2">
              {title}
            </a>
          </Link>
        </h3>
        <div className="flex items-center justify-between">
          <Avatar
            className="text-xs md:text-base lg:text-lg font-medium pt-2  text-gray-800"
            name={Comika.name}
            picture={Comika.photo}
            date="17 Juni 2021"
            read="10m read"
          />
          <div className="text-xl md:text-2xl lg:text-3xl">
            {isBookmarkLoading ? <FaSpinner className="animate-spin mr-2" /> : (
              <button type="button" onClick={handleBookmark}>
                {isBookmarked
                  ? <BsBookmarkFill className="  " />
                  : <BsBookmark className=" " />}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div> */}
      {/* <p className="text-lg leading-relaxed mb-4">{excerpt}</p> */}
    </div>
  )
}
