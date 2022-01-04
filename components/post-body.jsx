/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react'

function resizeIFrameToFitContent(iFrame, isMobile) {
  iFrame.width = '100%'
  iFrame.height = isMobile ? 240 : 420
}

export default function PostBody({ content, isMobile }) {
  useEffect(() => {
    // or, to resize all iframes:
    const iframes = document.querySelectorAll('iframe')
    iframes.forEach((element) => {
      resizeIFrameToFitContent(element, isMobile)
    })
  })
  return (
    <div className="">
      <div
        className="mx-auto prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: content }}
      />

    </div>
  )
}
