import React from 'react'
import { rupiah } from "../../utils/libs"
const RecapShopping = ({ data, deliveryFee }) => {
  return (
    <div className="flex flex-col items-center p-10 rounded-2xl lg:w-[60rem] md:w-[40rem] w-[100%] shadow-xl mx-auto bg-slate-50 gap-5">
      <div className="flex justify-between w-full items-center">
        <p className="font-light text-lg">subtotal</p>
        <p className="font-semibold sm:text-xl text-md">{rupiah(data?.total_amount)}</p>
      </div>
      <div className="flex justify-between w-full items-center">
        <p className="font-light text-lg">delivery</p>
        <p className="font-semibold sm:text-xl text-md">{rupiah(deliveryFee)}</p>
      </div>
      <div className="flex justify-between w-full items-center">
        <p className="font-light text-lg">fee admin</p>
        <p className="font-semibold sm:text-xl text-md">{rupiah(4000)}</p>
      </div>
      <div className="flex justify-between w-full items-center">
        <p className="font-light text-lg">total</p>
        <p className="font-semibold sm:text-xl text-md">{rupiah(data?.total_amount + (deliveryFee ?? 0) + 4000)}</p>
      </div>
    </div>
  )
}

export default RecapShopping