import React, { useState, useEffect } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import Delivery from '@/components/ShopCart/Delivery'
import RecapShopping from '@/components/ShopCart/RecapShopping'
import ItemOrdered from '@/components/ShopCart/ItemOrdered'
import Link from 'next/link'
import { useSessionUser } from '../../../contexts/SessionUserContext'

const ShoppingCart = () => {
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  const [loading, setLoading] = useState(true)
  const [cartData, setCartData] = useState()
  useEffect(() => {
    refreshToken()
    fetchUserCart()
  }, [])

  const fetchUserCart = async () => {
    try {
      setLoading(true)
      console.log("userid ", state.userInfo.userId),
      console.log("")
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart/user-cart?user_id=${state.userInfo.userId}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })

      console.log(response)
      setCartData(response.data.data)
      
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <LayoutShop>
      <div className="w-[90%]">
        <div className="flex my-10">
            <Icon icon="material-symbols:shopping-cart-outline" width={30} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl">Your Cart</span>
        </div>
        <div className="flex justify-center items-center gap-5 my-10">
          <hr className="w-[30%]" />
          <p className="text-xl">Please fill the delivery information down below here:</p>
          <hr className="w-[30%]" />
        </div>
        <div className="flex flex-col gap-5">
          <Delivery />
          {loading && (<h1>loading...</h1>)}
          {
            !loading && cartData?.user_cart?.map((e) => {
              return (
                <ItemOrdered data={e} setCartData={setCartData} exactData={cartData} />
              )
            })
          }
          {/* <ItemOrdered />
          <ItemOrdered /> */}
          <RecapShopping data={cartData} />
        </div>
        <div className="flex justify-center my-20">
          <Link href={`/shop/shopping-cart/checkout/${cartData?.shopping_session_id}`} className="px-7 py-4 bg-red-500 hover:bg-red-300 text-white rounded-2xl shadow-sm">Proceed to Payment</Link>
        </div>
      </div>
    </LayoutShop>
  )
}

export default ShoppingCart