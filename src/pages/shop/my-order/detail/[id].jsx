import React, { useEffect, useState } from 'react'
import OrderCard from '@/components/MyOrder/OrderCard'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import { useSessionUser } from '../../../../contexts/SessionUserContext'
import { BarLoader } from "react-spinners";

const MyOrderDetail = () => {
  const { axiosJWT, refreshToken, state, dispatch } = useSessionUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetail, setOrderDetail] = useState()

  useEffect(() => {
    getData()
  }, [router.query.id])
  const getData = async () => {
    try {
      setIsLoading(true)
      console.log(router.query.id)
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/order/order-detail?order_id=${router.query.id}`, {
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      })
      console.log(response, response.data.data)
      setOrderDetail(response.data.data)     
      setIsLoading(false)  
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <LayoutShop>
      <div className="w-[90%] md:mx-0 mx-auto">
        <div className="my-10 flex flex-col gap-3">
          <div className="flex gap-3 items-center ">
            <Icon icon="mdi:credit-card-fast-outline" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl">Your Order</span>
          </div>
          <div className="flex justify-between">
            <p>Lihat pesanan anda tertera di bawah ini</p>
          </div>
        </div>
        {isLoading && (
          <BarLoader />
        )}
        {!isLoading && (
          <OrderCard data={orderDetail} setData={setOrderDetail} />       
        )}
        
      </div>
    </LayoutShop>
  )
}

export default MyOrderDetail