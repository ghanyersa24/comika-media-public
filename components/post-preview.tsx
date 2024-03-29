import Link from 'next/link'
import React, { ReactElement } from 'react'
import Image from 'next/image'

import Avatar from './avatar'
// import DateFormatter from './date-formatter'
import { ImageInstrinsicPost } from './cover-image-post'
import { Post } from '../res/interface'
import { BookmarkButton } from './functional/button/bookmark'
import { DateFormatterRelative } from './date-formatter'

type PostPreviewProps= {
  post : Post, mutate
}

export default function PostPreview({
  post, mutate,
}: PostPreviewProps): ReactElement {
  const {
    slug, title, banner, isPremium, Comika, bookmarked, createdAt,
  } = post

  return (
    <div className="md:rounded-lg md:shadow-md text-textSecondary">
      <div className="relative">
        <ImageInstrinsicPost
          className="object-cover rounded-t-md aspect-[4/3]"
          slug={slug}
          title={title}
          src={banner}
          height={256}
          width={384}
        />
        {isPremium ? (
          <div className="absolute bottom-0 w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 lg:ml-2">
            <Image
              src="/assets/blog/subscribe/premium_badge.png"
              alt="premium badge"
              layout="responsive"
              width={1}
              height={1}
            />
          </div>
        ) : null}
      </div>
      <div className="divide-y xs:px-4 md:px-4 md:pb-2 ">
        <h3 className="mb-2 font-bold xs:leading-loose xs:mt-4 md:py-2">
          <Link
            as={`/posts/${slug}`}
            href="/posts/[slug]"
            className="text-xs text-gray-700 hp2:text-sm hover:underline md:text-2xl line-clamp-2">

            {title}

          </Link>
        </h3>
        <div className="flex items-center justify-between md:py-2">
          <Avatar
            className="pt-2 text-xs font-medium text-gray-800 md:text-base lg:text-lg"
            name={Comika.name}
            picture={Comika.photo}
            date={<DateFormatterRelative dateString={createdAt} />}
            read="10m read"
          />
          <BookmarkButton bookmarked={bookmarked} slug={slug} mutate={mutate} />
        </div>
      </div>
      {/* <div className="mb-4 text-lg">
        <DateFormatter dateString={date} />
      </div> */}
      {/* <p className="mb-4 text-lg leading-relaxed">{excerpt}</p> */}
    </div>
  );
}
