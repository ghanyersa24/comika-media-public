import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Link from 'next/link'
import React, { useState } from 'react'
import { Get as GetJumbotron } from '../service/jumbotron'

export const Item = ({ url, link }) => (
  <Link href={link}>
    <a>
      <div className="w-full ">
        <img src={url} alt="Gambar Intro" className="w-full object-cover" />
      </div>
    </a>
  </Link>

)
class Pagination extends React.Component {
  handleClick = (event, index) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onChangeIndex(event.target.value)
  };

  render() {
    const { index, dots } = this.props

    const children = []

    for (let i = 0; i < dots; i += 1) {
      children.push(
        // <PaginationDot key={i} index={i} active={i === index} onClick={this.handleClick} />,
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button type="button" onClick={this.handleClick} value={i} className="rounded-full mx-1 shadow bg-white md:w-4 md:h-4 focus:bg-primary b-0 focus:ring-0 focus:outline-none " />,
      )
    }

    return <div>{children}</div>
  }
}
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
export default function Intro() {
  const [index, setIndex] = useState(0)
  console.log('🚀 ~ file: intro.jsx ~ line 41 ~ Intro ~ index', index)
  const { data: jumbotrons, isLoading } = GetJumbotron()
  if (isLoading) return <div className="w-full h-96 bg-gray-500 animate-pulse" />
  const filteredJumbotrons = jumbotrons.filter((jumbotron) => jumbotron.isDesktop)
  console.log('🚀 ~ file: intro.jsx ~ line 14 ~ Intro ~ data', jumbotrons)
  return (
    <section className="mb-4 mt-16 relative">
      <AutoPlaySwipeableViews
        enableMouseEvents
        className="h-4/5"
        interval={7000}
        index={Number(index)}
        onChangeIndex={(i) => setIndex(i)}
      >
        {filteredJumbotrons.map((jumbotron) => (
          <Item url={jumbotron.img} key={jumbotron.id} link={jumbotron.link} />
        ))}
      </AutoPlaySwipeableViews>
      <div className="absolute bottom-16 flex left-16 w-full ">
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
