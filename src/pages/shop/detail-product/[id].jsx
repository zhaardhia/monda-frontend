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

const ShopIndex = () => {
  const router = useRouter()
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  const axiosBasic = axios.create()

  const [product, setProduct] = useState()
  const [loading, setLoading] = useState()
  const [msgError, setMsgError] = useState()
  const [countCart, setCountCart] = useState(0);


  useEffect(() => {
    // refreshToken()
    getProductById()
  }, [])

  const getUsers = async () => {
    const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`, {
      headers: {
        Authorization: `Bearer ${state?.token}`
      }
    })
    console.log(response.data)
  }
  console.log(router.query.id)
  const getProductById = async () => {
    try {
      setLoading(true)
      const response = await axiosBasic.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/product/detail-product?id=${router?.query?.id}`)
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

  return (
    <LayoutShop>
      <div className="w-[90%]">
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
              <div className="flex justify-around items-center my-20">
                <img src="/sambel-roa.png" alt="" className="md:w-[18rem] w-[5rem]" />
                <div className="flex flex-col gap-4">
                  <p className="text-4xl">{product?.name}</p>
                  <p className="font-light text-xl">{product?.description}</p>
                  <p className="text-xl">Sisa <span className="font-semibold">{product?.stock}</span></p>
                  <p className="text-2xl">Rp {product?.price}</p>
                  <div className="flex h-[2rem]">
                    <button className="w-[2rem] border-[1px]"
                      onClick={() => setCountCart(countCart-1)}
                    >-</button>
                    <button className="w-[2rem] border-[1px]"
                      onClick={() => setCountCart(countCart+1)}
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