import React from 'react'
import { Icon } from '@iconify/react'
import { rupiah } from "../../utils/libs"
import moment from 'moment'

const PendingPayment = ({ data }) => {
  return (
    <div>
      <div className="my-5 flex gap-3 items-center">
        <Icon icon="solar:card-transfer-broken" width={30} className="text-[#A88653]" />
        <span className="text-slate-800 text-2xl">Transfer Bank (Virtual Account)</span>
      </div>
      <hr />
      <div className="my-10 flex justify-between items-center">
        <span className="text-slate-800 text-2xl">Total Pembayaran</span>
        <span className="text-slate-800 text-lg font-light">{rupiah(data?.amount)}</span>
      </div>
      <hr />
      <div className="my-8 flex gap-3 items-center">
        <img src="/bank_mandiri.png" alt="" className="md:w-[8rem] w-[5rem]" />
        <p className="font-light text-xl">Bank {data?.provider.toUpperCase()}</p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-light">No. Rekening Virtual Account:</p>
        <p className="text-3xl font-semibold">{data?.va_number}</p>
        <p className="text-gray-400">Jatuh tempo pada {moment(data?.expiry_time).format("LLL")}</p>
        <div className="w-[25rem]">
          <p>Bayar pesanan ke Virtual Account di atas sebelum membuat pesanan kembali dengan Virtual Account agar nomor tetap sama. Harap bayar pesanan sebelum jatuh tempo pada waktu yang tertera</p>
        </div>
      </div>
      <hr className="mt-20" />
      <div className="flex justify-center my-20">
        <button className="px-7 py-4 bg-red-500 hover:bg-red-300 text-white rounded-2xl shadow-sm">Cancel Order</button>
      </div>
    </div>
  )
}

export default PendingPayment