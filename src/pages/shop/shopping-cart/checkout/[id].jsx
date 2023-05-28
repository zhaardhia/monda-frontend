import React, { useState } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSessionUser } from '../../../../contexts/SessionUserContext'
import { motion } from "framer-motion";
import { animateVibrate } from "../../../../animations/animationFade";
import { DotLoader } from "react-spinners";

const Checkout = () => {
  const router = useRouter()
  const [bank, setBank] = useState()
  const [msgError, setMsgError] = useState()
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  const [loadCheckout, setLoadCheckout] = useState(false)

  const handleBank = (bankChoosen) => {
    if (bank === bankChoosen) setBank()
    else setBank(bankChoosen)
  }

  const checkout = async () => {
    setLoadCheckout(true)
    if (!bank) {
      setLoadCheckout(false)
      setMsgError("Pilih bank sebelum checkout pesanan.")
    } else {
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
        setMsgError(false)
        setLoadCheckout(false)
        window.location =`${process.env.NEXT_PUBLIC_BASE_THIS_WEB}shop/my-order/payment/${response.data.data.order_id}`
      } catch (error) {
        console.error(error)
        setMsgError(error.response.data.message)
        setLoadCheckout(false)
      }
    }
  }

  return (
    <LayoutShop>
      <div className="w-[90%] md:mx-0 mx-auto">
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
          <div className="my-5 flex justify-between items-center cursor-pointer hover:bg-slate-50"
            onClick={() => handleBank("bca")}
          >
            <div className="flex gap-5 items-center">
              <img src="/bank_bca.png" alt="" className="md:w-[7rem] w-[4rem]" />
              <span className="text-slate-800 text-xl font-light">Bank BCA</span>
            </div>
            {bank === "bca" && (
              <Icon icon="material-symbols:check-circle" width={30} className="text-[#A88653]" />
            )}
          </div>
          <hr />
          <div className="my-5 flex justify-between items-center cursor-pointer hover:bg-slate-50"
            onClick={() => handleBank("bni")}
          >
            <div className="flex gap-5 items-center">
              <img src="/bank_bni.png" alt="" className="md:w-[7rem] w-[4rem]" />
              <span className="text-slate-800 text-xl font-light">Bank BNI</span>
            </div>
            {bank === "bni" && (
              <Icon icon="material-symbols:check-circle" width={30} className="text-[#A88653]" />
            )}
          </div>
          <hr />
          <div className="my-5 flex justify-between items-center cursor-pointer hover:bg-slate-50"
            onClick={() => handleBank("bri")}
          >
            <div className="flex gap-5 items-center">
              <img src="/bank_bri.png" alt="" className="md:w-[7rem] w-[4rem]" />
              <span className="text-slate-800 text-xl font-light">Bank BRI</span>
            </div>
            {bank === "bri" && (
              <Icon icon="material-symbols:check-circle" width={30} className="text-[#A88653]" />
            )}
          </div>
          <hr />
        </div>
        <motion.div
          className={`border-2 border-red-500 rounded-xl p-2 ${msgError ? "block" : "hidden"} sm:w-[30rem] w-[80%] mx-auto mt-10 mb-20`}
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.5 }}
          variants={animateVibrate}
        >
          <p className="text-red-500 text-center">{msgError}</p>
        </motion.div>
        <div className="flex justify-center my-20">
          <button onClick={checkout} className="px-7 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow-sm" disabled={loadCheckout}>
            {loadCheckout ? (<DotLoader size={20} />) : "Konfirmasi Pembayaran"}
          </button>
        </div>
      </div>
    </LayoutShop>
  )
}

export default Checkout