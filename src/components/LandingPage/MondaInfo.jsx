import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, Variants } from 'framer-motion'
import { animateFromLeft, animateFromRight, animateFromAboveSlower, animateOpacity } from '../../animations/animationFade'

const MondaInfo = () => {
  return (
    <motion.div id="monda-info"
      initial={"offscreen"}
      whileInView={"onscreen"}
      viewport={{once:true}}
      transition={{staggerChildren:0.5}}
      variants={animateFromAboveSlower}
    >
      <div className="flex justify-center items-center mt-10">
        <hr className="w-[100%]" />
        <Image
          src="/monda_logo.png"
          alt="Monda Logo"
          width={70}
          height={70}
        />
        <hr className="w-[100%]" />
      </div>
      <div className="my-28">
        <div className="flex justify-center sm:flex-row flex-col md:gap-20 gap-10 items-center">
          <img src="/kentang.png" alt="" className="md:w-[15rem] w-[10rem]" />
          <img src="/_sambel-roa.png" alt="" className="md:w-[15rem] w-[10rem]" />
          <img src="/kebab.png" alt="" className="md:w-[15rem] w-[10rem]" />
        </div>
        <div className="w-[50%] mx-auto my-10">
          <p className="text-2xl font-extralight">Monda kitchen menjual beberapa macam frozen food, makanan siap saji, dan sambal-sambal pilihan olahan khas Monda Kitchen yang bisa monders pesan langsung melalui website, tokopedia, maupun gojek</p>
        </div>
        <div className="flex justify-center">
          <Link href="/shop" className="p-3 bg-[#DE5959] text-white rounded-lg">Shop Now</Link>
        </div>
      </div>
      <div className="flex justify-center items-center mb-10">
        <hr className="w-[100%]" />
        <Image
          src="/monda_logo.png"
          alt="Monda Logo"
          width={70}
          height={70}
        />
        <hr className="w-[100%]" />
      </div>
    </motion.div>
  )
}

export default MondaInfo