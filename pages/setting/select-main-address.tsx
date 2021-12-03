import React, { ReactElement } from 'react'
import useSWR from 'swr'
import mobile from 'is-mobile'
import { IoMdPin } from 'react-icons/io'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import router from 'next/router'
import { AiOutlinePlus } from 'react-icons/ai'
import Head from 'next/head'
import { address as addressType } from '../../res/interface'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'
import { AdddressListItem } from '../../components/card/address-list-item'
import { client } from '../../lib/clientRaw'

const isMobile = mobile()

export const SelectMainAddress = ():ReactElement => {
  console.log('isMobile', isMobile)
  const { data: customerAddress, mutate } = useSWR<addressType[]>('/account/address', client.get)
  const handleChangeMainAddress = async (id:string) => {
    await client.put(`/account/address/${id}`)
    toast.success('Berhasil memilih alamat utama', {
      position: 'bottom-right', autoClose: 2000,
    })
    await mutate()
  }
  const mainCustomerAddress = customerAddress?.find((ca) => ca.active === true)

  if (isMobile) {
    return (
      customerAddress
        ? (
          <div className="min-h-screen pt-16 bg-bgGrayLight">
            <Head>
              <title>Comika Media - Address</title>
            </Head>
            <TopNavbarWithBackButton
              title="Pilih Alamat utama"
              rightComponent={(
                <button type="button" className="px-4 text-gray-100" onClick={() => router.push(`/setting/address/${mainCustomerAddress?.id}`)}>
                  Ubah
                </button>
              )}
            />
            {customerAddress?.map((address) => (
              <AdddressListItem
                leftElement={address.active ? <IoMdPin className="text-2xl text-primary" /> : <div className="mr-6" />}
                title={address.active && 'Alamat utama'}
                address={address}
                isMobile={isMobile}
                onClickRight={handleChangeMainAddress}
                key={address.id}
              />
            ))}
            <button
              type="button"
              onClick={() => router.push('/setting/address/add')}
              className="fixed flex items-center justify-center w-16 h-16 p-0 text-2xl text-white rounded-full bottom-6 right-6 bg-primary"
            >
              <AiOutlinePlus />
            </button>
          </div>
        )
        : null
    )
  }

  return (
    <>
      <Head>
        <title>Comika Media - Address</title>
      </Head>
      <div className="flex items-center justify-center w-full h-screen text-2xl ">
        Tampilan ini hanya untuk mobile
      </div>
    </>
  )
}

export default dynamic(() => Promise.resolve(SelectMainAddress), {
  ssr: false,
})
