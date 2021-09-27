/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react'
import {
  Formik, Field, Form, FormikHelpers, useField, useFormikContext,
} from 'formik'
import useSWR from 'swr'
import { address } from '../../res/interface'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'
import { client } from '../../lib/clientRaw'

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
  const { data: provinces } = useSWR('/store/ongkir/master-province', client.get)
  return (
    <div className="pt-10">
      <TopNavbarWithBackButton title="Tambah Alamat Baru" />
      <Formik
        initialValues={{
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
        onSubmit={async (
          values: address,
          { setSubmitting }: FormikHelpers<address>,
        ) => {
          await client.post('/account/address', values)
          setSubmitting(false)
        }}
      >
        <Form className="flex flex-col p-4 divide-y form-add-address">
          <h1 className="py-4 text-xl font-medium leading-relaxed text-gray-700">Tambah Alamat Baru</h1>
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
    </div>
  )
}

export default App
