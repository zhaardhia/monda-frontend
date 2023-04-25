import React from 'react'
import Link from 'next/link'
import bg from '../../../public/bg-monda.png'

const HomeSection = () => {
  return (
    <div id="home-section" className="h-[50rem] flex items-center"
      style={{
        backgroundImage: `url(${bg.src})`,
        // objectFit: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
        // width: '100%',
        // height: '100%',
      }}
    >
      <div className="flex w-[85%] mx-auto justify-evenly">
        <div className="flex flex-col gap-5 my-auto">
          <p className="text-2xl text-[#A88653]">Halo Monders, selamat datang di</p>
          <h1 className="md:text-6xl text-4xl">MONDA KITCHEN</h1>
          <h3 className="md:text-4xl text-2xl text-[#53514D]">Temukan solusi frozen food<br/>anda di toko kami!</h3>
          <div className="flex gap-5">
            <Link href="/" className="p-3 bg-[#DE5959] text-white rounded-lg">Shop Now</Link>
            <Link href="/" className="p-3 border-[#DE5959] border-[1px] bg-slate-100 rounded-lg text-[#DE5959]">Daftar</Link>
          </div>
        </div>
        <img src="/meat_lp.png" alt="" className="lg:w-[30rem] sm:w-[20rem] sm:block hidden" />
      </div>
    </div>
  )
}

export default HomeSection