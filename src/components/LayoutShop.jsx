import React, { useEffect } from 'react'
import SidebarShop from './SidebarShop';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useSessionUser } from '../contexts/SessionUserContext'
import { useRouter } from 'next/router'


const LayoutShop = ({ children }) => {
  const {
    asPath,
    pathname,
  } = useRouter();
  const { state, axiosJWT, refreshToken } = useSessionUser()

  useEffect(() => {
    if (pathname !== '/shop/detail-product/[id]' && pathname !== '/shop') refreshToken()
  }, [])

  return (
    <>
      <SidebarShop />
      <div className="absolute right-5 top-3 bg-slate-300 hover:bg-slate-100 rounded-xl p-1 text-white">
        <Link href={`/profile/${state?.userInfo?.userId}`} className="">
          <Icon icon="gg:profile" width={30} />
        </Link>
      </div>
        
      <div className="p-4 sm:ml-32">
        {children}
      </div>

    </>
  )
}

export default LayoutShop