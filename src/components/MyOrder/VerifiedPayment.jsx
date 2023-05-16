import React from 'react'
import { Icon } from '@iconify/react'

const VerifiedPayment = () => {
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
        <button className="px-7 py-4 border-[1px] border-red-400 text-red-400 rounded-2xl shadow-sm">Beranda</button>
        <button className="px-7 py-4 bg-red-500 hover:bg-red-300 text-white rounded-2xl shadow-sm">Pesanan Anda</button>
      </div>
    </div>
  )
}

export default VerifiedPayment