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
  }
}

export function SessionUserProvider({children}) {
  const [state, dispatch] = useReducer(sessionUserReducer, { token: "", expire: "", userInfo: {} })
  const router = useRouter()

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

      console.log(decoded)
    } catch (error) {
      if (error.response) {
        router.push("/login")
      }
      console.error(error)
    }
  }

  const value = {state, dispatch, refreshToken}
  return <SessionUserContext.Provider value={value}>{children}</SessionUserContext.Provider>
}

export function useSessionUser() {
  const context = useContext(SessionUserContext)

  if (context === undefined) {
    throw new Error('useSessionUser must be used within a CountProvider')
  }
  return context
}