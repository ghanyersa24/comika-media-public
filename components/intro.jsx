import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { Link } from 'next/link'
import { Get as GetJumbotron } from '../service/jumbotron'

export const Item = ({ url, link }) => (
  <a href={link}>
    <div className="w-full ">
      <img src={url} alt="Gambar Intro" className="w-full object-cover" />
    </div>
  </a>
)

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
export default function Intro() {
  const { data: jumbotrons, isLoading } = GetJumbotron()
  if (isLoading) return <div className="w-full h-96 bg-gray-500 animate-pulse" />
  const filteredJumbotrons = jumbotrons.filter((jumbotron) => jumbotron.isDesktop)
  console.log('🚀 ~ file: intro.jsx ~ line 14 ~ Intro ~ data', jumbotrons)
  return (
    <section className="mb-4 mt-16">
      <AutoPlaySwipeableViews enableMouseEvents className="h-4/5" interval={7000}>
        {filteredJumbotrons.map((jumbotron) => (
          <Item url={jumbotron.img} key={jumbotron.id} link={jumbotron.link} />
        ))}
      </AutoPlaySwipeableViews>
    </section>
  )
}
