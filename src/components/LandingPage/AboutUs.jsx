import React from 'react'
import Image from 'next/image'

const AboutUs = () => {
  return (
    <div id="about-us" className="lg:w-[80%] w-[90%] mx-auto flex flex-col gap-10 my-20">
      <div className="flex justify-center items-center">
        <hr className="w-[100%]" />
        <Image
          src="/monda_logo.png"
          alt="Monda Logo"
          width={70}
          height={70}
        />
        <hr className="w-[100%]" />
      </div>
      <h1 className="text-center text-4xl">About Us</h1>
      <Image 
        src="/ikanroa_aboutus.png"
        alt="ikan roa in about us"
        width={200}
        height={200}
        className="mx-auto"
      />
      <div className="">
        <p>
          Monda kitchen pertama kali berdiri pada tahun 2019 sebagai Usaha Mikro Kecil dan Menengah atau UMKM dengan nama dapur lemonda dengan fokus produk pertama kali menjual 3 sambal olahan khas dapur lemonda yaitu sambal roa, sambal bawang, dan sambal roa.
          <br />
          <br />
          Produk pertama kali dipasarkan melalui tokopedia dan dapat diorder juga melalui whatsapp. Setelah mendapat respon yang baik dari pasar, dapur lemonda kemudian melebarkan sayap dengan menambahkan katalog produk yang dijual yaitu pada sektor frozen food dan makanan siap saji dan kini berganti nama menjadi “Monda Kitchen”.
        </p>
      </div>
      
    </div>
  )
}

export default AboutUs