import { ReactElement } from 'react'
import { Profile } from '../../res/interface'

export const ProfileCard = ({ email, name, phone }:Profile):ReactElement => {
  console.log('🚀 ~ file: profile.tsx ~ line 8 ~ ProfileCard ~ ProfileCard')
  return (
    <div className="w-full grid grid-cols-3">
      <div className="bg-gray-200">
        Photo
      </div>
      <div className="col-span-2 p-4">
        <h2>Data Diri</h2>
        <label
          htmlFor="email"
          className="flex items-center text-gray-800  font-bold mb-2 mt-4 "
        >
          Nama
          <input
            className="w-full py-2 px-3 text-right ml-8 border-0"
            type="text"
            value={name}
            // onChange={handleChangeValue}
            placeholder="name"
            name="name"
            id="name"
          />
        </label>
        <label
          htmlFor="email"
          className="flex items-center text-gray-800  font-bold mb-2 mt-4 "
        >
          Email
          <input
            className="w-full py-2 px-3 text-right ml-8 border-0"
            type="text"
            value={email}
            // onChange={handleChangeValue}
            placeholder="Email"
            name="email"
            id="email"
          />
        </label>
        <label
          htmlFor="email"
          className="flex items-center text-gray-800  font-bold mb-2 mt-4 "
        >
          phone
          <input
            className="w-full py-2 px-3 text-right ml-8 border-0"
            type="text"
            value={phone}
            // onChange={handleChangeValue}
            placeholder="phone"
            name="phone"
            id="phone"
          />
        </label>
        <label
          htmlFor="email"
          className="flex items-center text-gray-800  font-bold mb-2 mt-4 "
        >
          Tanggal Lahir X
          <input
            className="w-full py-2 px-3 text-right ml-8 border-0"
            type="date"
            // value={phone}
            // onChange={handleChangeValue}
            placeholder="Tanggal Lahir"
            name="Tanggal Lahir"
            id="Tanggal Lahir"
          />
        </label>
        <h2>Alamat</h2>
        <label
          htmlFor="email"
          className="flex items-center text-gray-800  font-bold mb-2 mt-4 "
        >
          phone
          <input
            className="w-full py-2 px-3 text-right ml-8 border-0"
            type="text"
            value={phone}
            // onChange={handleChangeValue}
            placeholder="phone"
            name="phone"
            id="phone"
          />
        </label>
      </div>
    </div>
  )
}

export default ProfileCard
