import * as React from "react";

function SvgYoutube(props) {
  return (
    <svg fill="none" viewBox="0 0 40 40" className={props.className} {...props}>
      <mask
        id="youtube_svg__a"
        width={20}
        height={16}
        x={10}
        y={12}
        maskUnits="userSpaceOnUse"
      >
        <path d="M18 24.5v-9l6 4.5-6 4.5zm10-12.1c-.6-.2-4.3-.4-8-.4s-7.4.19-8 .38c-1.56.52-2 4.02-2 7.62 0 3.59.44 7.1 2 7.61.6.2 4.3.39 8 .39s7.4-.19 8-.39c1.56-.51 2-4.02 2-7.61 0-3.6-.44-7.09-2-7.6z" />
      </mask>
      <g mask="url(#youtube_svg__a)">
        <path d="M0 0h40v40H0z" />
      </g>
    </svg>
  );
}

export default SvgYoutube;
