import Link from 'next/link'
import { ReactElement } from 'react'
import Image from 'next/image'
import { BsBookmark } from 'react-icons/bs'
import Avatar from './avatar'
// import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import { Post } from '../res/interface'

export default function PostPreview({
  title,
  banner,
  Comika,
  isPremium,
  // date,
  // excerpt,
  // author,
  slug,
}: Post): ReactElement {
  return (
    <div className="text-textSecondary">
      <div className="xs:mb-5 mb-2 relative">
        <CoverImage
          slug={slug}
          title={title}
          src={banner}
          height={75}
          width={153}
        />
        {isPremium ? (
          <div className="w-16 h-16 absolute bottom-0 ml-2">
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
          <div>
            <BsBookmark className="text-xl md:text-2xl lg:text-3xl " />
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
