import React, { useEffect } from 'react'
import SidebarShop from './SidebarShop';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useSessionUser } from '../contexts/SessionUserContext'


const LayoutShop = ({ children }) => {
  const { state, axiosJWT, refreshToken } = useSessionUser()

  useEffect(() => {
    refreshToken()
  }, [])

  return (
    <>
      <SidebarShop />
      <div className="absolute right-7 top-7">
        <Link href={`/profile/${state?.userInfo?.userId}`} className="">
          <Icon icon="gg:profile" width={40} />
        </Link>
      </div>
        
      <div className="p-4 sm:ml-32">
        {children}
      </div>

    </>
  )
}

export default LayoutShop