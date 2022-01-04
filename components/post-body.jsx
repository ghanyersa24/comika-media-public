/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react'

function resizeIFrameToFitContent(iFrame) {
  iFrame.width = '100%'
  iFrame.height = '420'
}

export default function PostBody({ content }) {
  useEffect(() => {
    // or, to resize all iframes:
    const iframes = document.querySelectorAll('iframe')
    iframes.forEach((element) => {
      resizeIFrameToFitContent(element)
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
