import * as React from 'react'

function Svg(props) {
  return (
    <svg {...props} width="375" height="159" viewBox="0 0 375 159" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="-49" width="375" height="208" rx="30" fill="#006BC1" />
      <circle cx="21.5" cy="-4.5" r="94.5" fill="url(#paint0_linear)" />
      <circle cx="31" r="68" fill="url(#paint1_linear)" />
      <defs>
        <linearGradient id="paint0_linear" x1="315.5" y1="-126.5" x2="-37" y2="77" gradientUnits="userSpaceOnUse">
          <stop stopColor="#006BC1" />
          <stop offset="1" stopColor="#3A7CBA" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="242.556" y1="-87.7884" x2="-11.0952" y2="58.6455" gradientUnits="userSpaceOnUse">
          <stop stopColor="#006BC1" />
          <stop offset="1" stopColor="#3B84C8" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>

  )
}

export default Svg
