/* eslint-disable max-len */
import React, { ReactElement } from 'react'
import mobile from 'is-mobile'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { useSession } from 'next-auth/client'
import Layout from '../components/layout'
import { API_ENDPOINT_PROFILE } from '../res/api-endpoint'
import { client } from '../lib/clientRaw'
import { Profile } from '../res/interface'

const TopNavbarWithBackButton = dynamic(() => import('../components/navigation/top-navbar-with-back-button'), { ssr: false })

const isMobile = mobile()
export const About = ():ReactElement => {
  const [session] = useSession()
  const { data } = useSWR<Profile>(() => (session ? `${API_ENDPOINT_PROFILE}` : null), client.get)
  return (
    <Layout isMobile={isMobile}>
      <div className="relative pt-16 pb-14 bg-primary md:bg-white ">
        {isMobile && (
          <TopNavbarWithBackButton
            title="About Comika"
          />
        )}
        <div className="relative min-h-screen p-4 mx-auto prose bg-white md:p-6 rounded-t-2xl lg:prose-xl md:shadow md:rounded-lg">
          <h2>
            Selamat Datang
            {data?.name ? `, ${data?.name}` : ''}
          </h2>
          <Image
            src="https://via.placeholder.com/720x720"
            alt="photo profil "
            layout="responsive"
            className="object-cover rounded-md"
            width={336}
            height={187}
          />
          <h3>Selamat Datang di Comikamedia</h3>
          <div className="mt-4 text-lg text-justify ">
            <p>
              Terima kasih sudah mau mendaftarkan email untuk jadi pembaca Comikamedia! Tenang, kami tidak akan gadaikan email kamu untuk jadi database pinjol. Dengan login, kamu akan dapat banyak keuntungan: mulai dari bisa menumpahkan opini lewat kolom komentar, hingga berbagi artikel di media sosial dengan tambahan emoji api-api. Mau simpan artikel untuk dibaca ketika capek dikirimi stiker jayus di grup WhatsApp juga bisa.
            </p>
            <p>
              Setiap harinya akan ada artikel berisi informasi komedi terbaru. Namun, akses lebih luas bisa kamu dapatkan dengan cara berlangganan. Demi reportase yang lebih mendalam, reporter kami mempertaruhkan kesehatan mata dengan riset berjam-jam dari laptop, membelah jalanan untuk mewartakan fenomena komedi dengan lebih dekat, hingga sok asik kepada komika demi mengorek informasi orang dalam. Kalau kamu cinta komedi, harga berlangganan Comikamedia tak lebih mahal dari beli saham, tapi bisa jadi investasi!
            </p>
            <p>
              Akhir kata, direktur kami Pandji Pragiwaksono punya cita-cita: "Comika didirikan agar komika bisa hidup dari karya." Itulah mengapa beliau juga mendirikan Comikamedia, karena reporter kami semua komika. Hanya saja (untuk saat ini) kami lebih jago mewartakan komedi ketimbang berkomedinya
            </p>
            <p>
              Cheers,
            </p>
            <p>
              Redaksi Comikamedia
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
