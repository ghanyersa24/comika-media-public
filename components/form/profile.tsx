/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { ReactElement, useState } from 'react'
import { AiFillCamera, AiOutlineLoading } from 'react-icons/ai'
import { MdModeEdit } from 'react-icons/md'
import {
  Formik, Field, Form, FormikHelpers, useField, useFormikContext,
} from 'formik'
import useSWR from 'swr'
import { Profile } from '../../res/interface'
import { client } from '../../lib/clientRaw'

type ProfileCardProps = {
  profileData: Profile,
  canEdit: boolean,
  onEdit():void,
  // eslint-disable-next-line no-unused-vars
  onSubmit(data:Profile):void,
  // eslint-disable-next-line no-unused-vars
};

const City = (props) => {
  const {
    values,
  } = useFormikContext<Profile>()
  const [field] = useField(props)
  const { data: city } = useSWR(`/store/ongkir/master-city?province=${values?.provinceId}`, client.get)
  return (
    <select {...props} {...field}>
      {city?.map((p) => (
        <option value={p.city_id} key={p.city_id}>{`${p.type} ${p.city_name}`}</option>
      ))}
    </select>
  )
}
const Subdistrict = (props) => {
  const {
    values,
  } = useFormikContext<Profile>()
  const [field] = useField(props)
  const { data: subdistrict } = useSWR(`/store/ongkir/master-subdistrict?city=${values?.cityId}`, client.get)
  return (
    <select {...props} {...field}>
      {subdistrict?.map((p) => (
        <option value={p.subdistrict_id} key={p.subdistrict_id}>{`${p.subdistrict_name}`}</option>
      ))}
    </select>
  )
}

export const ProfileCard = ({
  profileData,
  canEdit,
  onEdit,
  onSubmit,
}: ProfileCardProps): ReactElement => {
  const {
    photo,
  } = profileData || {}
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string|null>()
  const { data: provinces } = useSWR('/store/ongkir/master-province', client.get)

  return (
    <Formik
      enableReinitialize
      initialValues={profileData}
      onSubmit={(
        values: Profile,
        { setSubmitting }: FormikHelpers<Profile>,
      ) => {
        onSubmit(values)
        setSubmitting(false)
      }}
    >
      {(formik) => (
        <Form className="grid w-full grid-cols-1 mb-16 rounded-lg shadow-md lg:grid-cols-3 ">
          <div className="flex flex-col items-center px-4 py-8 pt-16 mt-4 bg-gray-200 rounded-l-lg ">
            <div className="relative w-32 lg:w-44 ">
              {/* <img
            className="w-full rounded-full shadow "
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="gambar xx"
          /> */}

              <img alt="gambar" src={imagePreviewUrl || photo} className="w-32 h-32 rounded-full shadow lg:w-44 lg:h-44 " />

              <label
                htmlFor="file-upload"
                className="absolute bottom-0 p-0.5 text-3xl  rounded cursor-pointer lg:text-4xl right-3 lg:bottom-3 lg:right-2 text-primary hover:text-blue-900 "
              >
                <Field
                  className="hidden"
                  id="file-upload"
                  type="file"
                  disabled={canEdit}
                  onChange={(event) => {
                    const reader = new FileReader()
                    const { files } = event.target
                    const file = files[0]
                    reader.onloadend = () => {
                      formik.setFieldValue('photo', file)
                      setImagePreviewUrl(reader.result as string)
                    }
                    reader.readAsDataURL(file)
                  }}
                  name="picture"
                />
                <AiFillCamera />
              </label>
            </div>
            <div hidden={!canEdit}>
              <button
                type="button"
                onClick={onEdit}
                className="flex flex-row items-center px-4 py-2 mt-8 border-2 rounded-md border-primary text-primary hover:bg-gray-300"
              >
                <MdModeEdit className="mr-2 text-xl" />
                {'  '}
                Ubah Profile
              </button>
            </div>
          </div>
          <div className="col-span-2 p-6 lg:p-8">
            <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-900 ">
              Data Diri
              {!profileData ? <AiOutlineLoading className="w-5 h-5 ml-3 animate-spin" /> : null}
            </h2>

            <label htmlFor="name" className="label-flex ">
              Nama
              <Field type="text" placeholder="name" name="name" id="name" disabled={canEdit} />
            </label>

            <label htmlFor="email" className="label-flex ">
              Email
              <Field type="text" placeholder="Email" name="email" id="email" disabled={canEdit} />
            </label>

            <label htmlFor="phone" className="label-flex hide-number ">
              phone
              <Field type="number" name="phone" id="phone" disabled={canEdit} />
            </label>

            <label htmlFor="birthdate" className="label-flex ">
              Tanggal Lahir
              <Field type="date" name="birthdate" id="birthdate" disabled={canEdit} />
            </label>

            <h2 className="mt-12 mb-4 text-xl font-semibold text-gray-900">
              Alamat
            </h2>
            <label htmlFor="provinceId" className="label-flex">
              Provinsi
              <Field id="provinceId" name="provinceId" as="select" className="label-flex" disabled={canEdit}>
                {provinces?.map((p) => (
                  <option value={p.province_id} key={p.province_id} className="">{p.province}</option>
                ))}
              </Field>
            </label>

            <label htmlFor="cityId" className="label-flex">
              Kabupaten atau Kota
              <City name="cityId" as="select" disabled={canEdit} />
            </label>

            <label htmlFor="subdistrictId" className="label-flex">
              Kecamatan
              <Subdistrict name="subdistrictId" as="select" disabled={canEdit} />
            </label>

            <label htmlFor="address" className="label-flex">
              Alamat
              <Field name="address" disabled={canEdit} />
            </label>

            <label htmlFor="postalCode" className="label-flex">
              Kode Pos
              <Field id="postalCode" name="postalCode" disabled={canEdit} />
            </label>
            <div className={!canEdit ? 'flex mt-8 justify-end ' : 'hidden'}>
              <button type="button" onClick={onEdit} className="px-4 py-2 mr-4 border rounded-md border-primary w-44">
                Batal
              </button>
              <button type="submit" className="px-4 py-2 text-white rounded-md bg-primary w-44">
                Simpan
              </button>
            </div>
          </div>

        </Form>
      )}
    </Formik>

  )
}

export default ProfileCard
