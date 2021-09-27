import {
  AiFillCopy,
} from 'react-icons/ai'
import {
  FacebookShareButton, WhatsappShareButton, TwitterShareButton, LineShareButton,
  WhatsappIcon,
  FacebookIcon, TwitterIcon, LineIcon,
} from 'react-share'
import React, { useState, useEffect, ReactElement } from 'react'
import { client } from '../../../lib/clientRaw'

export const SocialMediaShareButton = ({ size, slug }:
   { size: number, slug:string }):ReactElement => {
  const [href, setHref] = useState('')
  useEffect(() => {
    setHref(window.location.href)
  }, [])
  const handleCopy = () => {
    navigator.clipboard.writeText(href)
  }
  const handleShared = async (type) => {
    await client.post(`/article/share/${slug}`, {
      shareTo: type,
    })
  }

  return (
    <span className="flex items-center">
      <WhatsappShareButton url={href} onShareWindowClose={() => handleShared('WA')}>
        <WhatsappIcon size={size} round className="mr-2" />
      </WhatsappShareButton>
      <FacebookShareButton url={href} onShareWindowClose={() => handleShared('GB')}>
        <FacebookIcon size={size} round className="mr-2" />
      </FacebookShareButton>
      <TwitterShareButton url={href} onShareWindowClose={() => handleShared('TW')}>
        <TwitterIcon size={size} round className="mr-2" />
      </TwitterShareButton>
      <LineShareButton url={href} onShareWindowClose={() => handleShared('LINE')}>
        <LineIcon size={size} round className="mr-2" />
      </LineShareButton>
      <button className="flex items-center justify-center text-xl text-white rounded-full bg-primary" type="button" style={{ height: size, width: size }} onClick={() => handleCopy()}>
        <AiFillCopy style={{ fontSize: size - 8 }} />
      </button>
    </span>
  )
}

export default SocialMediaShareButton
