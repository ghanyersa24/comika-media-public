import Link from 'next/link'
import { ReactElement } from 'react'
import Image from 'next/image'
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
}:Post):ReactElement {
  return (
    <div className="text-textSecondary">
      <div className="mb-5 relative">
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
      <div className="px-4">
        <Avatar className="text-lg font-medium leading-9 text-gray-600" name={Comika.name} picture={Comika.photo} />
        <h3 className="text-xl mb-3 font-bold  leading-loose mt-4">
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a className="hover:underline text-gray-700 text-2xl line-clamp-2">{title}</a>
          </Link>
        </h3>
        <div className="text-sm leading-tight text-gray-500">
          Selengkapnya...
        </div>
      </div>
      {/* <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div> */}
      {/* <p className="text-lg leading-relaxed mb-4">{excerpt}</p> */}
    </div>
  )
}
