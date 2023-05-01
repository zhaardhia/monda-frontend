import React, { useState } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import Delivery from '@/components/ShopCart/Delivery'
import RecapShopping from '@/components/ShopCart/RecapShopping'
import ItemOrdered from '@/components/ShopCart/ItemOrdered'
import Link from 'next/link'

const ShoppingCart = () => {
  return (
    <LayoutShop>
      <div className="w-[90%]">
        <div className="flex my-10">
            <Icon icon="material-symbols:shopping-cart-outline" width={30} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl">Your Cart</span>
        </div>
        <div className="flex justify-center items-center gap-5 my-10">
          <hr className="w-[30%]" />
          <p className="text-xl">Please fill the delivery information down below here:</p>
          <hr className="w-[30%]" />
        </div>
        <div className="flex flex-col gap-5">
          <Delivery />
          <ItemOrdered />
          <ItemOrdered />
          <RecapShopping />
        </div>
        <div className="flex justify-center my-20">
          <Link href="#" className="px-7 py-4 bg-red-500 hover:bg-red-300 text-white rounded-2xl shadow-sm">Proceed to Payment</Link>
        </div>
      </div>
    </LayoutShop>
  )
}

export default ShoppingCart