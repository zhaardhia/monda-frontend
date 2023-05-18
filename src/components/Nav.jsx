import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from 'next/link'
import Image from 'next/image'
import { useSessionUser } from '../contexts/SessionUserContext'

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()

  return (
    <div>
      <nav className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:block flex justify-between items-center">
            <div className="flex justify-between items-center">
              <Link href="/">
                <Image
                  src="/monda_logo.png"
                  alt="Monda Logo"
                  width={70}
                  height={70}
                />
              </Link>
              <div className="hidden md:flex gap-10 md:mx-10">
                <Link href="#home-section" scroll={false}
                  className="text-black hover:bg-gray-700 hover:text-white p-2 rounded-md text-sm font-medium"
                >Home</Link>
                <Link href="#about-us" 
                  className="text-[#A88653] hover:bg-gray-700 hover:text-white p-2 rounded-md text-sm font-medium"
                >About Us</Link>
                <Link href="/shop"
                  className="text-black hover:bg-gray-700 hover:text-white p-2 rounded-md text-sm font-medium"
                >Shop</Link>
                <Link href="/"
                  className="text-[#A88653] hover:bg-gray-700 hover:text-white p-2 rounded-md text-sm font-medium"
                >Contact Us</Link>
                {state.isLoggedIn && (
                  <Link href={`/profile/${state.userInfo.userId}`} 
                    className="text-black hover:bg-gray-700 hover:text-white p-2 rounded-md text-sm font-medium"
                  >Profile</Link>
                )}
              </div>
              {state.isLoggedIn === false && (
                <div className="hidden md:flex gap-4">
                  <Link href="/register" 
                    className="text-black hover:bg-gray-700 hover:text-white p-2 rounded-md text-sm font-medium"
                  >Daftar</Link>
                  <Link href="/login" 
                    className="text-black hover:bg-gray-700 hover:text-white p-2 rounded-md text-sm font-medium"
                  >Masuk</Link>
                </div>
              )}
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-slate-200 inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 h-10"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="#home-section"
                  className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >Home</Link>
                <Link href="#about-us" 
                  className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >About Us</Link>
                <Link href="/shop"
                  className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >Shop</Link>
                <Link href="/"
                  className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >Contact Us</Link>
                <Link href="/register" 
                  className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >Daftar</Link>
                <Link href="/login" 
                  className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >Masuk</Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;