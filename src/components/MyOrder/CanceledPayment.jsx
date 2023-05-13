import React from 'react'
import { Icon } from '@iconify/react'

const CanceledPayment = () => {
  return (
    <div>
      <div className="shadow-xl rounded-2xl flex flex-col items-center p-10 gap-5">
        <div className="w-[5rem]">
          <Icon icon="gridicons:cross-circle" className="text-red-500" width={100} />
        </div>
        <h1 className="text-2xl text-slate-600 font-semibold">Order Telah Dicancel</h1>
        <div className="w-[70%]">
          <p className="text-slate-600">Order anda telah dicancel karena telah melewati tenggat waktu pembayaran atau dibatalkan pengguna. Apabila anda ingin melakukan pemesanan lagi, silahkan tekan tombol dibawah untuk explore katalog Monda Kitchen. Happy shopping, Monders!</p>
        </div>
      </div>
      <div className="flex justify-end my-20">
        <button className="px-7 py-4 border-[1px] border-red-400 text-red-400 rounded-2xl shadow-sm">Beranda</button>
      </div>
    </div>
  )
}

export default CanceledPayment