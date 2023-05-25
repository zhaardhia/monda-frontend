import React, { useState, useEffect } from "react";
import SidebarAdmin from "./SidebarAdmin";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useSessionUser } from '../contexts/SessionUserContext'
import { useRouter } from 'next/router'
const LayoutAdmin = ({ children }) => {
  const { refreshTokenAdmin, state, dispatch, axiosJWTAdmin } = useSessionUser()
  const router = useRouter()
  useEffect(() => {
    refreshTokenAdmin()
  }, [state?.userInfo?.userId])

  const logout = async () => {
    try {
      await axiosJWTAdmin.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user-admin/logout-admin`, {
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      })
      dispatch({ type: "setIsLoggedIn", payload: false})
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <SidebarAdmin />
      <div className="absolute right-7 top-7">
        <button className="" onClick={logout}>
          <Icon icon="tabler:logout" width={30} />
        </button>
      </div>
      <div className="p-4 sm:ml-28">{children}</div>
    </>
  );
};

export default LayoutAdmin;
