import React, { ReactElement, useEffect, useState } from 'react'
import { FaChevronRight, FaShippingFast, FaStore } from 'react-icons/fa'
import { IoMdPin } from 'react-icons/io'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import mobile from 'is-mobile'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import TopNavbarWithBackButton from '../../../components/navigation/top-navbar-with-back-button'
import { client } from '../../../lib/clientRaw'
import {
  address as addressType, CartEstimation, cartType, EstimateDelivery,
} from '../../../res/interface'
import { API_ENDPOINT_ADD_CART } from '../../../res/api-endpoint'
import { Note } from '../../../components/form/note'
import Layout from '../../../components/layout'
import { numberWithCommas } from '../../../helper/accounting'

import SummaryItemStoreMobile from '../../../components/items/summary-item-store-mobile'
import SummaryItemStoreDektop from '../../../components/items/summary-item-store-dekstop'
import { AdddressListItem } from '../../../components/card/address-list-item'
import { SelectCourier } from '../../../components/modal/select-courier'
import { BottomFixedSummaryStore } from '../../../components/card/bottom-fixed-summary-store'

const isMobile = mobile()

export const Shipment = ():ReactElement => {
  const router = useRouter()
  const { data } = router.query

  const [isLoading, setIsLoading] = useState(false)

  const [isListAddressOpen, setIsListAddressOpen] = useState(false)
  console.log('isListAddressOpen', isListAddressOpen)
  const [selectedAddressId, setSelectedAddressId] = useState<string>('')
  const [selectedCourier, setSelectedCourier] = useState<EstimateDelivery>()
  console.log('selectedCourier', selectedCourier)
  const [isModalSelectCourierOpen, setIsModalSelectCourierOpen] = useState(false)

  const { data: cartConfirm, mutate } = useSWR<cartType[]>(() => (data ? `/store/confirm-cart?${data}` : null), client.get)
  const { data: customerAddress, mutate: mutateCustomerAddress } = useSWR<addressType[]>(() => (data ? '/account/address' : null), client.get)
  const mainCustomerAddress = customerAddress?.find((ca) => ca.active === true)
  console.log('mainCustomerAddress', mainCustomerAddress)

  const { data: estimation, mutate: mutateEstimation } = useSWR<CartEstimation>(() => ((data && mainCustomerAddress) ? `/store/cart-estimation?${data}` : null), client.get)
  console.log('estimation', estimation)

  useEffect(() => {
    setSelectedAddressId(mainCustomerAddress?.id)
    mutateEstimation()
    setSelectedCourier(null)
  }, [mainCustomerAddress?.id])

  const handleNoteChange = async (note:string, cartId:string, qty:number) => {
    await client.post(`${API_ENDPOINT_ADD_CART}/${cartId}`, {
      qty,
      note,
      update: true,
    })
    await mutate()
  }
  const sumOfCarts = cartConfirm?.reduce((sum, cart) => sum + cart.qty, 0)
  const sumOfTotal = cartConfirm?.reduce((sum, cart) => sum + cart.total, 0)

  const handleClickMainAddress = () => {
    if (isMobile) router.push('/setting/select-main-address')
    else setIsListAddressOpen(true)
  }
  const handleChangeMainAddress = (e:React.ChangeEvent<HTMLInputElement>, id:string) => {
    if (e.target.checked) {
      setSelectedAddressId(id)
    }
  }

  const handleSubmitChangeMainAddress = async () => {
    await client.put(`/account/address/${selectedAddressId}`)
    await mutateCustomerAddress()
    setIsListAddressOpen(false)
  }

  const canSubmit = selectedCourier && mainCustomerAddress
  const txtTotalPengiriman = `Rp ${numberWithCommas(selectedCourier?.cost)}`
  const txtSubTotalProduk = estimation?.detail.subtotalRp
  const total = sumOfTotal + selectedCourier?.cost

  const handleSubmit = async () => {
    setIsLoading(true)
    const { data: submitedData, msg } = await client.post(`/store/cart-checkout?${data}`, { courierId: selectedCourier?.id })
    toast.success(msg, {
      position: 'bottom-right',
      onClose: () => window?.open(submitedData.redirect_url),
    })
    setIsLoading(false)
  }

  if (isMobile) {
    return (
      <div className=" pb-44 bg-bgBlueLight">
        <TopNavbarWithBackButton title="Pesanan" />
        <div className="mt-20">
          {mainCustomerAddress ? (
            <AdddressListItem
              leftElement={<IoMdPin className="flex-shrink-0 mr-2 text-2xl text-primary" />}
              title="Alamat utama"
              address={mainCustomerAddress}
              isMobile={isMobile}
              onClickRight={handleClickMainAddress}
              rightElement={<FaChevronRight />}
            />

          )
            : (
              <div className="mx-4">
                <button type="button" className="w-full btn-primary" onClick={handleClickMainAddress}>Pilih Alamat Pengiriman</button>
              </div>
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
              <div className="mt-2">
                <Note
                  note={cart.note}
                  onChange={(note) => handleNoteChange(note, cart.productId, cart.qty)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="px-4">
          <button onClick={() => setIsModalSelectCourierOpen(true)} type="button" className="block w-full px-6 py-4 text-left bg-white rounded-lg shadow-md">
            <div className="flex w-full ">
              <FaShippingFast className="flex-shrink-0 mr-4 text-2xl text-primary" />
              <div className="flex-1 text-base ">
                {selectedCourier ? (
                  <div className="font-medium leading-tight text-black">
                    <p>{`${selectedCourier.service}`}</p>
                    <p className="mt-2 font-normal text-gray-500">
                      Estimasi diterima
                      {' '}
                      {selectedCourier.estDate}
                    </p>
                  </div>
                )
                  : (
                    <div className="font-medium leading-tight text-black ">
                      Pilih Pengiriman
                    </div>
                  )}
              </div>
              <FaChevronRight className="self-center flex-shrink-0 mx-2" />
            </div>
          </button>
        </div>
        <div className="px-6 py-4 m-4 ">
          <div className="flex justify-between">
            <p className="leading-normal text-gray-500 ">Subtotal untuk produk</p>
            <p className="leading-normal text-black ">{txtSubTotalProduk}</p>
          </div>
          <div className="flex justify-between">
            <p className="leading-normal text-gray-500 ">Subtotal pengiriman</p>
            <p className="leading-normal text-black ">{txtTotalPengiriman}</p>
          </div>
        </div>
        {/* <BottomFixedSummaryStore /> */}
        {estimation && (
          <SelectCourier
            couriers={estimation.estimateDelivery}
            isOpen={isModalSelectCourierOpen}
            onClose={() => setIsModalSelectCourierOpen(false)}
            onChange={setSelectedCourier}
            selectedCourier={selectedCourier}
          />
        )}
        <BottomFixedSummaryStore
          qyt={sumOfCarts}
          total={total}
          onSubmit={handleSubmit}
          isDisabled={!canSubmit}
        />

      </div>
    )
  }

  return (
    <Layout isMobile={isMobile} className="pb-12 md:pt-24 ">

      {(!isListAddressOpen && mainCustomerAddress)
        ? (
          <AdddressListItem
            rightElement={<>Pilih Alamat Utama</>}
            leftElement={<IoMdPin className="flex-shrink-0 mr-4 text-2xl text-primary" />}
            address={mainCustomerAddress}
            isMobile={isMobile}
            title="Alamat Utama"
            onClickRight={handleClickMainAddress}
          />
        )
        : (
          <div className="py-6 my-6 bg-white rounded-lg shadow-lg mycontainer">
            <div className="flex">
              <div className="flex items-center justify-center mr-2">
                <IoMdPin className="text-2xl text-primary" />
              </div>
              <p className="mb-2 text-sm leading-normal text-gray-500">Pilih Alamat utama</p>
            </div>
            {customerAddress?.map((address) => (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label htmlFor={`add${address.id}`} key={address.id} className="my-2">
                <AdddressListItem
                  leftElement={(
                    <div className="flex items-center mr-4">
                      <input id={`add${address.id}`} checked={selectedAddressId === address.id} type="radio" name="checked-demo" className="form-radio" onChange={(e) => handleChangeMainAddress(e, address.id)} />
                    </div>
              )}
                  address={address}
                  isMobile={isMobile}
            // onClickRight={handleChangeMainAddress}
                  rightElement="ubah"
                  isList
                />
              </label>
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
            <td className="px-2 ">
              {selectedCourier ? (
                <div className="mt-2 font-medium leading-tight text-black">
                  <p>{`${selectedCourier.service}`}</p>
                  <p className="mt-2 font-normal text-gray-500">
                    Estimasi diterima
                    {' '}
                    {selectedCourier.estDate}
                  </p>
                </div>
              )
                : (
                  <div className="font-medium leading-tight text-black ">
                    Pilih pengiriman terlebih dahulu
                  </div>
                )}
            </td>
            <td colSpan={2} className="text-center">

              <button type="button" onClick={() => setIsModalSelectCourierOpen(true)} className="font-bold text-primary hover:underline">
                Ubah
              </button>

            </td>
            <td className="text-right">
              {`Rp ${numberWithCommas(sumOfTotal)}`}
            </td>
          </tr>
          <div className="w-full my-4 " />
          <tr className="text-gray-400">
            <td colSpan={2} />
            <td colSpan={2}>Subtotal Produk</td>
            <td className="text-right">{txtSubTotalProduk}</td>
          </tr>
          <tr className="text-gray-400">
            <td colSpan={2} />
            <td colSpan={2}>Total Ongkos Kirim</td>
            <td className="text-right">{txtTotalPengiriman}</td>
          </tr>
          <tr>
            <td colSpan={2} />
            <td colSpan={2} className="font-medium">
              Total (
              {sumOfCarts}
              {' '}
              Produk) :
              {' '}
            </td>
            <td className="text-2xl font-medium text-right text-primary">{`Rp ${numberWithCommas(total)}`}</td>
          </tr>
          <div className="w-full my-6 " />

        </table>
      </div>
      <div className="flex justify-end mt-6 mycontainer ">
        <button type="button" className="px-16 btn btn-primary" disabled={!canSubmit || (isLoading)} onClick={handleSubmit}>
          Bayar
        </button>
      </div>
      {estimation && (
      <SelectCourier
        couriers={estimation.estimateDelivery}
        isOpen={isModalSelectCourierOpen}
        onClose={() => setIsModalSelectCourierOpen(false)}
        onChange={setSelectedCourier}
        selectedCourier={selectedCourier}
      />
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Shipment), {
  ssr: false,
})
