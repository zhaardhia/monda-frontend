import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { rupiah } from "../../utils/libs"
import moment from 'moment'
import { useSessionUser } from '../../contexts/SessionUserContext'
import { motion } from "framer-motion";
import { animateVibrate, animateFromAboveSlower } from "../../animations/animationFade";
import { useRouter } from 'next/router'
const PendingPayment = ({ data }) => {
  const router = useRouter()
  const { axiosJWT, state } = useSessionUser()
  const [msgError, setMsgError] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(false)
  const [showModalConfirm, setShowModalConfirm] = useState(false)

  const cancelPayment = async () => {
    try {
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/payment/cancel-payment?transaction_id=${data?.id}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response.data)
      setShowModalConfirm(false)
      setMsgError(false)
      setMsgSuccess(`${response.data.message}. Anda akan diarahkan ke halaman order detail dalam waktu 5 detik.`)
      setTimeout(() => {
        router.push(`/shop/my-order/detail/${data?.order_id}`)
      }, 5000);
    } catch (error) {
      console.error(error)
      setShowModalConfirm(false)
      setMsgError(error)
    }
  }
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
        <img src={`/bank_${data?.provider}.png`} alt="" className="md:w-[8rem] w-[5rem]" />
        <p className="font-light text-xl">Bank {data?.provider.toUpperCase()}</p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-light">No. Rekening Virtual Account:</p>
        <p className="sm:text-3xl text-xl font-semibold">{data?.va_number}</p>
        <p className="text-gray-400">Jatuh tempo pada {moment(data?.expiry_time).format("LLL")}</p>
        <div className="sm:w-[25rem] w-[90%]">
          <p>Bayar pesanan ke Virtual Account di atas sebelum membuat pesanan kembali dengan Virtual Account agar nomor tetap sama. Harap bayar pesanan sebelum jatuh tempo pada waktu yang tertera</p>
        </div>
      </div>
      <hr className="mt-20" />
      <motion.div
        className={`border-2 border-yellow-400 rounded-xl p-2 ${msgSuccess ? "block" : "hidden"} sm:w-[30rem] w-[80%] mx-auto mt-10 mb-20`}
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.5 }}
        variants={animateFromAboveSlower}
      >
        <p className="text-yellow-400 text-center">{msgSuccess}</p>
      </motion.div>
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
        <button onClick={() => setShowModalConfirm(true)} className="px-7 py-4 bg-red-500 hover:bg-red-300 text-white rounded-2xl shadow-sm">Batalkan Order</button>
      </div>
      {showModalConfirm && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto w-fit">
              <div className="border-0 rounded-lg shadow-lg relative bg-white flex flex-col w-full outline-none focus:outline-none h-fit p-5">
                <div className="place-self-end">
                  <button
                    onClick={() => setShowModalConfirm(false)}
                  >X</button>
                </div>

                {/* <img
                  src={imgModal}
                  alt="imgModal"
                  className="w-[450px] mt-5 object-cover"
                /> */}
                <div className="my-10 flex flex-col items-center gap-10">
                  <h1 className="text-2xl">Apakah anda yakin untuk membatalkan pesanan ini?</h1>
                  <button onClick={() => cancelPayment()} className="py-2 px-5 bg-red-500 rounded-xl shadow-xl text-white">Ya, saya ingin konfirmasi pesanan ini</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  )
}

export default PendingPayment