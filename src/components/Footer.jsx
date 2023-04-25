import React from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <footer className="bg-[#294456] text-white">
      <div className="flex justify-around p-10">
        <div className="w-[15rem]">
          <h1>OUR SOCIAL MEDIA</h1>
          <hr className="text-[#A88653] my-4" />
          <div className="my-7 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Image 
                src="/tokped_logo.png"
                alt="logo tokopedia"
                width={50}
                height={50}
                className=""
              />
              <p>Monda.kitchen</p>
            </div>
            <div className="flex items-center gap-2 ml-[0.3rem]">
              <Icon icon="ph:instagram-logo" className="w-[40px]" width={27} />
              <p className="ml-2">@monda.kitchen</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <h1>CONTACT US</h1>
            <Icon icon="material-symbols:phone-in-talk-outline" width={20} />
          </div>
          <hr className="text-[#A88653] my-4" />
          <div className="my-7 flex flex-col gap-2" >
            <div className="flex gap-2 items-center">
              <Icon icon="ic:baseline-whatsapp" width={25} />
              <p>+62 5887-5545-49</p>
            </div>
          </div>
        </div>
        <div className="w-[15rem]">
          <div className="flex gap-2 items-center">
            <h1>ADDRESS</h1>
            <Icon icon="mdi:map-marker-circle" width={25} />
          </div>
          
          <hr className="text-[#A88653] my-4" />
          <div className="flex gap-2 items-center">
            Jl. Melati No.18A, RT. 19/RW.2, Serdang, Kec, Kemayoran, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10650, Indonesia
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer