import React, { useState, useEffect } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import Delivery from '@/components/ShopCart/Delivery'
import RecapShopping from '@/components/ShopCart/RecapShopping'
import ItemOrdered from '@/components/ShopCart/ItemOrdered'
import Address from '@/components/ShopCart/Address'
import Link from 'next/link'
import { useSessionUser } from '../../../contexts/SessionUserContext'
import { BarLoader } from "react-spinners";
import { motion } from "framer-motion";
import { animateVibrate } from "../../../animations/animationFade";
import { useRouter } from 'next/router'
const ShoppingCart = () => {
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  const router = useRouter()
  const [msgError, setMsgError] = useState()
  const [loading, setLoading] = useState()
  const [cartData, setCartData] = useState()
  const [deliveryFee, setDeliveryFee] = useState(0)

  useEffect(() => {
    refreshToken()
    fetchUserCart()
  }, [state.userInfo.userId])

  const fetchUserCart = async () => {
    try {
      setLoading(true)
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart/user-cart?user_id=${state.userInfo.userId}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      setCartData(response.data.data)
      
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  console.log({cartData})
  console.log({loading})

  const proceedLinkToPayment = () => {
    if (!cartData) return setMsgError("User Cart kosong")
    if (!cartData.courier_id || !cartData.delivery_location || !cartData.city || !cartData.postal_code) return setMsgError("Mohon isi data pengiriman dengan lengkap")
    setMsgError(false)
    return router.push(`/shop/shopping-cart/checkout/${cartData?.shopping_session_id}`)
  }

  return (
    <LayoutShop>
      {loading && (<BarLoader />)}
      {!loading && (
        <div className="w-[90%] md:mx-0 mx-auto">
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
            
            <Address id={cartData?.shopping_session_id} delivery_location={cartData?.delivery_location} setCartData={setCartData} cartData={cartData} city_shopping={cartData?.city} postal_code={cartData?.postal_code} />
            <Delivery id={cartData?.shopping_session_id} courier_id={cartData?.courier_id}  setCartData={setCartData} setDeliveryFee={setDeliveryFee} data={cartData} />

            {cartData && !loading && (
              <>
                {cartData?.user_cart?.map((e) => {
                  console.log({cartData})
                  return (
                    <ItemOrdered data={e} setCartData={setCartData} exactData={cartData} />
                  )
                })}
                <RecapShopping data={cartData} deliveryFee={deliveryFee} />
              </>
            )}

          </div>
          <div className={`flex justify-center mt-20 ${!msgError && "mb-20"}`}>
            <button onClick={proceedLinkToPayment} className="px-7 py-4 bg-red-500 hover:bg-red-300 text-white rounded-2xl shadow-sm">Proceed to Payment</button>
          </div>
          <motion.div
            className={`border-2 border-red-500 rounded-xl p-2 ${msgError ? "block" : "hidden"} md:w-[30rem] w-full mx-auto mt-10 mb-20`}
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.5 }}
            variants={animateVibrate}
          >
            <p className="text-red-500 text-center">{msgError}</p>
          </motion.div>
        </div>
      )}
      
    </LayoutShop>
  )
}

export default ShoppingCart