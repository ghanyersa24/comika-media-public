import { ReactElement } from 'react'
import Container from '../../components/container-padding'
import { SubsribeItem } from '../../components/card/subscribe-item'

export const Subscribe = ():ReactElement => {
  console.log('🚀 ~ file: index.tsx ~ line 10 ~ Subscribe ~ Subscribe')
  return (
    <Container className="mt-24 min-h-screen">
      <p className="text-4xl font-medium leading-10 text-center text-blue-900">Mengapa kamu harus subscribe?</p>
      <p className="text-2xl leading-loose text-center text-gray-500">Karena dengan kamu subcribe kamu telah membantu kami agar tetap terus bekarya</p>
      <div className="grid grid-cols-3 gap-4">
        <SubsribeItem className="h-full mt-8">
          x
        </SubsribeItem>
      </div>
    </Container>
  )
}
export default Subscribe
