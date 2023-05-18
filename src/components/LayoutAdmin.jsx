import React, { useState, useEffect } from "react";
import SidebarAdmin from "./SidebarAdmin";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useSessionUser } from '../contexts/SessionUserContext'

const LayoutAdmin = ({ children }) => {
  const { refreshTokenAdmin, state } = useSessionUser()

  useEffect(() => {
    refreshTokenAdmin()
  }, [state?.userInfo?.userId])

  return (
    <>
      <SidebarAdmin />
      <div className="absolute right-7 top-7">
        <Link href="#" className="">
          <Icon icon="gg:profile" width={40} />
        </Link>
      </div>
      <div className="p-4 sm:ml-28">{children}</div>
    </>
  );
};

export default LayoutAdmin;
