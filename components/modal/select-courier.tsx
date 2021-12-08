import { FunctionComponent } from 'react'
import { Dialog } from '@headlessui/react'
import { EstimateDelivery } from '../../res/interface'

type props = {
	couriers: EstimateDelivery[];
	isOpen: boolean;
	onClose: () => void;
	onChange: (courier:EstimateDelivery) => void;
	selectedCourier:EstimateDelivery
};
export const SelectCourier: FunctionComponent<props> = ({
  couriers,
  isOpen,
  onClose,
  onChange,
  selectedCourier,
}) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    className=""
  >
    <div className="flex items-center justify-center min-h-screen">
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />

      <div className="fixed inset-x-0 bottom-0 z-20 max-w-lg px-4 py-6 mx-auto overflow-y-auto bg-white border-t shadow-md md:border-t-0 md:rounded-lg md:bottom-6 lg:px-6">
        <Dialog.Title>
          <div>
            <p className="text-xl font-bold">Pilih Pengiriman</p>
            <p className="mt-2 text-base font-medium">Jasa kirim yang didukung oleh comika media </p>
            <p className="mt-2 text-base text-gray-500">Anda dapat melacak pesanan yang menggunakan jasa kirim yang didukung comika media</p>
          </div>
        </Dialog.Title>
        <Dialog.Description>
          <div className="mt-4 overflow-y-scroll border-t border-dashed divide-y divide-dashed max-h-96 ">
            {couriers.map((courier) => (
              <button
                type="button"
                onClick={() => {
                  onChange(courier)
                  onClose()
                }}
                key={courier.id}
                className="flex w-full py-2 focus:ring-0 hover:bg-bgBlueLight "
              >
                <input checked={selectedCourier?.id === courier.id} type="radio" name="checked-demo" className="mt-2 mr-3 form-radio" />
                <div>
                  <div className="flex leading-loose ">
                    <span className="mr-2 font-bold">{courier.service}</span>
                    <span className="font-bold text-primary">{courier.rupiah}</span>
                  </div>
                  <div className="text-gray-500">
                    Estimasi diterima
                    {` ${courier.estDate}`}
                  </div>
                </div>
              </button>
            ))}
          </div>

        </Dialog.Description>
      </div>
    </div>

    {/* <button type="button" className="w-full mt-4 btn-primary" onClick={onClose}>
      Simpan
    </button> */}
  </Dialog>
)

export default SelectCourier
