import React from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'
const VerifiedPayment = ({ data }) => {
  return (
    <div>
      <div className="shadow-xl rounded-2xl flex flex-col items-center p-10 gap-5">
        <div className="w-[5rem]">
          <Icon icon="material-symbols:check-circle" className="text-green-500" width={100} />
        </div>
        <h1 className="text-2xl text-slate-600 font-semibold">Pembayaran Terverifikasi</h1>
        <div className="w-[70%]">
          <p className="text-slate-600">Pembayaran anda telah terverifikasi dan pesanan anda sedang disiapkan oleh staff kami. Harap menunggu pesanan sampai ke alamat anda. Thanks for shopping with us Monders!</p>
        </div>
      </div>
      <div className="flex justify-center gap-5 my-20">
        <Link href="/shop" className="px-7 py-4 border-[1px] hover:bg-slate-50 border-red-500 text-red-500 rounded-2xl shadow-sm">Beranda</Link>
        <Link href={`/shop/my-order/detail/${data?.order_id}`} className="px-7 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow-sm">Pesanan Anda</Link>
      </div>
    </div>
  )
}

export default VerifiedPayment