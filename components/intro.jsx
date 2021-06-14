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
        <Item url="https://cdn-production-thumbor-vidio.akamaized.net/wcfHB49qGZmrBNYaV0IQygpjzC4=/1336x480/filters:quality(75)/vidio-web-prod-headline/uploads/headline/premium_image/7763/vidio-community-cup-ea72d9.jpg" />
        <Item url="https://cdn-production-thumbor-vidio.akamaized.net/_17v0x0yzEKcuvAYfQCNzaZjMyM=/1336x480/filters:quality(75)/vidio-web-prod-headline/uploads/headline/premium_image/8659/facetrix-6669a3.jpg" />
        <Item url="https://cdn-production-thumbor-vidio.akamaized.net/nX53OMjUeqFwTvyIUS_41depbSs=/1336x480/filters:quality(75)/vidio-web-prod-headline/uploads/headline/premium_image/8918/the-break-upper-1c015c.jpg" />
      </AutoPlaySwipeableViews>
    </section>
  )
}
