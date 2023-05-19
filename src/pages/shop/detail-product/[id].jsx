import React, { useState, useEffect } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import BannerWelcome from '@/components/ShopCatalogue/BannerWelcome'
import SearchBar from '@/components/SearchBar'
import CatalogueContainer from '@/components/ShopCatalogue/CatalogueContainer'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'
import { useSessionUser } from '../../../contexts/SessionUserContext'
import { BarLoader } from "react-spinners";
import Link from 'next/link'
import { rupiah } from '../../../utils/libs'

const ShopIndex = () => {
  const router = useRouter()
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  const axiosBasic = axios.create()
  const id = router.query.id
  const [product, setProduct] = useState()
  const [loading, setLoading] = useState()
  const [msgError, setMsgError] = useState()
  const [countCart, setCountCart] = useState(0);


  useEffect(() => {
    // refreshToken()
    getProductById()
  }, [id])

  const getProductById = async () => {
    try {
      setLoading(true)
      const response = await axiosBasic.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/product/detail-product?id=${id}`)
      console.log(response)
      setProduct(response.data.data)
      setLoading(false)
      setMsgError()
    } catch (error) {
      console.error(error)
      setLoading(false)
      setMsgError(error.response.data.message)
    } 
  }

  const addToCart = async () => {
    try {
      await axiosJWT.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart`, 
        {
          product_id: product?.id,
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

  const removeFromCart = async () => {
    try {
      await axiosJWT.put(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart`, 
        {
          product_id: product?.id,
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

  return (
    <LayoutShop>
      <div className="w-[90%] md:mx-0 mx-auto">
        <div className="flex justify-center items-center gap-5 my-10">
          <hr className="w-[30%]" />
          <p className="text-xl">Product Detail</p>
          <hr className="w-[30%]" />
        </div>
        {
          loading && (
            <div className="flex justify-center py-20">
              <BarLoader
                color="#B7C4CF"
                loading={loading}
                // cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )
        }
        {
          !loading && (
            <>
              <div className="flex lg:flex-row flex-col justify-around gap-10 items-center my-20">
                {/* <img src="/sambel-roa.png" alt="" className="md:w-[18rem] w-[15rem]" /> */}
                {product?.image ? (
                  <img src={`${process.env.NEXT_PUBLIC_BASE_WEB}${product?.image}`} alt="" className="md:w-[18rem] w-[100%]" />
                ) : (
                  <img src="/sambel-roa.png" alt="" className="md:w-[18rem] w-[100%]" />
                )}
                <div className="flex flex-col gap-4 lg:w-[50rem] w-[90%]">
                  <p className="text-4xl">{product?.name}</p>
                  <p className="font-light text-xl">{product?.description}</p>
                  <p className="text-xl text-yellow-400">Sisa <span className="font-semibold">{product?.stock}</span></p>
                  <p className="text-2xl">{rupiah(product?.price)}</p>
                  <div className="flex h-[2rem]">
                    <button className="w-[2rem] border-[1px]"
                      onClick={() => {
                        removeFromCart()
                        setCountCart(countCart-1)
                      }}
                    >-</button>
                    <button className="w-[2rem] border-[1px]"
                      onClick={() => {
                        addToCart()
                        setCountCart(countCart+1)
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
            </>
          )
        }
        <button
          className="py-3 px-5 bg-slate-400 text-white rounded-2xl ml-12"
          onClick={() => router.push("/shop")}
        >Kembali</button>
      </div>
    </LayoutShop>
  )
}

export default ShopIndex