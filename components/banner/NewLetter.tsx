import Link from "next/link";
import React from "react";

function NewLetter() {
  return (
    <div className="relative rounded-lg bg-primary sm:py-8 lg:py-12">
      <img
        src="/assets/svg/art.svg"
        alt=""
        className="absolute inset-x-0 top-0 w-full opacity-50 md:h-full "
      />
      <div className="mx-auto max-w-screen-2xl md:px-8">
        <div className="flex flex-col items-center p-4 rounded-lg md:flex-row sm:p-8">
          <img
            src="/assets/info/subscribe_banner_3d 1.png"
            alt=""
            className="w-24 h-32 md:w-64 md:h-auto md:mx-12"
          />
          <div>
            <div className="mb-4 sm:mb-8">
              <h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                Ingin mendapatkan update artikel?
              </h2>
              <p className="mt-1 text-sm text-gray-100 md:text-lg">
                Yuk daftarkan alamat email kamu untuk menerima notifikasi
                artikel terbaru kami!
              </p>
            </div>
            <form className="flex w-full max-w-md gap-2 mb-3 sm:mb-5">
              <input
                placeholder="Email"
                className="flex-1 w-full px-3 py-2 text-gray-800 placeholder-gray-400 transition duration-100 border border-gray-300 rounded outline-none bg-gray-white focus:ring ring-indigo-300"
              />
              <button className="inline-block px-8 py-2 text-sm font-semibold text-center text-white transition duration-100 rounded outline-none bg-warning hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 md:text-base">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLetter;
