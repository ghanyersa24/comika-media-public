import React, { ReactElement, useEffect, useState } from 'react'
import { FaChevronRight, FaStore } from 'react-icons/fa'
import { IoMdPin } from 'react-icons/io'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import mobile from 'is-mobile'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import TopNavbarWithBackButton from '../../../components/navigation/top-navbar-with-back-button'
import { client } from '../../../lib/clientRaw'
import { address as addressType, cartType } from '../../../res/interface'
import { API_ENDPOINT_ADD_CART } from '../../../res/api-endpoint'
import { Note } from '../../../components/form/note'
import Layout from '../../../components/layout'
import { numberWithCommas } from '../../../helper/accounting'

import SummaryItemStoreMobile from '../../../components/items/summary-item-store-mobile'
import SummaryItemStoreDektop from '../../../components/items/summary-item-store-dekstop'
import { AdddressListItem } from '../../../components/card/address-list-item'

const isMobile = mobile()

export const Shipment = ():ReactElement => {
  const router = useRouter()
  const { data } = router.query
  const [isListAddressOpen, setIsListAddressOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState('')

  const { data: cartConfirm, mutate } = useSWR<cartType[]>(() => (data ? `/store/confirm-cart?${data}` : null), client.get)
  const { data: customerAddress, mutate: mutateCustomerAddress } = useSWR<addressType[]>(() => (data ? '/account/address' : null), client.get)

  const mainCustomerAddress = customerAddress?.find((ca) => ca.active === true)
  useEffect(() => {
    setSelectedAddress(mainCustomerAddress?.id)
  }, [mainCustomerAddress])

  const handleNoteChange = async (note:string, cartId:string, qty:number) => {
    await client.post(`${API_ENDPOINT_ADD_CART}/${cartId}`, {
      qty,
      note,
      update: true,
    })
    await mutate()
  }
  const sumOfTotal = cartConfirm?.reduce((sum, cart) => sum + cart.total, 0)
  const handleSubmit = () => {
  }

  const handleClickMainAddress = () => {
    if (isMobile) router.push('/setting/select-main-address')
    else setIsListAddressOpen(true)
  }
  const handleChangeMainAddress = (e:React.ChangeEvent<HTMLInputElement>, id:string) => {
    if (e.target.checked) {
      setSelectedAddress(id)
    }
  }

  const handleSubmitChangeMainAddress = async () => {
    await client.put(`/account/address/${selectedAddress}`)
    await mutateCustomerAddress()
    setIsListAddressOpen(false)
  }

  if (isMobile) {
    return (
      <div className=" pb-44 bg-bgGrayLight">
        <TopNavbarWithBackButton title="Pesanan" />
        <div className="mt-20">
          {mainCustomerAddress && (
          <AdddressListItem
            leftElement={<IoMdPin className="flex-shrink-0 mr-2 text-2xl text-primary" />}
            title="Alamat utama"
            address={mainCustomerAddress}
            isMobile={isMobile}
            onClickRight={handleClickMainAddress}
            rightElement={<FaChevronRight />}
          />
          )}
        </div>
        <div className="px-6 m-4 bg-white divide-y rounded-lg shadow-md">
          <div className="flex py-4">
            <FaStore className="flex-shrink-0 mr-4 text-2xl text-primary" />
            <p className="text-base font-medium leading-tight text-black w-28">Karya Pandji</p>
          </div>
          {cartConfirm?.map((cart) => (
            <div className="py-4" key={cart.id}>
              <SummaryItemStoreMobile cart={cart} />
              <Note
                note={cart.note}
                onChange={(note) => handleNoteChange(note, cart.productId, cart.qty)}
              />
            </div>
          ))}
        </div>
        <div className="px-6 py-4 m-4 bg-white divide-y rounded-lg shadow-md">
          <div className="flex">
            <FaStore className="flex-shrink-0 mr-4 text-2xl text-primary" />
            <p className="flex-1 text-base font-medium leading-tight text-black w-28">Karya Pandji</p>
            <FaChevronRight className="self-center flex-shrink-0 mx-2" />
          </div>
        </div>
        <div className="px-6 py-4 m-4 ">
          <div className="flex justify-between">
            <p className="leading-normal text-gray-400 ">Subtotal untuk produk</p>
            <p className="leading-normal text-black ">Rp137.400</p>
          </div>
          <div className="flex justify-between">
            <p className="leading-normal text-gray-400 ">Subtotal pengiriman</p>
            <p className="leading-normal text-black ">{`Rp ${numberWithCommas(sumOfTotal)}`}</p>
          </div>
        </div>
        {/* <BottomFixedSummaryStore /> */}

      </div>
    )
  }

  return (
    <Layout isMobile={isMobile} className="pb-12 md:pt-24 bg-gray-50 ">
      {!isListAddressOpen && mainCustomerAddress && (
        <AdddressListItem
          rightElement={<>Pilih Alamat Utama</>}
          leftElement={<IoMdPin className="flex-shrink-0 mr-4 text-2xl text-primary" />}
          address={mainCustomerAddress}
          isMobile={isMobile}
          title="Alamat Utama"
          onClickRight={handleClickMainAddress}
        />
      )}
      {isListAddressOpen && (
        <div className="py-6 my-6 bg-white rounded-lg shadow-lg mycontainer">
          <div className="flex">
            <div className="flex items-center justify-center mr-2">
              <IoMdPin className="text-2xl text-primary" />
            </div>
            <p className="mb-2 text-sm leading-normal text-gray-500">Pilih Alamat utama</p>
          </div>
          {customerAddress?.map((address) => (
            <div key={address.id} className="my-2">
              <AdddressListItem
                leftElement={(
                  <div className="flex items-center mr-4">
                    <input checked={selectedAddress === address.id} type="radio" name="checked-demo" className="form-radio" onChange={(e) => handleChangeMainAddress(e, address.id)} />
                  </div>
              )}
                address={address}
                isMobile={isMobile}
            // onClickRight={handleChangeMainAddress}
                rightElement="ubah"
                isList
              />
            </div>
          ))}
          <div className="flex justify-end mt-6">
            <button type="button" className="mx-2 btn-primary" onClick={handleSubmitChangeMainAddress}>
              Simpan
            </button>
            <button type="button" className="px-6 mx-2 btn-secondary max-w-max" onClick={() => setIsListAddressOpen(false)}>
              Batal
            </button>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow mycontainer ">
        <table className="w-full ">
          <tr className="border-b">
            <th className="py-4">Produk Disimpan</th>
            <th>Tambah Catatan</th>
            <th>Harga Satuan</th>
            <th>Jumlah</th>
            <th>Subtotal Produk</th>
          </tr>
          <div className="my-4" />
          {cartConfirm?.map((cart) => (
            <tr key={cart.id} className="table-auto">
              <td>
                <SummaryItemStoreDektop cart={cart} />
              </td>
              <td>
                <Note
                  note={cart.note}
                  onChange={(note) => handleNoteChange(note, cart.productId, cart.qty)}
                  isUseLable={false}
                />
              </td>
              <td className="text-right">
                {cart.priceRp}
              </td>
              <td className="text-right">
                {cart.qty}
              </td>
              <td className="text-right">
                {cart.totalRp}
              </td>
            </tr>
          ))}

          <div className="w-full my-4 " />
          <tr className="border-t table-auto">
            <td className="py-4">
              Pengiriman
            </td>
            <td className="px-2">
              Pilih pengiriman terlebih dahulu
            </td>
            <td colSpan={2} className="text-center">
              <Link href="/">
                <a className="font-bold text-primary hover:underline">
                  Ubah
                </a>
              </Link>
            </td>
            <td className="text-right">
              {`Rp ${numberWithCommas(sumOfTotal)}`}
            </td>
          </tr>
          <div className="w-full my-4 " />
          <tr className="text-gray-400">
            <td colSpan={2} />
            <td colSpan={2}>Subtotal Produk</td>
            <td className="text-right">Rp150.000</td>
          </tr>
          <tr className="text-gray-400">
            <td colSpan={2} />
            <td colSpan={2}>Total Ongkos Kirim</td>
            <td className="text-right">Rp150.000</td>
          </tr>
          <tr>
            <td colSpan={2} />
            <td colSpan={2} className="font-medium">Total (2 Produk) : </td>
            <td className="text-2xl font-medium text-right text-primary">Rp150.000</td>
          </tr>
          <div className="w-full my-6 " />

        </table>
      </div>
      <div className="flex justify-end mt-6 mycontainer ">
        <button type="button" className="px-16 btn btn-primary" onClick={handleSubmit}>
          Bayar
        </button>
      </div>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Shipment), {
  ssr: false,
})
