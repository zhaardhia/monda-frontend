import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
const SidebarShop = () => {
  const [sidebarActive, setSidebarActive] = useState();
  const router = useRouter()

  return (
    <>
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => setSidebarActive(!sidebarActive)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-[4rem] h-screen transition-transform ${sidebarActive ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#294456] dark:bg-gray-800 flex flex-col gap-20">
          <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className={`inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 bg-slate-500 mx-auto`}
            onClick={() => setSidebarActive(!sidebarActive)}
          >
            {/* <span className="sr-only">Open sidebar</span> */}
            <Icon icon="pajamas:close" width={20} className="text-white" />
          </button>
          <Link href="/" className="mt-10">
            <Image
              src="/monda_logo.png"
              alt="Monda Logo"
              width={100}
              height={100}
            />
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-600 dark:hover:bg-gray-700">
                <Icon icon="material-symbols:home" width={30} className="text-slate-100" />
              </Link>
            </li>
            <li className={`${router.pathname === "/shop" && "bg-[#A88653] rounded-lg"}`}>
              <Link href="/shop" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-600 dark:hover:bg-gray-700">
                <Icon icon="mingcute:shopping-bag-1-fill" width={30} className="text-slate-100" />
              </Link>
            </li>
            <li className={`${router.pathname.includes("/belanja-bulanan") && "bg-[#A88653] rounded-lg"}`}>
              <Link href="/belanja-bulanan" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-600 dark:hover:bg-gray-700">
                <Icon icon="solar:cart-linear" width={30} className="text-slate-100" />
              </Link>
            </li>
            <li className={`${router.pathname.includes("/shop/shopping-cart") && "bg-[#A88653] rounded-lg"}`}>
              <Link href="/shop/shopping-cart" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-600 dark:hover:bg-gray-700">
                <Icon icon="material-symbols:shopping-cart-outline" width={30} className="text-slate-100" />
              </Link>
            </li>
            <li className={`${router.pathname.includes("/shop/my-order") && "bg-[#A88653] rounded-lg"}`}>
              <Link href="/shop/my-order" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-600 dark:hover:bg-gray-700">
                <Icon icon="mdi:credit-card-fast-outline" width={30} className="text-slate-100" />
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default SidebarShop