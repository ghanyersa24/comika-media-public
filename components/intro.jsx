import Carousel from 'react-elastic-carousel'
import { CMS_NAME } from '../lib/constants'

export default function Intro() {
  return (
    <section className="w-full h-1/2 bg-blue-300">
      <Carousel itemsToShow={1}>
        <div className="w-full bg-red-300 h-1/2">
          1
        </div>
        <div className="w-full bg-gray-300 h-1/2">
          2
        </div>
      </Carousel>
    </section>
  )
}
