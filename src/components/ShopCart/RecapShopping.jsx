import React from 'react'

const RecapShopping = () => {
  return (
    <div className="flex flex-col items-center p-10 rounded-2xl w-[80%] shadow-xl mx-auto bg-slate-50 gap-5">
      <div className="flex justify-between w-full">
        <p className="font-light text-lg">subtotal</p>
        <p className="font-semibold text-xl">Rp 90.000,00</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="font-light text-lg">delivery</p>
        <p className="font-semibold text-xl">Rp 15.000,00</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="font-light text-lg">total</p>
        <p className="font-semibold text-xl">Rp 105.000,00</p>
      </div>
    </div>
  )
}

export default RecapShopping