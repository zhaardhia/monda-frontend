import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from './Sidebar'

const _Navbar = () => {
  return (
    // <nav className="flex justify-between items-center px-10">
    <nav className="fixed h-[4rem] shadow-lg rounded-2xl p-3 flex justify-between items-center z-10">
      <Link href="/">
        <Image
          src="/monda_logo.png"
          alt="Monda Logo"
          width={70}
          height={70}
        />
      </Link>
      {/* <div className="flex gap-10">
        <Link href="#home-section" className="p-2" scroll={false}>Home</Link>
        <Link href="/" className="p-2 text-[#A88653]">About Us</Link>
        <Link href="/" className="p-2">Shop</Link>
        <Link href="/" className="p-2 text-[#A88653]">Contact Us</Link>
      </div>
      <div className="flex gap-4">
        <Link href="/" className="p-2">Daftar</Link>
        <Link href="/" className="p-2">Masuk</Link>
      </div> */}
      <Sidebar />
    </nav>
  )
}

export default _Navbar