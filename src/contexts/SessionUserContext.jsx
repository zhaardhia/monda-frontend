import React, { useContext, useEffect, useReducer } from "react";
// import { tvMazeGirls } from "../services/data"
import { useRouter } from 'next/router'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const SessionUserContext = React.createContext()

function sessionUserReducer(state, action) {
  switch (action.type) {
    case "setToken": {
      return {
        ...state,
        token: action.payload
      }
    }
    case "setExpire": {
      return {
        ...state,
        expire: action.payload
      }
    }
    case "setUserInfo": {
      return {
        ...state,
        userInfo: action.payload
      }
    }
    case "setIsLoggedIn": {
      return {
        ...state,
        isLoggedIn: action.payload
      }
    }
  }
}

export function SessionUserProvider({children}) {
  const [state, dispatch] = useReducer(sessionUserReducer, { token: "", expire: "", userInfo: {}, isLoggedIn: false })
  const router = useRouter()

  const axiosJWT = axios.create()
  axiosJWT.interceptors.request.use(async(config) => {
    const currentDate = new Date();
    // refreshToken()

    // if (state?.expire < Math.floor(Date.now() / 1000)) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/token`, {
        withCredentials: true,
        // headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      })
      config.headers.Authorization = `Bearer ${response.data.data}`
      dispatch({ type: "setToken", payload: response.data.data})
      const decoded = jwt_decode(response.data.data)
      dispatch({ type: "setExpire", payload: decoded.exp})
      dispatch({ type: "setUserInfo", payload: decoded})
      dispatch({ type: "setIsLoggedIn", payload: true})

      // setExpire(decoded.exp)
      console.log(decoded)
      return config;
    // } else {
    //   console.log("gblk")
    //   return config
    // }
  }, (error) => {
    console.log(error)
    dispatch({ type: "setIsLoggedIn", payload: false})
    Promise.reject(error);
    return router.push("/login")
  })

  const axiosBasic = axios.create()


  const refreshToken = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/token`, {
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      })
      console.log(response, response.data.data)
      const decoded = jwt_decode(response.data.data)
      // setExpire(decoded.exp)
      dispatch({ type: "setExpire", payload: decoded.exp })
      dispatch({ type: "setUserInfo", payload: decoded })
      dispatch({ type: "setIsLoggedIn", payload: true})

    } catch (error) {
      dispatch({ type: "setIsLoggedIn", payload: false})
      if (error.response) {
        router.push("/login")
      }
      console.error(error)
    }
  }

  const value = {state, dispatch, refreshToken, axiosJWT, axiosBasic}
  return <SessionUserContext.Provider value={value}>{children}</SessionUserContext.Provider>
}

export function useSessionUser() {
  const context = useContext(SessionUserContext)

  if (context === undefined) {
    throw new Error('useSessionUser must be used within a CountProvider')
  }
  return context
}