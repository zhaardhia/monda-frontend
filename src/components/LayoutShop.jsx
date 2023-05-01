import React from 'react'
import SidebarShop from './SidebarShop';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const LayoutShop = ({ children }) => {
  return (
    <>
      <SidebarShop />
      <div className="absolute right-5 top-2">
        <Link href="/profile" className="">
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