/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from 'react'
import {
  Formik, Field, Form, FormikHelpers,
} from 'formik'
import { address } from '../../res/interface'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'

const App = ():ReactElement => {
  console.log('App -> App', App)
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
        onSubmit={(
          values: address,
          { setSubmitting }: FormikHelpers<address>,
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 500)
        }}
      >
        <Form className="flex flex-col p-4 divide-y form-add-address">
          <h1 className="py-4 text-xl font-medium leading-relaxed text-gray-700">Tambah Alamat Baru</h1>
          <div className="py-4">

            <h2 className="mb-2 text-xl font-medium leading-relaxed text-primary">Kontak</h2>

            <label htmlFor="name">Nama Lengkap</label>
            <Field id="name" name="name" />

            <label htmlFor="phone">Nomor Ponsel</label>
            <Field id="phone" name="phone" className="text-red-500" />

          </div>

          <div className="py-4">
            <h2 className="mb-2 text-xl font-medium leading-relaxed text-primary">Alamat</h2>

            <label htmlFor="province">Provinsi</label>
            <Field id="province" name="province" />

            <label htmlFor="city">Kabupaten atau Kota</label>
            <Field id="city" name="city" />

            <label htmlFor="postalCode">Kode Pos</label>
            <Field id="postalCode" name="postalCode" />
          </div>

          <button type="submit" className="btn-primary">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default App
