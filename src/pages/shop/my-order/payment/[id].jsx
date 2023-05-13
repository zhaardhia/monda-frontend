import React from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import PendingPayment from '@/components/MyOrder/PendingPayment'
import VerifiedPayment from '@/components/MyOrder/VerifiedPayment'
import CanceledPayment from '@/components/MyOrder/CanceledPayment'

const Payment = () => {
  return (
    <LayoutShop>
      <div className="w-[90%]">
        <div className="my-10 flex flex-col gap-3">
          <div className="flex gap-3 items-center ">
            <Icon icon="mdi:credit-card-fast-outline" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl">Payment</span>
          </div>
          <div className="flex justify-between">
            <p>*Pembayaran saat ini hanya mendukung Virtual Account dari bank yang tertera di bawah ini</p>
          </div>
        </div>
        <CanceledPayment />
      </div>
    </LayoutShop>
  )
}

export default Payment