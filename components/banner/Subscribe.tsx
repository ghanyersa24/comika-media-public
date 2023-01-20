import Link from "next/link";
import React, { useState } from "react";
function Subscribe({
  onSubmit,
  loading,
}: {
  onSubmit: (email: string) => void;
  loading: boolean;
}) {
  const [email, setEmail] = useState("");

  return (
    <div className="relative rounded-lg bg-primary sm:py-8 lg:py-12">
      <img
        src="/assets/svg/art.svg"
        alt=""
        className="absolute inset-x-0 top-0 z-0 w-full opacity-50 md:h-full "
      />
      <div className="relative mx-auto max-w-screen-2xl md:px-8">
        <div className="flex flex-col items-center p-4 rounded-lg md:flex-row sm:p-8">
          <img
            src="/assets/info/subscribe_banner_3d 1.png"
            alt=""
            className="w-24 h-32 md:w-64 md:h-auto md:mx-12"
          />
          <div>
            <div className="mb-4 sm:mb-8">
              <h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                Yuk Berlangganan Konten Premium Sekarang
              </h2>
              <p className="mt-1 text-sm text-gray-100 md:text-lg">
                Nikmati keseruan membaca tanpa ada batasan
              </p>
              <div className="w-16 h-1 mt-2 bg-white rounded"></div>
            </div>
            <form className="flex w-full max-w-md gap-2 mb-3 sm:mb-5">
              <button
                disabled={loading}
                type="button"
                onClick={() => onSubmit(email)}
                className="inline-block px-8 py-2 text-sm font-semibold text-center text-white transition duration-100 rounded outline-none bg-warning hover:bg-yellow-400 focus-visible:ring ring-indigo-300 md:text-base"
              >
                {loading ? "loading" : "Daftar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
