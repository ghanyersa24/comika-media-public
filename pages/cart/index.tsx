import { BiArrowBack } from 'react-icons/bi'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import Image from 'next/image'

export const Cart = (params) => {
  console.log('🚀 ~ file: index.tsx ~ line 2 ~ Cart ~ params', params)
  return (
    <div className="bg-bgGrayLight">
      <div className="bg-primary flex text-white items-center fixed inset-x-0 top-0 ">
        <button type="button" className="py-4 px-4">
          <BiArrowBack className="text-2xl" />
        </button>
        <p className="text-base font-bold leading-tight ">Keranjang Belanja</p>
      </div>
      <div className="rounded-xl p-4 mt-16 mb-44">
        <div className=" bg-white shadow-lg rounded-xl">

          <label className=" p-4  flex items-center  shadow rounded-t-xl">
            <input type="checkbox" name="checked-demo" className="checkbox" />
            <span className="text-gray-900 font-medium text-lg">Pilih Semua</span>
          </label>

          <div className="px-4 py-2 divide-y">
            <div className="py-4">
              <div className="flex py-4  border-b border-gray-100 items-center">
                <input type="checkbox" name="checked-demo" className="checkbox" />
                <div className="flex">
                  <div className="flex-initial">
                    <Image
                      height={82}
                      width={82}
                      layout="fixed"
                      src="https://via.placeholder.com/62x62"
                      alt="Gambar "
                      className="rounded-lg"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm leading-normal text-gray-400 line-clamp-2">Brontosaurus</p>
                    <p className="text-lg leading-relaxed text-black">Rp 36.000</p>
                  </div>
                </div>

              </div>
              <div className="flex items-center justify-end text-base mt-4">
                <button type="button" className="w-8 h-8 shadow rounded-full font-bold flexCenter text-white bg-primary ">
                  <FaMinus />
                </button>
                <span className="px-2 border-b mx-2">1</span>
                <button type="button" className="w-8 h-8 shadow rounded-full font-bold flexCenter text-white bg-primary">
                  <FaPlus />
                </button>
                <button type="button" className="ml-4 w-8 h-8 border border-gray-300 rounded-lg font-bold flex items-center justify-center text-primary ">
                  <FaTrash className="text-gray-500 text-lg" />
                </button>
              </div>
            </div>
            <div className="py-4">
              <div className="flex py-4  border-b border-gray-100 items-center">
                <input type="checkbox" name="checked-demo" className="checkbox" />
                <div className="flex">
                  <div className="flex-initial">
                    <Image
                      height={82}
                      width={82}
                      layout="fixed"
                      src="https://via.placeholder.com/62x62"
                      alt="Gambar "
                      className="rounded-lg"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm leading-normal text-gray-400 line-clamp-2">LONG SLEEVE KOMOIDOUMENOI WORLD TOUR - Black, S</p>
                    <p className="text-lg leading-relaxed text-black">Rp 36.000</p>
                  </div>
                </div>

              </div>
              <div className="flex items-center justify-end text-base mt-4">
                <button type="button" className="w-8 h-8 shadow rounded-full font-bold flexCenter text-white bg-primary ">
                  <FaMinus />
                </button>
                <span className="px-2 border-b mx-2">1</span>
                <button type="button" className="w-8 h-8 shadow rounded-full font-bold flexCenter text-white bg-primary">
                  <FaPlus />
                </button>
                <button type="button" className="ml-4 w-8 h-8 border border-gray-300 rounded-lg font-bold flex items-center justify-center text-primary ">
                  <FaTrash className="text-gray-500 text-lg" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="px-8 bg-white divide-y fixed inset-x-0 bottom-0 shadow-2xl border-t ">
        <div className="flex items-center justify-between py-4">
          <div>
            <div className="text-base">
              Total Bayar
            </div>
            <div className="font-bold text-lg">
              Rp 300.000
            </div>
          </div>
          <div className="text-gray-500 text-lg">
            2 Barang
          </div>
        </div>
        <div className="py-4">
          <button type="button" className="btn-primary w-full py-3 ">
            Beli (2)
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
