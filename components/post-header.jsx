import {
  AiFillEye, AiOutlineShareAlt,
} from 'react-icons/ai'
import React, { } from 'react'
import { BackButtonAbsoluteMobile } from './button/back-button-absolute-mobile'
import Avatar from './avatar'
import DateFormatter from './date-formatter'
import { ImageInstrinsicPost, ImageResponsive } from './cover-image-post'
import PostTitle from './post-title'

export function PostHeaderDekstop({
  title, coverImage, date, Comika, views, attribution, shared,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="flex justify-between md:mb-12">
        <div className="flex flex-row items-center">
          <div>
            <Avatar className="text-lg font-medium leading-9 text-primary " name={Comika.name} picture={Comika.photo} />
          </div>
          <div className="w-2 h-2 ml-4 mr-2 bg-gray-500 rounded-full" />
          <div className="text-lg text-gray-500 ">
            Diterbitkan pada
            <span className="ml-2"><DateFormatter dateString={date} /></span>
          </div>
        </div>
        <div className="flex text-lg font-medium leading-9 text-gray-500">
          <div className="inline-flex space-x-1.5 items-center justify-end w-16 h-9  ">
            <AiFillEye />
            <p>{views}</p>
          </div>
          <div className="inline-flex space-x-1.5 items-center justify-end w-16 h-9 ">
            <AiOutlineShareAlt />
            <p>{shared}</p>
          </div>
          {/* <button type="button"
          className="inline-flex space-x-1.5 items-center justify-end w-16 h-9">
            <AiOutlineShareAlt />
            <p>263</p>
          </button> */}
          {/* <SocialMediaShareButton size={32} /> */}
        </div>
      </div>
      <div className="mb-8 md:mb-12 sm:mx-0">
        <ImageInstrinsicPost
          className="object-cover rounded-md  aspect-[2/1] "
          title={title}
          src={coverImage}
          height={620}
          width={1240}
        />
        {
          attribution !== '' && (
          <p className="text-lg font-medium leading-9 text-justify text-gray-500">
            Source :
            {'  '}
            {attribution}
          </p>
          )
        }
      </div>
      <div className="max-w-2xl mx-auto">
        {/* <div className="block mb-6 md:hidden">
          <Avatar name={author.name} picture={author.picture} />
        </div> */}

      </div>
    </>
  )
}

export function PostHeaderMobile({
  title, coverImage, date, Comika, views, shared,
}) {
  return (
    <div className="">
      <div className="relative sm:mx-0">
        <BackButtonAbsoluteMobile />
        <div className="z-10 relaive ">
          <ImageResponsive title={title} src={coverImage} height={2} width={3} />
        </div>

        <div className="relative z-20 px-4 py-2 mx-5 -mt-16 bg-white rounded-lg shadow">
          <h1 className="text-lg font-bold leading-relaxed text-gray-800">
            {title}
          </h1>
          <div className="mt-2 text-base leading-loose text-gray-500 ">
            <DateFormatter dateString={date} />
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 ml-4 inline-block " />
            {Comika.name}
          </div>
          <div className="flex text-lg font-medium leading-9 text-gray-500 ">
            <div className="inline-flex space-x-1.5 items-center justify-start w-16 h-9  ">
              <AiFillEye />
              <p>{views}</p>
            </div>
            <div className="inline-flex space-x-1.5 items-center justify-start w-16 h-9 ">
              <AiOutlineShareAlt />
              <p>{shared}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
