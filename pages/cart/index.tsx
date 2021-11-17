/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react'
import useSWR, { mutate } from 'swr'
import mobile from 'is-mobile'
import router from 'next/router'
import { signIn, useSession } from 'next-auth/client'
import { toast } from 'react-toastify'
import { BottomFixedSummaryStore } from '../../components/card/bottom-fixed-summary-store'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'
import { API_ENDPOINT_ADD_CART, API_ENDPOINT_CART } from '../../res/api-endpoint'
import { cartType } from '../../res/interface'
import { client } from '../../lib/clientRaw'
import CartItemMobile from '../../components/items/cart-item-mobile'
import Layout from '../../components/layout'
import Container from '../../components/container-padding'
import CartItemDekstop from '../../components/items/cart-item-dekstop'
import { numberWithCommas } from '../../helper/accounting'

const isMobile = mobile()

export const Cart = ():ReactElement => {
  const [session, loading] = useSession()
  console.log('🚀 ~ file: index.tsx ~ line 23 ~ Cart ~ session', loading, session)
  const { data: carts } = useSWR<cartType[]>(() => (session ? `${API_ENDPOINT_CART}` : null), client.get)
  const [checkedCarts, setCheckedCarts] = useState([])
  if (!session && !loading) {
    toast.info('Harap Login terlebih dahulu', {
      position: 'bottom-right',
      onClose: () => signIn(),
    })
    return <div>Loading...</div>
  }
  console.log('checkedCarts', checkedCarts)

  const handleSubmit = async () => {
    let params = ''
    checkedCarts.forEach((checkedCart, key, arr) => {
      const AND = Object.is(arr.length - 1, key) ? '' : '&'
      params += `product=${checkedCart}${AND}`
    })
    router.push(`/cart/shipment/${params}`)
    // await client.get(`/store/confirm-cart?${params}`)
  }

  const handleQytChange = async (qyt:number, cartId:string) => {
    await client.post(`${API_ENDPOINT_ADD_CART}/${cartId}`, {
      qty: qyt,
      note: null,
      update: true,
    })
    await mutate(API_ENDPOINT_CART)
  }
  const handleChecked = (value:boolean, cartId:string):void => {
    if (value) setCheckedCarts([cartId, ...checkedCarts])
    else setCheckedCarts(checkedCarts.filter((cart) => cart !== cartId))
  }

  const handleCheckedAll = (isCheckedAll: boolean) => {
    if (isCheckedAll) setCheckedCarts(carts.map((cart) => cart.id))
    else setCheckedCarts([])
  }
  const filteredCarts = carts?.filter((cart) => checkedCarts.includes(cart.id))
  const sumOfCarts = filteredCarts?.reduce((sum, cart) => sum + cart.qty, 0)
  const sumOfTotal = filteredCarts?.reduce((sum, cart) => sum + cart.total, 0)

  if (isMobile) {
    return (
      <div className="bg-bgGrayLight">
        <TopNavbarWithBackButton title="Keranjang Belanja" />
        <div className="p-4 pt-16 rounded-xl pb-44">
          <div className="my-4 bg-white shadow-lg rounded-xl">

            <label className="flex items-center p-4 shadow rounded-t-xl">
              <input
                type="checkbox"
                name="checked-demo"
                className="checkbox"
                onChange={(e) => handleCheckedAll(e.target.checked)}
              />
              <span className="text-lg font-medium text-gray-900">Pilih Semua</span>
            </label>

            <div className="px-4 py-2 divide-y">

              {carts?.map((cart) => (
                <CartItemMobile
                  key={cart.id}
                  cart={cart}
                  onQytChange={handleQytChange}
                  setChecked={handleChecked}
                  isChecked={checkedCarts.includes(cart.id)}
                />
              ))}
              {/* <div className="py-4">
                <div className="flex items-center py-4 border-b border-gray-100">
                  <input type="checkbox" name="checked-demo" className="checkbox" />
                  <SummaryItemStore />
                </div>
                <div className="flex items-center justify-between mt-4 text-base">
                  <span className="text-sm font-medium leading-none text-primary">Tulis
                  Catatan</span>

                  <IncreaseDecreaseDeleteButton />
                </div>
              </div> */}

            </div>
          </div>
        </div>
        <BottomFixedSummaryStore
          isDisabled={sumOfCarts === 0}
          qyt={sumOfCarts}
          total={sumOfTotal}
          onSubmit={handleSubmit}
        />
      </div>
    )
  }
  return (
    <Layout isMobile={isMobile} className="pb-12 md:pt-24 bg-gray-50 ">
      <Container className="bg-white rounded-lg shadow">
        <table className="w-full ">
          <tr className="border-b">
            <th> </th>
            <th className="py-4">Produk</th>
            <th>Harga Satuan</th>
            <th>Kuantitas</th>
            <th>Total Harga</th>
            <th>Aksi</th>
          </tr>
          <div className="my-4" />
          {carts?.map((cart) => (
            <CartItemDekstop
              key={cart.id}
              cart={cart}
              onQytChange={handleQytChange}
              setChecked={handleChecked}
              isChecked={checkedCarts.includes(cart.id)}
            />
          ))}
          <div className="my-4" />
          <tr className="border-t ">
            <td>
              <input
                type="checkbox"
                name="checked-demo"
                className="checkbox"
                onChange={(e) => handleCheckedAll(e.target.checked)}
              />
            </td>
            <td>
              Pilih Semua (
              {sumOfCarts}
              )
            </td>
            <td colSpan={2}>
              <div className="flex items-center justify-center py-4">
                <span>
                  Total (
                  {sumOfCarts}
                  {' '}
                  Produk) :
                  {' '}
                </span>
                <p className="ml-2 text-2xl font-medium text-primary">
                  {' '}
                  {`Rp ${numberWithCommas(sumOfTotal)}` }
                </p>
              </div>
            </td>
            <td colSpan={2}>
              <button disabled={sumOfCarts === 0} type="button" className="w-full btn btn-primary" onClick={handleSubmit}>
                Beli
              </button>
            </td>
          </tr>
        </table>
      </Container>
    </Layout>
  )
}

export default Cart
