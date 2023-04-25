/* eslint-disable max-len */
import React, { useState } from 'react';
import Link from 'next/link'
import { Icon } from '@iconify/react';


const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {showSidebar ? (
        <button
          className="flex text-2xl text-[#565254] items-center cursor-pointer fixed right-10 top-6 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Icon icon="maki:cross" />
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="z-30 cursor-pointer mt-3"
          fill="#FFF"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="70" height="8"></rect>
          <rect y="20" width="70" height="8"></rect>
          <rect y="40" width="70" height="8"></rect>
        </svg>
      )}

      <div
        className={`top-0 right-0 w-[15rem] bg-[#FACFAD] text-xl flex flex-col gap-5 p-10 pl-10 text-[#565254] fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? 'translate-x-0 ' : 'translate-x-full'
        }`}
      >
        <button
          className="mt-20 font-semibold text-[#565254] text-left"
          type="button"
          // onClick={logOut}
        >
          Logout
        </button>
        <div className="flex gap-10">
          <Link href="#home-section" className="p-2" scroll={false}>Home</Link>
          <Link href="/" className="p-2 text-[#A88653]">About Us</Link>
          <Link href="/" className="p-2">Shop</Link>
          <Link href="/" className="p-2 text-[#A88653]">Contact Us</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="p-2">Daftar</Link>
          <Link href="/" className="p-2">Masuk</Link>
        </div>
        <hr className="my-7" />
      </div>
    </>
  );
};

export default Sidebar;
