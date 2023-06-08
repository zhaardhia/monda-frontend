import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { checkStatusOrder, checkStatusOrderBgColor, checkStatusOrderTextColor, myStatusOrderText } from '../../utils/libs'
import { rupiah } from "../../utils/libs"
import { useSessionUser } from '../../contexts/SessionUserContext'
import moment from 'moment'

const OrderCard = ({ data, setData }) => {
  const { axiosJWT, refreshToken, state, dispatch } = useSessionUser()
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const bgStatus = checkStatusOrderBgColor(data?.status_order)
  const textStatusColor = checkStatusOrderTextColor(data?.status_order)
  useEffect(() => {
    // setBgStatus(checkStatusOrderBgColor(data?.status_order))
    // setTextStatusColor(checkStatusOrderBgColor(data?.status_order))
  }, [bgStatus, textStatusColor])
  console.log({data})
  const handleConfirmOrder = async () => {
    try {
      await axiosJWT.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/order/done-order`, 
        {
          order_id: data?.id,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )
      setShowModalConfirm(false)
      setData({
        ...data,
        status_order: "completed"
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="border-[1px] rounded-xl p-10 my-10">
      <div className="flex sm:flex-row flex-col justify-between sm:items-center sm:gap-0 gap-8 mb-5">
        <Link className="text-xl underline" href="/shop/my-order/">{"< Kembali"}</Link>
        <div className="flex gap-2 items-center">
          <p className="text-xl text-slate-400 font-light">Status: </p>
          <div className={`${bgStatus} p-2 rounded-xl`}>
            <p className={`${textStatusColor}`}>{checkStatusOrder(data?.status_order)}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-light">Order No: <strong>#00{data?.order_no}</strong></h1>
        <h1 className="text-xl font-light">No. Resi: <strong>{data?.resi ?? "Produk Belum Dikirim"}</strong></h1>
        <h1 className="text-xl font-light">Kurir: <strong>{data?.courier.toUpperCase()}</strong></h1>
      </div>

      {data?.status_order === "shipment" && (
        <div className="mt-5">
          <h1 className="text-xl font-light">Dipesan Tanggal: <strong>{moment(data?.created_date).format("LLL")}</strong></h1>
          <h1 className="text-xl font-light">Dikirim Tanggal: <strong>{moment(data?.updated_date).format("LLL")}</strong></h1>
          <h1 className="text-xl font-light">Pengiriman ke: <strong>{data?.address}</strong></h1>
        </div>
      )}

      {data?.status_order === "completed" && (
        <div className="mt-5">
          <h1 className="text-xl font-light">Dipesan Tanggal: <strong>{moment(data?.created_date).format("LLL")}</strong></h1>
          <h1 className="text-xl font-light">Sampai Tanggal: <strong>{moment(data?.updated_date).format("LLL")}</strong></h1>
          <h1 className="text-xl font-light">Pengiriman ke: <strong>{data?.address}</strong></h1>
        </div>
      )}
      
      <div className="my-10">
        {data?.order_detail?.map((e) => {
          return (
            <>
              <div className="flex justify-between sm:flex-row flex-col sm:items-center sm:gap-0 gap-3">
                <div className="flex gap-3 items-center">
                  {e?.["product.image"] ? (
                    <img src={`${process.env.NEXT_PUBLIC_BASE_WEB}${e?.["product.image"]}`} alt="" className="md:w-[18rem] w-[5rem] h-[70%] object-cover" />
                  ) : (
                    <img src={`/sambel-roa.png`} alt="" className="md:w-[18rem] w-[5rem] object-cover" />
                  )}
                  <h1 className="text-lg font-semibold">{e?.["product.name"]}</h1>
                </div>
                <div>
                  <h1 className="text-lg font-light">{rupiah(e?.total_amount)}</h1>
                  <p className="font-light">Qty: {e?.quantity}</p>
                </div>
              </div>
              <hr className="my-5" />
            </>
          )
        })}
      </div>
      <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">Payment</h1>
          <div className="flex gap-5 items-center">
            <img src={`/bank_${data?.["payment_order.provider"]}.png`} alt="" className="md:w-[7rem] w-[4rem]" />
            <p className="font-light">Bank {data?.["payment_order.provider"].toUpperCase()}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">Delivery</h1>
          <div>
            <h1 className="text-lg font-light text-slate-500">Address</h1>
            <p className="font-light">{data?.address.toUpperCase()}</p>
          </div>
        </div>
      </div>
      <div className={`sm:w-[70%] w-[95%] mx-auto ${bgStatus} rounded-xl p-2 my-20`}>
        <p className={`${textStatusColor} text-center`}>{myStatusOrderText(data?.status_order)}</p>
      </div>
      {data?.status_order === "not_paid" && (
        <div className="flex justify-end">
          <Link href={`/shop/my-order/payment/${data?.id}`} className="py-2 px-5 bg-red-500 rounded-xl shadow-xl text-white underline">Selesaikan Pembayaran</Link>
        </div>
      )}
      {data?.status_order === "shipment" && (
        <div className="flex justify-end gap-3">
          <a href="https://cekresi.com/" target="_blank" className="py-2 px-5 bg-red-500 rounded-xl shadow-xl text-white underline">Track Order</a>
          <button onClick={() => setShowModalConfirm(true)} className="py-2 px-5 bg-green-500 rounded-xl shadow-xl text-white">Konfirmasi Pesanan Sampai</button>
        </div>
      )}
      {data?.status_order === "completed" && (
        <div className="flex justify-end">
          <Link href="/shop" className="py-2 px-5 bg-red-500 rounded-xl shadow-xl text-white underline">Shop Again</Link>
        </div>
      )}
      
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
                  <h1 className="text-2xl">Apakah anda yakin pesanan anda telah sampai & ingin menyelesaikan pesanan ini?</h1>
                  <button onClick={() => handleConfirmOrder()} className="py-2 px-5 bg-green-500 rounded-xl shadow-xl text-white">Ya, saya ingin konfirmasi pesanan ini</button>
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

export default OrderCard