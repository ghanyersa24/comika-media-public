import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { TiTick } from 'react-icons/ti'
import SwipeableViews from 'react-swipeable-views'
import { GetServerSideProps } from 'next'
import { signIn, useSession } from 'next-auth/client'
import { toast } from 'react-toastify'
import { SubsribeItem } from '../../components/card/subscribe-item'
import { ListCustomPrefix } from '../../components/list/list-custom-prefix'
import { ButtonJustifyBetween } from '../../components/button/button-justify-between'
import Layout from '../../components/layout'
import { client } from '../../lib/clientRaw'

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
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleSubscribe = async (subscribePlan: string) => {
    if (!session) {
      toast.info('Harap Login terlebih dahulu', {
        position: 'bottom-right',
        onClose: () => signIn(),
      })
    } else {
      try {
        setIsLoading(true)
        console.log()
        const key = localStorage.getItem('komika-key')
        if (key !== 'undefined') {
          localStorage.getItem('komika-key')
          // eslint-disable-next-line no-unused-vars
          const { msg, data } = await client.post('/payment/subscribe', { package: subscribePlan })
          window.open(data.redirect_url)
        } else {
          router.push('/auth/signin')
        }
        setIsLoading(false)
      } catch (error) {
        setTimeout(() => {
          if (error.msg === 'silahkan lengkapi data profile terlebih dahulu') router.push('/setting/profile')
        }, 3000)
      }
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
  if (isMobile) {
    return (
      <Layout isMobile>
        <div className="relative bg-primary">
          <p className="py-6 text-xl font-bold leading-relaxed text-center text-white ">Subscribe</p>
          <img
            src="/background/Group48393.svg"
            className="absolute top-0 left-0 z-0 h-20"
          />
          <div className="relative max-w-screen-xl min-h-screen pb-16 mx-auto lg:my-24 sm:px-8 bg-bgBlueLight rounded-t-xl">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <SubscriptionMobile content={SubscriptionContent} />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
  return (
    <Layout isMobile={false}>
      <div className="max-w-screen-xl min-h-screen mx-auto mt-8 lg:my-24 sm:px-8">
        <div className="hidden md:block">
          <p className="text-4xl font-medium leading-10 text-center text-blue-900">
            Mengapa kamu harus subscribe?
          </p>
          <p className="text-2xl leading-loose text-center text-gray-500">
            Karena dengan kamu subcribe kamu telah membantu kami agar tetap terus
            bekarya
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          { SubscriptionContent}
        </div>
      </div>
    </Layout>
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
