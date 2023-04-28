import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const ItemOrdered = () => {
  const [countCart, setCountCart] = useState(0);

  return (
    <div className="flex justify-between items-center p-10 rounded-2xl w-[80%] shadow-xl mx-auto bg-slate-50">
      <div className="flex gap-10 items-center">
        <img src="/sambel-roa.png" alt="" className="md:w-[8rem] w-[5rem]" />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl">Sambel Roa</h1>
          <p className="text-lg font-light">Quantity:</p>
          <div className="flex h-[2rem]">
            <button className="w-[2rem] border-[1px]"
              onClick={() => setCountCart(countCart-1)}
            >-</button>
            <div className="flex justify-evenly border-[1px] items-center w-[2rem] bg-[#DE5959] text-white">
              <div className="">
                <p>{countCart}</p>
              </div>
            </div>
            <button className="w-[2rem] border-[1px]"
              onClick={() => setCountCart(countCart+1)}
            >+</button>
            
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-20">
        <div className="flex justify-end">
          <Icon icon="ic:baseline-close" width={30} className="text-red-700" />
        </div>
        <p className="text-2xl">Rp 55.000,00</p>
      </div>
    </div>
  )
}

export default ItemOrdered