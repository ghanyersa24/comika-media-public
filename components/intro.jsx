import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { Get as GetJumbotron } from '../service/jumbotron'

export const ItemDekstop = ({ url, link }) => (
  <Link href={link}>
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
class Pagination extends React.Component {
  handleClick = (event) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onChangeIndex(event.target.value)
  };

  render() {
    const { dots } = this.props

    const children = []

    for (let i = 0; i < dots; i += 1) {
      children.push(
        // <PaginationDot key={i} index={i} active={i === index} onClick={this.handleClick} />,
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button type="button" key={i} onClick={this.handleClick} value={i} className="mx-1 bg-white rounded-full shadow md:w-4 md:h-4 focus:bg-primary b-0 focus:ring-0 focus:outline-none " />,
      )
    }

    return <div>{children}</div>
  }
}
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export function IntroDekstop() {
  const [index, setIndex] = useState(0)
  const { data: jumbotrons, isLoading } = GetJumbotron()
  if (isLoading) return <ItemDekstop url={null} link="/" />
  const filteredJumbotrons = jumbotrons?.filter((jumbotron) => jumbotron.isDesktop)
  return (
    <section className="relative mt-16 mb-4">
      <AutoPlaySwipeableViews
        enableMouseEvents
        className="h-4/5"
        interval={7000}
        index={Number(index)}
        onChangeIndex={(i) => setIndex(i)}
      >
        {filteredJumbotrons.map((jumbotron) => (
          <ItemDekstop url={jumbotron.img} key={jumbotron.id} link={jumbotron.link} />
        ))}
      </AutoPlaySwipeableViews>
      <div className="absolute flex bottom-16 left-16 ">
        <Pagination
          dots={filteredJumbotrons.length}
          index={index}
          onChangeIndex={(i) => {
            setIndex(i)
          }}
        />
      </div>
    </section>
  )
}
export const ItemMobile = ({ url, link }) => (
  <Link href={link}>
    <a>
      <div className="w-full">
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
  console.log('🚀 ~ file: intro.jsx ~ line 84 ~ IntroMobile ~ jumbotrons', jumbotrons)
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
