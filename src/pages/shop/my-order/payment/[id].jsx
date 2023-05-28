import React, { useEffect, useState } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import PendingPayment from '@/components/MyOrder/PendingPayment'
import VerifiedPayment from '@/components/MyOrder/VerifiedPayment'
import CanceledPayment from '@/components/MyOrder/CanceledPayment'
import ExpiredPayment from '@/components/MyOrder/ExpiredPayment'
import { useRouter } from 'next/router'
import { useSessionUser } from '../../../../contexts/SessionUserContext'
import { BarLoader } from "react-spinners";

const Payment = () => {
  const router = useRouter()
  const { axiosJWT } = useSessionUser()
  const [loading, setLoading] = useState()
  const [paymentData, setPaymentData] = useState()

  useEffect(() => {
    getData()
  }, [router.query.id])

  const getData = async () => {
    try {
      setLoading(true)
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/payment/get-payment-order?order_id=${router.query.id}`)
      console.log(response, response.data.data)
      // setProduct(response.data.data)
      setPaymentData(response.data.data)
      setLoading(false)
      // setMsgError()
    } catch (error) {
      console.error(error)
      setLoading(false)
      // setMsgError(error.response.data.message)
    } 
  }
  console.log({paymentData})
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
        {loading && (
          <BarLoader />
        )}
        {!loading && paymentData?.status === "pending" && (
          <PendingPayment data={paymentData}/>
        )}
        {!loading && paymentData?.status === "settlement" && (
          <VerifiedPayment data={paymentData}/>
        )}
        {!loading && paymentData?.status === "cancel" && (
          <CanceledPayment data={paymentData}/>
        )}
        {!loading && paymentData?.status === "expire" && (
          <ExpiredPayment data={paymentData}/>
        )}
      </div>
    </LayoutShop>
  )
}

export default Payment