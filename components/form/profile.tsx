import React, { ReactElement, useState } from 'react'
import { AiFillCamera, AiOutlineLoading } from 'react-icons/ai'
import { MdModeEdit } from 'react-icons/md'
import { Profile } from '../../res/interface'

type ProfileCardProps = {
  profileData: Profile,
  canEdit: boolean,
  onEdit():void,
  onSubmit():void,
  // eslint-disable-next-line no-unused-vars
  onChange(string, any): void;
};

export const ProfileCard = ({
  profileData,
  onChange,
  canEdit,
  onEdit,
  onSubmit,
}: ProfileCardProps): ReactElement => {
  const {
    email, name, phone, address, postalCode, district, city, province, photo, birthdate,
  } = profileData || {}
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string|null>()
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      // eslint-disable-next-line no-shadow
      type, checked, name, value, files,
    } = e.target
    if (type === 'checkbox')onChange(name, checked)
    else if (files?.length != null) {
      const reader = new FileReader()
      const file = files[0]
      reader.onloadend = () => {
        onChange(name, file)
        setImagePreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else onChange(name, value)
  }

  return (
    <div className="grid w-full grid-cols-1 mb-16 rounded-lg shadow-md lg:grid-cols-3 ">
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
            <input
              className="hidden"
              id="file-upload"
              type="file"
              disabled={canEdit}
              name="photo"
              onChange={handleChangeValue}
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
          <input
            className=""
            type="text"
            value={name}
            // onChange={handleChangeValue}
            placeholder="name"
            name="name"
            id="name"
            disabled={canEdit}
            onChange={handleChangeValue}
          />
        </label>
        <label htmlFor="email" className="label-flex ">
          Email
          <input
            className=""
            type="text"
            value={email}
            // onChange={handleChangeValue}
            placeholder="Email"
            name="email"
            id="email"
            disabled={canEdit}
            onChange={handleChangeValue}
          />
        </label>
        <label htmlFor="phone" className="label-flex ">
          phone
          <input
            className=""
            type="text"
            value={phone}
            // onChange={handleChangeValue}
            placeholder="phone"
            name="phone"
            id="phone"
            disabled={canEdit}
            onChange={handleChangeValue}
          />
        </label>
        <label htmlFor="birthdate" className="label-flex ">
          Tanggal Lahir
          <input
            className=""
            type="date"
            value={birthdate}
            // onChange={handleChangeValue}
            placeholder=""
            name="birthdate"
            id="birthdate"
            disabled={canEdit}
            onChange={handleChangeValue}
          />
        </label>
        <h2 className="mt-12 mb-4 text-xl font-semibold text-gray-900">
          Alamat
        </h2>
        <label htmlFor="address" className="label-flex ">
          address
          <input
            className=""
            type="text"
            value={address}
            // onChange={handleChangeValue}
            placeholder="address"
            name="address"
            id="address"
            disabled={canEdit}
            onChange={handleChangeValue}
          />
        </label>
        <label htmlFor="postalCode" className="label-flex ">
          Kode Pos
          <input
            className=""
            type="text"
            value={postalCode}
            // onChange={handleChangeValue}
            placeholder="postalCode"
            name="postalCode"
            id="postalCode"
            disabled={canEdit}
            onChange={handleChangeValue}
          />
        </label>
        <label htmlFor="district" className="label-flex ">
          district
          <input
            className=""
            type="text"
            value={district}
            // onChange={handleChangeValue}
            placeholder="district"
            name="district"
            id="district"
            disabled={canEdit}
            onChange={handleChangeValue}
          />
        </label>
        <label htmlFor="city" className="label-flex ">
          city
          <input
            className=""
            type="text"
            value={city}
            // onChange={handleChangeValue}
            placeholder="city"
            name="city"
            id="city"
            disabled={canEdit}
            onChange={handleChangeValue}
          />
        </label>
        <label htmlFor="province" className="label-flex ">
          province
          <input
            className=""
            type="text"
            value={province}
            // onChange={handleChangeValue}
            placeholder="province"
            name="province"
            id="province"
            disabled={canEdit}
            onChange={handleChangeValue}
          />
        </label>
        <div className={!canEdit ? 'flex mt-8 justify-end ' : 'hidden'}>
          <button onClick={onEdit} type="button" className="px-4 py-2 mr-4 border rounded-md border-primary w-44">
            Batal
          </button>
          <button onClick={onSubmit} type="button" className="px-4 py-2 text-white rounded-md bg-primary w-44">
            Simpan
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProfileCard
