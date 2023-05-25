import React, { useEffect, useState } from "react";
import { useSessionUser } from '../../contexts/SessionUserContext'
import { motion } from "framer-motion";
import { animateVibrate, animateFromAboveSlower } from "../../animations/animationFade";
const ModalTransaction = ({ type, setShowModal, setStatusPayment, order_id, resi }) => {
  const { axiosJWTAdmin, state } = useSessionUser()
  const [msgError, setMsgError] = useState()
  const [msgSuccess, setMsgSuccess] = useState()

  const handleVerifyShipment = async () => {
    if (!resi || !order_id) setMsgError("Data belum terisi dengan lengkap")
    else {
      try {
        await axiosJWTAdmin( 
          {
            method: "post",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/order/process-to-shipment`,
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${state?.token}`,
            },
            data: {
              order_id: order_id,
              resi: resi
            }
          }    
        )
        setMsgError(false)
        setMsgSuccess("Sukses memverifikasi pesanan tersebut sedang dalam perjalanan.")
  
        setTimeout(() => {
          window.location.reload()
        }, 5000)
      } catch (error) {
        console.error(error)
        setMsgError(error.response.data.message)
        setMsgSuccess(false)
        setTimeout(() => {
          setMsgError(false)
          setShowModal(false);
        }, 5000)
      }
    }    
  };

  const handleVerifyPayment = async () => {
    if (!order_id) setMsgError("Data belum terisi dengan lengkap")
    else {
      try {
        await axiosJWTAdmin( 
          {
            method: "post",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/order/verified-payment`,
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${state?.token}`,
            },
            data: {
              order_id: order_id,
            }
          }    
        )
        setMsgError(false)
        setMsgSuccess("Sukses memverifikasi pembayaran pesanan.")
  
        setTimeout(() => {
          window.location.reload()
        }, 5000)
      } catch (error) {
        console.error(error)
        setMsgError(error.response.data.message)
        setMsgSuccess(false)
        setTimeout(() => {
          setMsgError(false)
          setShowModal(false);
        }, 5000)
      }
    }  
  }
  
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl text-center font-semibold">Verifikasi {type === "to_shipment" && "Pengiriman"}{type === "to_verif_payment" && "Pembayaran"}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {type === "to_shipment" && (
                <p>Apakah anda yakin akan memverifikasi pesanan sedang dalam perjalanan?</p>
              )}
              {type === "to_verif_payment" && (
                <p>Apakah anda yakin akan memverifikasi pembayaran pada pesanan ini?</p>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  if (type === "to_shipment") handleVerifyShipment()
                  else if (type === "to_verif_payment") handleVerifyPayment()
                }}
              >
                Verify
              </button>
            </div>
            <motion.div
              className={`border-2 border-green-500 rounded-xl p-2 ${msgSuccess ? "block" : "hidden"} sm:w-[30rem] w-[80%] mx-auto my-10`}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.5 }}
              variants={animateFromAboveSlower}
            >
              <p className="text-green-500 text-center">{msgSuccess}</p>
            </motion.div>
            <motion.div
              className={`border-2 border-red-500 rounded-xl p-2 ${msgError ? "block" : "hidden"} sm:w-[30rem] w-[80%] mx-auto my-10`}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.5 }}
              variants={animateVibrate}
            ><p className="text-red-500 text-center">{msgError}</p></motion.div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalTransaction;
