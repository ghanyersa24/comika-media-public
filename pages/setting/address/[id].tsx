/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react'
import {
  Formik, Field, Form, FormikHelpers, useField, useFormikContext,
} from 'formik'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import mobile from 'is-mobile'
import { address } from '../../../res/interface'
import TopNavbarWithBackButton from '../../../components/navigation/top-navbar-with-back-button'
import { client } from '../../../lib/clientRaw'
import Layout from '../../../components/layout'

const isMobile = mobile()

const City = (props) => {
  const {
    values: { provinceId },
  } = useFormikContext()
  const [field] = useField(props)
  const { data: city, isValidating } = useSWR(`/store/ongkir/master-city?province=${provinceId}`, client.get)
  return (
    <>
      <select {...props} {...field} disabled={isValidating}>
        {city?.map((p) => (
          <option value={p.city_id} key={p.city_id}>{`${p.type} ${p.city_name}`}</option>
        ))}
      </select>
    </>
  )
}
const Subdistrict = (props) => {
  const {
    values: { cityId },
  } = useFormikContext()
  const [field] = useField(props)
  const { data: subdistrict, isValidating } = useSWR(`/store/ongkir/master-subdistrict?city=${cityId}`, client.get)
  return (
    <>
      <select {...props} {...field} disabled={isValidating}>
        {subdistrict?.map((p) => (
          <option value={parseInt(p.subdistrict_id, 10)} key={p.subdistrict_id}>{`${p.subdistrict_name}`}</option>
        ))}
      </select>
    </>
  )
}

const App = ():ReactElement => {
  const router = useRouter()
  const { id } = router.query
  const isEdit = (id && id !== 'add')
  const { data: selectedAddress } = useSWR<address>(() => ((id && id !== 'add') ? `/account/address/${id}` : null), client.get)
  const { data: provinces } = useSWR('/store/ongkir/master-province', client.get)
  const title = isEdit ? 'Ubah alamat' : 'Tambah alamat baru'
  const form = (
    <Formik
      initialValues={selectedAddress || {
        id: '',
        name: '',
        address: '',
        provinceId: null,
        province: '',
        cityId: null,
        city: '',
        type: '',
        postalCode: '',
        phone: '',
      }}
      enableReinitialize
      onSubmit={async (
        values: address,
        { setSubmitting }: FormikHelpers<address>,
      ) => {
        if (id === 'add') {
          await client.post('/account/address', values)
        } else {
          await client.put('/account/address', values)
        }
        setSubmitting(false)
        router.back()
      }}
    >
      <Form className="flex flex-col p-4 divide-y form-add-address">
        <div className="py-4">

          <h2 className="mb-2 text-xl font-medium leading-relaxed text-primary">Kontak</h2>

          <label htmlFor="name">Nama Lengkap</label>
          <Field id="name" name="name" />

          <label htmlFor="phone">Nomor Ponsel</label>
          <Field id="phone" name="phone" className="" type="tel" maxLength={13} />

        </div>

        <div className="py-4">
          <h2 className="mb-2 text-xl font-medium leading-relaxed text-primary">Alamat</h2>

          <label htmlFor="provinceId">Provinsi</label>
          <Field id="provinceId" name="provinceId" as="select" className="w-full">
            {provinces?.map((p) => (
              <option value={p.province_id} key={p.province_id} className="">{p.province}</option>
            ))}
          </Field>

          <label htmlFor="cityId">Kabupaten atau Kota</label>
          <City name="cityId" as="select" />

          <label htmlFor="subdistrictId">Kecamatan</label>
          <Subdistrict name="subdistrictId" as="select" />

          <label htmlFor="address">Alamat</label>
          <Field name="address" />

          <label htmlFor="postalCode">Kode Pos</label>
          <Field id="postalCode" name="postalCode" />

          <label htmlFor="mark">Tanda Lokasi</label>
          <Field id="mark" name="mark" placeholder="Rumah" />
        </div>

        <button type="submit" className="btn-primary">Submit</button>
      </Form>
    </Formik>
  )
  if (isMobile) {
    return (
      <div className="pt-10">
        <TopNavbarWithBackButton title={title} />
        {form}
      </div>
    )
  }
  return (
    <Layout isMobile={isMobile}>
      <div className="max-w-screen-md p-2 mx-auto mb-12 rounded-lg shadow lg:prose-lg">
        {form}
      </div>
    </Layout>
  )
}

export default App
