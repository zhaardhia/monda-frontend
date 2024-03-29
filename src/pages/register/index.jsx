import React, { useState } from 'react'
import Layout from '@/components/Layout'
import bg from '../../../public/bg-monda.png'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { motion } from 'framer-motion'
import { animateVibrate } from '../../animations/animationFade'
import { useRouter } from 'next/router'

const Register = () => {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [msgError, setMsgError] = useState()

  const submitUser = async () => {
    console.log("tes")
    console.log({ firstName, lastName, email, password, confPassword })

    try {
      setMsgError(null)
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/register-user`, {
          email, 
          first_name: firstName, 
          last_name: lastName, 
          fullname: `${firstName} ${lastName}`, 
          phone,
          password, 
          confPassword, 
          role: 1
        }
      )
      setMsgError(null)
      router.push('/login')
    } catch (error) {
      console.error(error)
      console.error(error.response.data.message)
      setMsgError(error.response.data.message)
    }
  }

  return (
    <Layout>
      <div className="w-full flex justify-center items-center"
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
        <div className="bg-[#294456] rounded-2xl sm:px-20 px-10 py-10 my-14 xl:w-[70rem] md:w-[50rem] w-[90%] flex flex-col">
          <Link href="/">
            <Image
              src="/monda_logo.png"
              alt="Monda Logo"
              width={70}
              height={70}
            />
          </Link>
          <div className="flex sm:justify-around justify-center mx-auto w-[100%] my-5 sm:my-0">
            <img src="/registeruser_man.png" alt="register user" className="sm:block hidden" />
            <div className="flex flex-col gap-5 w-full sm:w-auto">
              <div>
                <h1 className="text-xl font-semibold text-white">Daftar</h1>
                <p className="text-[#716E6B]">Sudah memiliki akun? <Link href="/login" className="text-white">Masuk</Link></p>
              </div>
              <div className="flex flex-col gap-4 w-full items-center">
                <input type="text" placeholder="Nama Depan" className="sm:w-[20rem] w-[95%] rounded-2xl bg-[#C8C6C6] text-[#666666] font-semibold sm:text-base text-sm" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Nama Belakang" className="sm:w-[20rem] w-[95%] rounded-2xl bg-[#C8C6C6] text-[#666666] font-semibold sm:text-base text-sm" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="text" name="email" placeholder="Email" className="sm:w-[20rem] w-[95%] rounded-2xl bg-[#C8C6C6] text-[#666666] font-semibold sm:text-base text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" name="phone" placeholder="Nomor Telepon / Whatsapp" className="sm:w-[20rem] w-[95%] rounded-2xl bg-[#C8C6C6] text-[#666666] font-semibold sm:text-base text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="password" placeholder="Kata Sandi" className="sm:w-[20rem] w-[95%] rounded-2xl bg-[#C8C6C6] text-[#666666] font-semibold sm:text-base text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Konfirmasi Kata Sandi" className="sm:w-[20rem] w-[95%] rounded-2xl bg-[#C8C6C6] text-[#666666] font-semibold sm:text-base text-sm" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
              </div>
              <motion.div className={`border-2 border-red-500 rounded-xl p-2 ${msgError ? "block" : "hidden"}`}
                initial={"offscreen"}
                whileInView={"onscreen"}
                viewport={{once:true}}
                transition={{staggerChildren:0.5}}
                variants={animateVibrate}
              >
                <p className="text-red-500">{msgError}</p>
              </motion.div>
              <div>
                <button type='submit' className="bg-[#DE5959] hover:bg-[#df5f5f] text-white text-xl px-7 py-2 rounded-xl" onClick={() => submitUser()}>Daftar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Register