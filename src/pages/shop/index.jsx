import React, { useState, useEffect } from 'react'
import LayoutShop from '@/components/LayoutShop'
import BannerWelcome from '@/components/ShopCatalogue/BannerWelcome'
import SearchBar from '@/components/SearchBar'
import CatalogueContainer from '@/components/ShopCatalogue/CatalogueContainer'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'
import { useSessionUser } from '../../contexts/SessionUserContext'
import { BarLoader } from "react-spinners";

const ShopIndex = () => {
  const router = useRouter()
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  const axiosBasic = axios.create()

  const [products, setProducts] = useState()
  const [loading, setLoading] = useState()
  const [msgError, setMsgError] = useState()

  useEffect(() => {
    getAllProducts()
  }, [])

  const getUsers = async () => {
    const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`, {
      headers: {
        Authorization: `Bearer ${state?.token}`
      }
    })
    console.log(response.data)
  }

  const getAllProducts = async () => {
    try {
      setLoading(true)
      console.log(state.userInfo.userId)
      const response = await axiosBasic.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/product?user_id=${state.userInfo.userId}`)
      console.log(response)
      setProducts(response.data.data)
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl">Hi<span className="text-[#A88653]">, Ishaq!</span></h1>
          <SearchBar />
        </div>
        <BannerWelcome />
        <div className="flex justify-center items-center gap-5 my-10">
          <hr className="w-[30%]" />
          <p className="text-xl">Our Products</p>
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
            <CatalogueContainer products={products} />
          )
        }
        <button
          onClick={() => getUsers()}
        >get user</button>
      </div>
    </LayoutShop>
  )
}

export default ShopIndex