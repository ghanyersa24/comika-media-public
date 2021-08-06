import {
  AiFillEye, AiFillCopy,
} from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import Router from 'next/router'
import {
  FacebookShareButton, WhatsappShareButton, TwitterShareButton, LineShareButton,
  WhatsappIcon,
  FacebookIcon, TwitterIcon, LineIcon,
} from 'react-share'
import React, { useState, useEffect } from 'react'

import Avatar from './avatar'
import DateFormatter from './date-formatter'
import { CoverImageDekstop, CoverImageMobile } from './cover-image'
import PostTitle from './post-title'

export const SocialMediaShareButton = ({ size }) => {
  const [href, setHref] = useState('')
  console.log('🚀 ~ file: post-header.jsx ~ line 22 ~ href', href)
  useEffect(() => {
    setHref(window.location.href)
  }, [])
  const handleCopy = () => {
    navigator.clipboard.writeText('Copy this text to clipboard')
  }
  const handleShared = (type) => {
    console.log('🚀 ~ file: post-header.jsx ~ line 31 ~ handleShared ~ handleShared', type)
  }

  return (
    <span className="flex items-center">
      <WhatsappShareButton url={href} quote="quote" onShareWindowClose={() => handleShared('wa')}>
        <WhatsappIcon size={size} round className="mr-2" />
      </WhatsappShareButton>
      <FacebookShareButton url={href} quote="quote" onShareWindowClose={() => handleShared('fb')}>
        <FacebookIcon size={size} round className="mr-2" />
      </FacebookShareButton>
      <TwitterShareButton url={href} quote="quote" onShareWindowClose={() => handleShared('tw')}>
        <TwitterIcon size={size} round className="mr-2" />
      </TwitterShareButton>
      <LineShareButton url={href} quote="quote" onShareWindowClose={() => handleShared('line')}>
        <LineIcon size={size} round className="mr-2" />
      </LineShareButton>
      <button className="bg-primary text-white text-xl rounded-full flex items-center justify-center" type="button" style={{ height: size, width: size }} onClick={() => handleCopy()}>
        <AiFillCopy style={{ fontSize: size - 8 }} />
      </button>
    </span>
  )
}
export function PostHeaderDekstop({
  title, coverImage, date, Comika,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className=" md:mb-12 flex justify-between ">
        <div className="flex flex-row items-center">
          <div>
            <Avatar className="text-primary text-lg font-medium leading-9 " name={Comika.name} picture={Comika.photo} />
          </div>
          <div className="w-2 h-2 bg-gray-500 rounded-full mr-2 ml-4" />
          <div className=" text-lg  text-gray-500">
            Diterbitkan pada
            <span className="ml-2"><DateFormatter dateString={date} /></span>
          </div>
        </div>
        <div className="text-lg font-medium leading-9 text-gray-500 flex">
          <button type="button" className="inline-flex space-x-1.5 items-center justify-end w-16 h-9 mr-4 ">
            <AiFillEye />
            <p>263</p>
          </button>
          {/* <button type="button"
          className="inline-flex space-x-1.5 items-center justify-end w-16 h-9">
            <AiOutlineShareAlt />
            <p>263</p>
          </button> */}
          <SocialMediaShareButton size={32} />
        </div>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImageDekstop title={title} src={coverImage} height={620} width={1240} />
      </div>
      <div className="max-w-2xl mx-auto">
        {/* <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div> */}
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}

export function PostHeaderMobile({
  title, coverImage, date, Comika,
}) {
  return (
    <div className="">
      <div className="sm:mx-0 relative">
        <button onClick={() => Router.back()} type="button" className="bg-white p-2 absolute top-0 z-20 mt-6 ml-6 text-xl rounded-lg shadow">
          <BiArrowBack />
        </button>
        <div className="relaive z-10 ">
          <CoverImageMobile title={title} src={coverImage} height={720} width={720} />
        </div>

        <div className="bg-white shadow rounded-lg relative z-20 -mt-16 mx-5 px-4 py-2">
          <h1 className="text-lg font-bold leading-relaxed text-gray-800">
            {title}
          </h1>
          <div className="text-base leading-loose text-gray-500 mt-2 ">
            <DateFormatter dateString={date} />
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 ml-4 inline-block " />
            {Comika.name}
          </div>
          <div className="text-lg font-medium leading-9 text-gray-500 flex justify-between">
            <div className="inline-flex space-x-1.5 items-center justify-start w-16 h-9">
              <AiFillEye />
              <p>263</p>
            </div>
            <SocialMediaShareButton size={24} />
          </div>
        </div>
      </div>
    </div>
  )
}
