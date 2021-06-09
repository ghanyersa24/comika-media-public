import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
// import Image from 'next/image'
import { CMS_NAME } from '../lib/constants'

export const Item = ({ url }) => (
  <div className="w-full ">
    <img src={url} alt="" className="w-full object-cover" />
  </div>
)

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
export default function Intro() {
  return (
    <section className="mb-4">
      <AutoPlaySwipeableViews enableMouseEvents className="h-4/5" interval={7000}>
        <Item url="https://media-origin.kompas.tv/library/image/thumbnail/1604991035/KALIS1604991035.jpg" />
        <Item url="https://media-origin.kompas.tv/library/image/thumbnail/1615547951/NOPEK_-_KOMIKA_ANGIN-ANGINAN_KOK_MASUK_FINAL1615547951.jpg" />
      </AutoPlaySwipeableViews>
    </section>
  )
}
