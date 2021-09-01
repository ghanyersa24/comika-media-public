import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { TiTick } from 'react-icons/ti'
import SwipeableViews from 'react-swipeable-views'
import { GetServerSideProps } from 'next'
import { signIn, useSession } from 'next-auth/client'
import { SubsribeItem } from '../../components/card/subscribe-item'
import { ListCustomPrefix } from '../../components/list/list-custom-prefix'
import { ButtonJustifyBetween } from '../../components/button/button-justify-between'
import { subscribe } from '../../service/subscribe'

const SubscriptionMobile = ({ content: contents }) => (
  <section className="">
    <SwipeableViews
      enableMouseEvents
      className="px-3"
      slideClassName="px-1 overflow-hidden "
    >
      {contents.map((item) => (
        <div key={Math.random()}>
          {item}
        </div>
      ))}
      {/* <div>1</div>
      <div>2</div>
      <div>3</div> */}
    </SwipeableViews>
  </section>
)

export const Subscribe = ({ isMobile }:{isMobile:boolean}): ReactElement => {
  const [session] = useSession()
  if (!session) { signIn() }
  // eslint-disable-next-line no-unused-vars
  const [errorMsgSubscribe, setErrorMsgSubscribe] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleSubscribe = async (subscribePlan: string) => {
    try {
      setIsLoading(true)
      console.log()
      const key = localStorage.getItem('komika-key')
      if (key !== 'undefined') {
        localStorage.getItem('komika-key')
        // eslint-disable-next-line no-unused-vars
        const { msg, data } = await subscribe(subscribePlan)
        window.open(data.redirect_url)
      } else {
        router.push('/auth/signin')
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setErrorMsgSubscribe(error.message)
    }
  }
  const SubscriptionContent = ([
    <SubsribeItem
      onClick={() => isLoading || handleSubscribe('weekly')}
      loading={isLoading}
      title="Satu Paham"
      price="29.900"
      until="Berlaku untuk 7 Hari"
      buttonText="Subscribe Harian"
      headBgColor="bg-gray-300"
      key={1}
    >
      <div className="mt-4">
        <ListCustomPrefix
          prefixIcon={<TiTick className="inline" />}
          label="Keunggulan"
          content={[
            'Bebas baca artikel tanpa jeda',
            'Simpan artikel sampai dengan 10 artikel',
          ]}
        />
        <ListCustomPrefix
          prefixIcon={<TiTick className="inline" />}
          label="Perlu tau"
          content={[
            'Paket ini berlaku untuk 7 hari',
            'Hanya dapat digunakan 1 device',
          ]}
        />
        <div className="mt-8">
          <ButtonJustifyBetween
            leftcontent="Cara pakai"
            rightIcon=">"
            onClick={() => null}
          />
          <ButtonJustifyBetween
            leftcontent="Syarat dan ketentuan"
            rightIcon=">"
            onClick={() => null}
          />
        </div>
      </div>
    </SubsribeItem>,
    <SubsribeItem
      onClick={() => isLoading || handleSubscribe('monthly')}
      loading={isLoading}
      title="Satu Rasa"
      price="124.900"
      until="Berlaku untuk 1 Bulan"
      buttonText="Subscribe Bulanan"
      headBgColor="bg-primary"
      key={2}
    >
      <div className="mt-4">
        <ListCustomPrefix
          prefixIcon={<TiTick className="inline" />}
          label="Keunggulan"
          content={[
            'Bebas baca artikel tanpa jeda',
            'Simpan artikel sampai dengan 10 artikel',
          ]}
        />
        <ListCustomPrefix
          prefixIcon={<TiTick className="inline" />}
          label="Perlu tau"
          content={[
            'Paket ini berlaku untuk 30 hari',
            'Hanya dapat digunakan 1 device',
          ]}
        />
        <div className="mt-8">
          <ButtonJustifyBetween
            leftcontent="Cara pakai"
            rightIcon=">"
            onClick={() => null}
          />
          <ButtonJustifyBetween
            leftcontent="Syarat dan ketentuan"
            rightIcon=">"
            onClick={() => null}
          />
        </div>
      </div>
    </SubsribeItem>,
    <SubsribeItem
      onClick={() => isLoading || handleSubscribe('yearly')}
      loading={isLoading}
      title="Satu Jiwa"
      price="1.499.900"
      until="Berlaku untuk 1 Tahun"
      buttonText="Subscribe Tahunan"
      headBgColor="bg-yellow-400"
      key={3}
    >
      <div className="mt-4">
        <ListCustomPrefix
          prefixIcon={<TiTick className="inline" />}
          label="Keunggulan"
          content={[
            'Bebas baca artikel tanpa jeda',
            'Simpan artikel sampai dengan 10 artikel',
          ]}
        />
        <ListCustomPrefix
          prefixIcon={<TiTick className="inline" />}
          label="Perlu tau"
          content={[
            'Paket ini berlaku untuk 1 Tahun',
            'Hanya dapat digunakan 1 device',
          ]}
        />
        <div className="mt-8">
          <ButtonJustifyBetween
            leftcontent="Cara pakai"
            rightIcon=">"
            onClick={() => null}
          />
          <ButtonJustifyBetween
            leftcontent="Syarat dan ketentuan"
            rightIcon=">"
            onClick={() => null}
          />
        </div>
      </div>
    </SubsribeItem>,
  ]

  )
  return (
    <div className="lg:my-24 sm:px-8 max-w-screen-xl mx-auto min-h-screen">
      <div className="md:block hidden">
        <p className="text-4xl font-medium leading-10 text-center text-blue-900">
          Mengapa kamu harus subscribe?
        </p>
        <p className="text-2xl leading-loose text-center text-gray-500">
          Karena dengan kamu subcribe kamu telah membantu kami agar tetap terus
          bekarya
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {isMobile ? <SubscriptionMobile content={SubscriptionContent} /> : SubscriptionContent}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))

  // will be passed to the page component as props
  return {
    props: {
      isMobile,
    },
  }
}
export default Subscribe
