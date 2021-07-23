import React, { ReactElement } from 'react'
import { AiFillCamera, AiOutlineLoading } from 'react-icons/ai'
import { MdModeEdit } from 'react-icons/md'
import { Profile } from '../../res/interface'

type ProfileCardProps = {
  profileData: Profile;
  canEdit: boolean;
  onEdit():void,
  onSubmit():void,
  // eslint-disable-next-line no-unused-vars
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
};
export const ProfileCard = ({
  profileData,
  onChange,
  canEdit,
  onEdit,
  onSubmit,
}: ProfileCardProps): ReactElement => {
  console.log(
    '🚀 ~ file: profile.tsx ~ line 5 ~ ProfileCard ~ profileData',
    profileData,
  )
  const {
    email, name, phone, address, postalCode, district, city, province,
  } = profileData || {}
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 rounded-lg shadow-md mb-16 ">
      <div className="bg-gray-200 p-4 rounded-l-lg flex flex-col items-center pt-16  ">
        <div className="relative w-32 lg:w-44 ">
          <img
            className="w-full rounded-full shadow "
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="gambar xx"
          />
          <button
            type="button"
            className="absolute text-3xl lg:text-4xl bottom-0 right-3 lg:bottom-3 lg:right-2 text-primary hover:text-blue-900 "
          >
            <AiFillCamera />
          </button>
        </div>
        <div hidden={!canEdit}>
          <button
            type="button"
            onClick={onEdit}
            className="border-2 border-primary text-primary rounded-md mt-8 px-4 py-2 hover:bg-gray-300 flex flex-row items-center"
          >
            <MdModeEdit className="mr-2 text-xl" />
            {'  '}
            Ubah Profile
          </button>
        </div>
      </div>
      <div className="col-span-2 p-6 lg:p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center ">
          Data Diri
          {!profileData ? <AiOutlineLoading className="animate-spin h-5 w-5 ml-3" /> : null}
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
        <label htmlFor="x" className="label-flex ">
          Tanggal Lahir X
          <input
            className=""
            type="date"
            // value={phone}
            // onChange={handleChangeValue}
            placeholder="x"
            name="x"
            id="x"
            disabled={canEdit}
            onChange={handleChangeValue}
          />
        </label>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-12">
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
          address
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
          <button onClick={onEdit} type="button" className=" px-4 py-2  rounded-md mr-4 border-primary border w-44 ">
            Batal
          </button>
          <button onClick={onSubmit} type="button" className=" px-4 py-2 bg-primary text-white rounded-md w-44">
            Simpan
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProfileCard
