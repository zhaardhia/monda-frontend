import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useSessionUser } from '../../contexts/SessionUserContext'
import { rupiah } from "../../utils/libs"

const ItemOrdered = ({ data, setCartData, exactData }) => {
  const [countCart, setCountCart] = useState(data?.["cart_items.quantity"]);
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  const [msgError, setMsgError] = useState(false)

  useEffect(() => {
    refreshToken()
  }, [countCart])

  const addToCart = async () => {
    if (countCart > 0) { 
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
  }

  const removeFromCart = async () => {
    if (countCart < data["cart_items.product.stock"]) {
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
        if (data?.["cart_items.quantity"] === 1) setCartData()
        else setCartData({
          ...exactData,
          total_amount: exactData.total_amount - data?.["cart_items.product.price"]
        })
      } catch (error) {
        console.error(error)
      } 
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

  return (
    <div className="flex justify-between md:flex-row flex-col md:items-center p-10 rounded-2xl lg:w-[60rem] md:w-[40rem] w-[100%] shadow-xl mx-auto bg-slate-50">
      <div className="flex md:flex-row flex-col gap-10 items-center">
        <img src="/sambel-roa.png" alt="" className="md:w-[8rem] w-[10rem] md:block hidden" />
        <div className="md:hidden flex justify-between w-full">
          <img src="/sambel-roa.png" alt="" className="md:w-[8rem] w-[10rem] md:hidden block" />
          <div className="flex md:hidden justify-end"
            onClick={() => removeSpecificFromCart()}
          >
            <Icon icon="ic:baseline-close" width={30} className="text-red-700" />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:w-auto w-full">
          <h1 className="text-2xl">{data?.["cart_items.product.name"]}</h1>
          <span className="text-yellow-500">Sisa: {data?.["cart_items.product.stock"]}</span>
          <div className="md:block flex justify-between items-center">
            <p className="text-lg font-light">Quantity:</p>
            <div className="flex h-[2rem]">
              <button className={`w-[2rem] border-[1px] ${countCart <= 0 && "cursor-not-allowed"}`}
                onClick={() => {
                  if (countCart > 0) {
                    removeFromCart()
                    setCountCart(countCart-1)
                  }
                }}
              >-</button>
              <div className="flex justify-evenly border-[1px] items-center w-[2rem] bg-[#DE5959] text-white">
                <div className="">
                  <p>{countCart}</p>
                </div>
              </div>
              <button className={`w-[2rem] border-[1px] ${countCart >= data?.["cart_items.product.stock"] && "cursor-not-allowed"}`}
                onClick={() => {
                  if (countCart < data["cart_items.product.stock"]) {
                    addToCart()
                    setCountCart(countCart+1)
                  }
                }}
              >+</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-20 md:mt-0 mt-5">
        <div className="hidden md:flex justify-end"
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