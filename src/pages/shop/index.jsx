import React, { useState, useEffect } from 'react'
import LayoutShop from '@/components/LayoutShop'
import BannerWelcome from '@/components/ShopCatalogue/BannerWelcome'
import SearchBar from '@/components/SearchBar'
import CatalogueContainer from '@/components/ShopCatalogue/CatalogueContainer'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'
import { useSessionUser } from '../../contexts/SessionUserContext'
const ShopIndex = () => {
  const router = useRouter()
  // const [expire, setExpire] = useState();
  // const [token, setToken] = useState();
  const { refreshToken, dispatch, state } = useSessionUser()

  const axiosJWT = axios.create()
  axiosJWT.interceptors.request.use(async(config) => {
    const currentDate = new Date();
    console.log("tes", state?.expire * 1000 < currentDate.getTime(), state?.expire * 1000, currentDate.getTime())

    if (state?.expire * 1000 < currentDate.getTime()) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/token`, {
        withCredentials: true,
        // headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      })
      console.log(response)
      config.headers.Authorization = `Bearer ${response.data.data}`
      dispatch({ type: "setToken", payload: response.data.data})
      console.log(response, response.data.data)
      const decoded = jwt_decode(response.data.data)
      dispatch({ type: "setExpire", payload: decoded.exp})
      // setExpire(decoded.exp)
      console.log(decoded)
      return config;
    }
  }, (error) => {
    return Promise.reject(error);
  })

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

  const getUsers = async () => {
    const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`, {
      headers: {
        Authorization: `Bearer ${state?.token}`
      }
    })
    console.log(response.data)
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
        <CatalogueContainer />
        <button
          onClick={() => getUsers()}
        >get user</button>
      </div>
    </LayoutShop>
  )
}

export default ShopIndex