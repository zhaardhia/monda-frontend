import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import Link from 'next/link';

const CatalogueCard = ({ data }) => {
  const [countCart, setCountCart] = useState(0);

  return (
    <div className="w-[20rem] shadow-xl rounded-lg flex flex-col items-center">
      <img src="/sambel-roa.png" alt="" className="md:w-[18rem] w-[5rem]" />
      <div className="w-[90%] my-4 flex flex-col gap-2">
        <Link href={`/shop/detail-product/${data?.id}`} className="text-xl font-semibold">{data?.name}</Link>
        <div className="flex justify-between items-center">
          <p>Rp {data?.price}</p>
          <div className="flex h-[2rem]">
            <button className="w-[2rem] border-[1px]"
              onClick={() => setCountCart(countCart-1)}
            >-</button>
            <button className="w-[2rem] border-[1px]"
              onClick={() => setCountCart(countCart+1)}
            >+</button>
            <div className="flex justify-evenly border-[1px] items-center w-[4rem] bg-[#DE5959] text-white">
              <div className="">
                <p>{countCart}</p>
              </div>
              <Icon icon="material-symbols:shopping-cart-outline-rounded" width={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogueCard