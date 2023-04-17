import React from 'react'
import Link from 'next/link'

const HomeSection = () => {
  return (
    <div id="home-section" className="h-[40rem] flex items-center">
      <div className="flex w-[85%] mx-auto justify-evenly">
        <div className="flex flex-col gap-5 my-auto">
          <p className="text-2xl text-[#A88653]">Halo Monders, selamat datang di</p>
          <h1 className="text-6xl">MONDA KITCHEN</h1>
          <h3 className="text-4xl text-[#53514D]">Temukan solusi frozen food<br/>anda di toko kami!</h3>
          <div className="flex gap-5">
            <Link href="/" className="p-3 bg-[#DE5959] text-white rounded-lg">Shop Now</Link>
            <Link href="/" className="p-3 border-[#DE5959] border-[1px] bg-slate-100 rounded-lg text-[#DE5959]">Daftar</Link>
          </div>
        </div>
        <img src="/meat_lp.png" alt="" className="w-[30rem]" />
      </div>
    </div>
  )
}

export default HomeSection