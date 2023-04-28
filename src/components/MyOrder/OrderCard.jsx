import React from 'react'

const OrderCard = () => {
  return (
    <div className="border-[1px] rounded-xl p-10 my-10">
      <div>
        <h1 className="text-xl font-light">No. Resi: <strong>001798989891283794</strong></h1>
        <h1 className="text-xl font-light">Kurir: <strong>JNE</strong></h1>
      </div>
      <div className="my-10">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <img src="/sambel-roa.png" alt="" className="md:w-[8rem] w-[5rem]" />
            <h1 className="text-lg font-semibold">Sambel Roa</h1>
          </div>
          <div>
            <h1 className="text-lg font-light">Rp 55.000,00</h1>
            <p className="font-light">Qty: 1</p>
          </div>
        </div>
        <hr className="my-5" />
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <img src="/sambel-roa.png" alt="" className="md:w-[8rem] w-[5rem]" />
            <h1 className="text-lg font-semibold">Sambel Roa</h1>
          </div>
          <div>
            <h1 className="text-lg font-light">Rp 55.000,00</h1>
            <p className="font-light">Qty: 1</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">Payment</h1>
          <div className="flex gap-3 items-center">
            <img src="/bank_mandiri.png" alt="" className="md:w-[8rem] w-[5rem]" />
            <p className="font-light">Bank Mandiri</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">Delivery</h1>
          <div>
            <h1 className="text-lg font-light text-slate-500">Address</h1>
            <p className="font-light">Jl. Suluh Keadilan Blok D5 N0.12, Puri Indah, Kembangan Selatan, Jakarta Barat</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard