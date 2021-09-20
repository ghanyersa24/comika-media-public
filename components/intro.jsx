import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import virtualize from 'react-swipeable-views-utils/lib/virtualize'
import classnames from 'classnames'
import { Get as GetJumbotron } from '../service/jumbotron'

export const ItemDekstop = ({ url, link }) => (
  <Link href={link || '/'}>
    <a>
      <div className="w-full ">
        {/* <img src={url} alt="Gambar Intro" className="object-cover w-full" /> */}
        <Image
          height={480}
          placeholder="blur"
          blurDataURL="/background/download.webp"
          width={1440}
          layout="responsive"
          src={url || '/background/download.webp'}
          alt="Gambar Intro"
          className="object-cover w-full"
        />
      </div>
    </a>
  </Link>

)

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
const EnhancedSwipeableViews = virtualize(SwipeableViews)

export function IntroDekstop() {
  const [swipeIndex, setSwipeIndex] = useState(0)
  // console.log('IntroDekstop -> swipeIndex', swipeIndex)

  const { data: jumbotrons, isLoading } = GetJumbotron()
  if (isLoading) return <ItemDekstop url={null} link="/" />
  const filteredJumbotrons = jumbotrons?.filter((jumbotron) => jumbotron.isDesktop)

  const slideRenderer = ({ key, index }) => {
    const i = Math.abs(index % filteredJumbotrons?.length)
    return (
      <ItemDekstop
        url={filteredJumbotrons?.[i].img}
        key={key}
        link={filteredJumbotrons?.[i].link}
      />

    )
  }
  return (
    <section className="relative mt-16 mb-4">
      <EnhancedSwipeableViews
        index={Number(swipeIndex)}
        onChangeIndex={(index) => setSwipeIndex(index)}
        slideRenderer={slideRenderer}
        enableMouseEvents
      />
      <button
        type="button"
        onClick={() => setSwipeIndex(swipeIndex - 1)}
        className="absolute inset-y-0 left-0 px-6 text-lg font-medium text-gray-300 hover:bg-black lg:text-2xl focus:ring-0 hover:text-white hover:bg-opacity-20 "
      >
        {'<'}
      </button>
      <button
        type="button"
        onClick={() => setSwipeIndex(swipeIndex + 1)}
        className="absolute inset-y-0 right-0 px-6 text-lg font-medium text-gray-300 hover:bg-black lg:text-2xl focus:ring-0 hover:text-white hover:bg-opacity-20 "
      >
        {'>'}
      </button>
      <div className="absolute flex bottom-16 left-16 ">
        <Pagination
          dots={filteredJumbotrons.length}
          index={Number(swipeIndex)}
          onChangeIndex={(i) => {
            setSwipeIndex(i)
          }}
        />
      </div>
    </section>
  )
}

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
export function IntroMobile() {
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
