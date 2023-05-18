import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import Link from 'next/link';
import { useSessionUser } from '../../contexts/SessionUserContext'
import { rupiah } from "../../utils/libs"
const CatalogueCard = ({ data }) => {
  const [countCart, setCountCart] = useState(data?.userCart?.quantity || 0);
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  console.log({ data })
  const addToCart = async () => {
    if (countCart < data.stock) {
      try {
        await axiosJWT.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart`, 
          {
            product_id: data?.id,
            user_id: state.userInfo.userId
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${state?.token}`
            }
          }
        )
      } catch (error) {
        console.error(error)
      }
    }
  }

  const removeFromCart = async () => {
    if (countCart > 0) {
      try {
        await axiosJWT.put(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart`, 
          {
            product_id: data?.id,
            user_id: state.userInfo.userId
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${state?.token}`
            }
          }
        ) 
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="md:w-[20rem] sm:w-[15rem] w-[10rem] shadow-xl rounded-lg flex flex-col items-center">
      <img src="/sambel-roa.png" alt="" className="md:w-[18rem] w-[100%]" />
      <div className="w-[90%] my-4 flex flex-col">
        <Link href={`/shop/detail-product/${data?.id}`} className="sm:text-xl text-lg font-semibold">{data?.name}</Link>
        <span className="text-yellow-500">Sisa: {data?.stock}</span>
        <div className="flex justify-between md:flex-row flex-col md:items-center sm:my-0 my-2 sm:gap-0 gap-2">
          <p>{rupiah(data?.price)}</p>
          <div className="flex h-[2rem]">
            <button className={`w-[2rem] border-[1px] ${countCart === 0 && "cursor-not-allowed"}`}
              onClick={() => {
                removeFromCart()
                setCountCart(countCart-1)
              }}
            >-</button>
            <button className={`w-[2rem] border-[1px] ${countCart === data.stock && "cursor-not-allowed"}`}
              onClick={() => {
                if (countCart < data.stock) {
                  addToCart()
                  setCountCart(countCart+1)
                }
              }}
            >+</button>
            <div className="flex justify-evenly border-[1px] items-center w-[4rem] bg-[#DE5959] text-white">
              <div className="">
                <p>{countCart}</p>
              </div>
              <Icon icon="material-symbols:shopping-cart-outline-rounded" width={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogueCard