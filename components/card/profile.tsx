import React, { ReactElement } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { Profile } from '../../res/interface'

type ProfileCardProps ={
  profileData:Profile,
  // eslint-disable-next-line no-unused-vars
  onChange(e: React.ChangeEvent<HTMLInputElement>):void
}
export const ProfileCard = ({ profileData, onChange }:ProfileCardProps):ReactElement => {
  console.log('🚀 ~ file: profile.tsx ~ line 5 ~ ProfileCard ~ profileData', profileData)
  const {
    email, name, phone, address, postalCode, district, city, province,
  } = profileData
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  return (
    <div className="w-full grid grid-cols-3 rounded-lg shadow-md ">
      <div className="bg-gray-200 p-4 rounded-l-lg flex flex-col items-center pt-16  ">
        <div className="relative w-32 lg:w-44 ">
          <img
            className="w-full rounded-full shadow "
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="gambar xx"
          />
          <button type="button" className="absolute text-3xl lg:text-4xl bottom-0 right-3 lg:bottom-3 lg:right-2 text-primary hover:text-blue-900 ">
            <AiFillCamera />
          </button>
        </div>
      </div>
      <div className="col-span-2 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 ">Data Diri</h2>
        <label
          htmlFor="name"
          className="label-flex "
        >
          Nama
          <input
            className=""
            type="text"
            value={name}
            // onChange={handleChangeValue}
            placeholder="name"
            name="name"
            id="name"
            onChange={handleChangeValue}
          />
        </label>
        <label
          htmlFor="email"
          className="label-flex "
        >
          Email
          <input
            className=""
            type="text"
            value={email}
            // onChange={handleChangeValue}
            placeholder="Email"
            name="email"
            id="email"
            onChange={handleChangeValue}
          />
        </label>
        <label
          htmlFor="phone"
          className="label-flex "
        >
          phone
          <input
            className=""
            type="text"
            value={phone}
            // onChange={handleChangeValue}
            placeholder="phone"
            name="phone"
            id="phone"
            onChange={handleChangeValue}
          />
        </label>
        <label
          htmlFor="x"
          className="label-flex "
        >
          Tanggal Lahir X
          <input
            className=""
            type="date"
            // value={phone}
            // onChange={handleChangeValue}
            placeholder="x"
            name="x"
            id="x"
            onChange={handleChangeValue}
          />
        </label>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-12">Alamat</h2>
        <label
          htmlFor="address"
          className="label-flex "
        >
          address
          <input
            className=""
            type="text"
            value={address}
            // onChange={handleChangeValue}
            placeholder="address"
            name="address"
            id="address"
            onChange={handleChangeValue}
          />
        </label>
        <label
          htmlFor="postalCode"
          className="label-flex "
        >
          address
          <input
            className=""
            type="text"
            value={postalCode}
            // onChange={handleChangeValue}
            placeholder="postalCode"
            name="postalCode"
            id="postalCode"
            onChange={handleChangeValue}
          />
        </label>
        <label
          htmlFor="district"
          className="label-flex "
        >
          district
          <input
            className=""
            type="text"
            value={district}
            // onChange={handleChangeValue}
            placeholder="district"
            name="district"
            id="district"
            onChange={handleChangeValue}
          />
        </label>
        <label
          htmlFor="city"
          className="label-flex "
        >
          city
          <input
            className=""
            type="text"
            value={city}
            // onChange={handleChangeValue}
            placeholder="city"
            name="city"
            id="city"
            onChange={handleChangeValue}
          />
        </label>
        <label
          htmlFor="province"
          className="label-flex "
        >
          province
          <input
            className=""
            type="text"
            value={province}
            // onChange={handleChangeValue}
            placeholder="province"
            name="province"
            id="province"
            onChange={handleChangeValue}
          />
        </label>
      </div>
    </div>
  )
}

export default ProfileCard
