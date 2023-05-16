import React, { useState } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSessionUser } from '../../../../contexts/SessionUserContext'

const Checkout = () => {
  const router = useRouter()
  const [bank, setBank] = useState()
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()

  const handleBank = (bankChoosen) => {
    if (bank === bankChoosen) setBank()
    else setBank(bankChoosen)
  }

  const checkout = async () => {
    try {
      const response = await axiosJWT.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/order/checkout`, 
        {
          user_id: state.userInfo.userId,
          payment_type: "bank_transfer",
          provider: bank
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )
      console.log({response})
      router.push(`/shop/my-order/payment/${response.data.data.order_id}`)
    } catch (error) {
      console.error(error)
    }
  }

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
        <div>
          <div className="my-5 flex gap-3 items-center">
            <Icon icon="solar:card-transfer-broken" width={30} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl">Transfer Bank (Virtual Account)</span>
          </div>
          <hr />
          <div className="my-5 flex justify-between items-center"
            onClick={() => handleBank("mandiri")}
          >
            <div className="flex gap-3 items-center">
              <img src="/bank_mandiri.png" alt="" className="md:w-[8rem] w-[5rem]" />
              <p className="font-light text-xl">Bank Mandiri</p>
            </div>
            {bank === "mandiri" && (
              <Icon icon="material-symbols:check-circle" width={30} className="text-[#A88653]" />
            )}
          </div>
          <hr />
          <div className="my-5 flex justify-between items-center"
            onClick={() => handleBank("bca")}
          >
            <div className="flex gap-3 items-center">
              <img src="/bank_mandiri.png" alt="" className="md:w-[8rem] w-[5rem]" />
              <span className="text-slate-800 text-xl font-light">Bank BCA</span>
            </div>
            {bank === "bca" && (
              <Icon icon="material-symbols:check-circle" width={30} className="text-[#A88653]" />
            )}
          </div>
          <hr />
          <div className="my-5 flex justify-between items-center"
            onClick={() => handleBank("bni")}
          >
            <div className="flex gap-3 items-center">
              <img src="/bank_mandiri.png" alt="" className="md:w-[8rem] w-[5rem]" />
              <span className="text-slate-800 text-xl font-light">Bank BNI</span>
            </div>
            {bank === "bni" && (
              <Icon icon="material-symbols:check-circle" width={30} className="text-[#A88653]" />
            )}
          </div>
          <hr />
          <div className="my-5 flex justify-between items-center"
            onClick={() => handleBank("permata")}
          >
            <div className="flex gap-3 items-center">
              <img src="/bank_mandiri.png" alt="" className="md:w-[8rem] w-[5rem]" />
              <span className="text-slate-800 text-xl font-light">Bank Permata</span>
            </div>
            {bank === "permata" && (
              <Icon icon="material-symbols:check-circle" width={30} className="text-[#A88653]" />
            )}
          </div>
          <hr />
        </div>
        <div className="flex justify-center my-20">
          <button onClick={checkout} className="px-7 py-4 bg-red-500 hover:bg-red-300 text-white rounded-2xl shadow-sm">Confirm Payment</button>
        </div>
      </div>
    </LayoutShop>
  )
}

export default Checkout