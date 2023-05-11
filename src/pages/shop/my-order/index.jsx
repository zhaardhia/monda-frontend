import React, { useState, useEffect } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import Select from 'react-select'
import OrderCard from '@/components/MyOrder/OrderCard'
import { useSessionUser } from '../../../contexts/SessionUserContext'

const MyOrder = () => {
  const { refreshToken } = useSessionUser()

  const chooseOrderType = [
    { value: 'sedang_berlangsung', label: 'Sedang Berlangsung' },
    { value: 'selesai', label: 'Selesai' },
  ]

  useEffect(() => {
    refreshToken()
    // getUsers()
  }, [])

  // const refreshToken = async () => {
  //   try {
  //     const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/token`, {
  //       withCredentials: true,
  //       headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
  //     })
  //     console.log(response, response.data.data)
  //     const decoded = jwt_decode(response.data.data)
  //     setExpire(decoded.exp)
      
  //     console.log(decoded)
  //   } catch (error) {
  //     if (error.response) {
  //       router.push("/")
  //     }
  //     console.error(error)
  //   }
  // }

  return (
    <LayoutShop>
      <div className="w-[90%]">
        <div className="my-10 flex flex-col gap-3">
          <div className="flex gap-3 items-center ">
            <Icon icon="mdi:credit-card-fast-outline" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl">Your Order</span>
          </div>
          <div className="flex justify-between">
            <p>Lihat pesanan anda tertera di bawah ini</p>
            <Select
              className="basic-single w-[30%]"
              classNamePrefix="select"
              // defaultValue={chooseCourier[0]}
              // isLoading={isLoading}
              isClearable={false}
              isSearchable={false}
              name="orderType"
              options={chooseOrderType}
            />
          </div>
        </div>

        <OrderCard />
        <OrderCard />
        <OrderCard />
        
        {/* <div className="flex justify-center items-center gap-5 my-10">
          <hr className="w-[30%]" />
          <p className="text-xl">Please fill the delivery information down below here:</p>
          <hr className="w-[30%]" />
        </div> */}
        
      </div>
    </LayoutShop>
  )
}

export default MyOrder