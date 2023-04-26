import React from 'react'
import bg from '../../../public/bg-monda.png'
import { motion, useAnimation, Variants } from 'framer-motion'
import { animateFromLeft, animateFromRight, animateFromAboveSlower, animateOpacity } from '../../animations/animationFade'
import Link from 'next/link'

const BannerWelcome = () => {
  return (
    <div className="h-[30rem] flex items-center w-full rounded-xl"
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
      <div className="flex w-[85%] ml-32">
        <motion.div 
          className="flex flex-col gap-5 my-auto"
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{once:true}}
          transition={{staggerChildren:0.5}}
          variants={animateFromLeft}
        >
          <h1 className="md:text-6xl text-4xl text-[#53514D]">Happy Shopping,<br /><span className="text-[#A88653]">Monders!</span></h1>
          <h3 className="md:text-2xl text-xl text-[#53514D]">See our catalogue below</h3>
          
        </motion.div>
      </div>
    </div>
  )
}

export default BannerWelcome