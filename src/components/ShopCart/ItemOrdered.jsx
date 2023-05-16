import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useSessionUser } from '../../contexts/SessionUserContext'
import { rupiah } from "../../utils/libs"

const ItemOrdered = ({ data, setCartData, exactData }) => {
  const [countCart, setCountCart] = useState(data?.["cart_items.quantity"]);
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  console.log({ exactData })
  useEffect(() => {
    refreshToken()
  }, [countCart])

  const addToCart = async () => {
    try {
      await axiosJWT.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart`, 
        {
          product_id: data?.['cart_items.product.id'],
          user_id: state.userInfo.userId
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )
      setCartData({
        ...exactData,
        total_amount: exactData.total_amount + data?.["cart_items.product.price"]
      })
    } catch (error) {
      console.error(error)
    }
  }

  const removeFromCart = async () => {
    try {
      await axiosJWT.put(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart`, 
        {
          product_id: data?.['cart_items.product.id'],
          user_id: state.userInfo.userId
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )
      setCartData({
        ...exactData,
        total_amount: exactData.total_amount - data?.["cart_items.product.price"]
      })
    } catch (error) {
      console.error(error)
    }
  }

  const removeSpecificFromCart = async () => {
    try {
      await axiosJWT.put(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart/delete-cart-item`, 
        {
          shopping_session_id: exactData?.shopping_session_id,
          cart_item_id: data['cart_items.id']
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )

      const newData = exactData.user_cart.filter((e) => { return e?.['cart_items.id'] !== data?.['cart_items.id'] })
      
      setCartData({
        ...exactData,
        user_cart: newData,
        total_amount: exactData.total_amount - data?.["cart_items.product.price"] * countCart
      })
    } catch (error) {
      console.error(error)
    }
  }
  
  console.log(data)
  return (
    <div className="flex justify-between items-center p-10 rounded-2xl w-[80%] shadow-xl mx-auto bg-slate-50">
      <div className="flex gap-10 items-center">
        <img src="/sambel-roa.png" alt="" className="md:w-[8rem] w-[5rem]" />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl">{data?.["cart_items.product.name"]}</h1>
          <p className="text-lg font-light">Quantity:</p>
          <div className="flex h-[2rem]">
            <button className="w-[2rem] border-[1px]"
              onClick={() => {
                removeFromCart()
                setCountCart(countCart-1)
              }}
            >-</button>
            <div className="flex justify-evenly border-[1px] items-center w-[2rem] bg-[#DE5959] text-white">
              <div className="">
                <p>{countCart}</p>
              </div>
            </div>
            <button className="w-[2rem] border-[1px]"
              onClick={() => {
                addToCart()
                setCountCart(countCart+1)
              }}
            >+</button>
            
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-20">
        <div className="flex justify-end"
          onClick={() => removeSpecificFromCart()}
        >
          <Icon icon="ic:baseline-close" width={30} className="text-red-700" />
        </div>
        <p className="text-2xl">{rupiah(data?.["cart_items.product.price"] * countCart)}</p>
      </div>
    </div>
  )
}

export default ItemOrdered