import React from 'react'
import Image from 'next/image'
import bg from '../../../public/bg-monda.png'

const WhyUs = () => {
  return (
    <div className="flex flex-col py-10"
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
      <h2 className="text-4xl text-center">Why Us?</h2>
      <div className="flex justify-center md:flex-row flex-col md:mx-0 mx-auto lg:gap-14 sm:gap-10 my-28">
        <div className="lg:w-[20rem] md:w-[15rem] w-[80%] md:mx-0 mx-auto flex flex-col gap-5">
          <Image
            src="/star.png"
            alt="great quality"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h4 className="text-center text-2xl">Great Quality Foodies</h4>
          <div className="bg-slate-200 rounded-xl p-5 text-xl font-light">
            Produk makanan yang kami jual dipastikan fresh dan memiliki mutu yang baik
          </div>
        </div>
        <div className="lg:w-[20rem] md:w-[15rem] w-[80%] md:mx-0 mx-auto flex flex-col gap-5">
          <Image
            src="/value-money.png"
            alt="value for money"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h4 className="text-center text-2xl">Value For Money</h4>
          <div className="bg-slate-200 rounded-xl p-5 text-xl font-light">
            Dapatkan produk yang bernilai tinggi dengan harga yang bersaing di pasaran
          </div>
        </div>
        <div className="lg:w-[20rem] md:w-[15rem] w-[80%] md:mx-0 mx-auto flex flex-col gap-5">
          <Image
            src="/fast-deliv.png"
            alt="Fast Delivery"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h4 className="text-center text-2xl">Fast Delivery</h4>
          <div className="bg-slate-200 rounded-xl p-5 text-xl font-light">
            Kami akan memastikan setiap pesanan yang terkonfirmasi akan dikirim oleh staf kami sesegera mungkin
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyUs