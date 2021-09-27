import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import classnames from 'classnames'
import { Get as GetJumbotron } from '../../service/jumbotron'

export const Pagination = ({ dots, index, onChangeIndex }) => {
  // console.log('Pagination -> index', index)
  const indexMod = Math.abs(index % dots)
  // console.log('Pagination -> indexMod', indexMod)
  const children = []
  for (let i = 0; i < dots; i += 1) {
    // console.log('Pagination -> i', i, index)
    children.push(
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
      <button
        type="button"
        key={i}
        onClick={(e) => onChangeIndex(e.target.value)}
        value={i}
        className={classnames('mx-1 bg-white rounded-full shadow md:w-4 md:h-4  b-0 focus:ring-0 focus:outline-none ',
          { 'bg-primary': i === indexMod })}
      />,
    )
  }
  return (
    children
  )
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export const ItemMobile = ({ url, link }) => (
  <Link href={link || '/'}>
    <a>
      <div className="w-full rounded-lg">
        <Image
          height={184}
          width={350}
          layout="responsive"
          placeholder="blur"
          blurDataURL="/background/download.webp"
          src={url || '/background/download.webp'}
          alt="Gambar Intro"
          className="object-cover rounded-lg"
        />
      </div>
    </a>
  </Link>

)
export default function IntroMobile() {
  const [index, setIndex] = useState(0)
  const { data: jumbotrons, isLoading } = GetJumbotron()
  // console.log('🚀 ~ file: intro.jsx ~ line 84 ~ IntroMobile ~ jumbotrons', jumbotrons)
  const filteredJumbotrons = jumbotrons?.filter((jumbotron) => jumbotron.isPhone)
  return (
    <section className="relative mb-4 hp:-mt-36 -mt-28">
      <AutoPlaySwipeableViews
        enableMouseEvents
        className="px-3"
        interval={7000}
        index={Number(index)}
        onChangeIndex={(i) => setIndex(i)}
        slideClassName="px-1"
      >
        {isLoading ? <ItemMobile url={null} link="/" /> : filteredJumbotrons.map((jumbotron) => (
          <ItemMobile url={jumbotron.img} key={jumbotron.id} link={jumbotron.link} />
        ))}
      </AutoPlaySwipeableViews>
      <div className="absolute flex bottom-16 left-16 ">
        <Pagination
          dots={filteredJumbotrons?.length || 1}
          index={index}
          onChangeIndex={(i) => {
            setIndex(i)
          }}
        />
      </div>
    </section>
  )
}
