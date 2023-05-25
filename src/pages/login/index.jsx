import React, { useState } from "react";
import Layout from "@/components/Layout";
import bg from "../../../public/bg-monda.png";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/service/data";
import axios from "axios";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { animateVibrate } from "../../animations/animationFade";
import { useSessionUser } from '../../contexts/SessionUserContext'
const Login = () => {
  const { refreshToken } = useSessionUser()
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setMsgError] = useState(null);
  const [visiblePass, setVisiblePass] = useState(false)
  const submitUser = async () => {
    console.log("tes");
    console.log({ email, password });
    console.log(process.env.NEXT_PUBLIC_BASE_URL);
    try {
      // axios.defaults.withCredentials = true
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/login-user`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        }
      );
      setMsgError(null);
      refreshToken()
      router.push("/shop");
    } catch (error) {
      console.error(error.response.data.message);
      setMsgError(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div
        className="w-full flex justify-center items-center"
        style={{
          backgroundImage: `url(${bg.src})`,
          // objectFit: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          // width: '100%',
          // height: '100%',
        }}
      >
        <div className="bg-[#294456] rounded-2xl sm:px-20 px-10 py-10 my-14 xl:w-[70rem] md:w-[50rem] w-[90%] flex flex-col">
          <Link href="/">
            <Image src="/monda_logo.png" alt="Monda Logo" width={70} height={70} />
          </Link>
          <div className="flex sm:justify-around justify-center mx-auto w-[100%] my-5 sm:my-0">
            <img src="/loginuser_woman.png" alt="register user" className="sm:block hidden" />
            <div className="flex flex-col gap-5 w-full sm:w-auto sm:mt-14">
              <div>
                <h1 className="text-xl font-semibold text-white">Masuk</h1>
                <p className="text-[#716E6B]">Masuk untuk mulai berbelanja</p>
              </div>
              <div className="flex flex-col gap-4 w-full items-center">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="sm:w-[20rem] w-[95%] rounded-2xl bg-[#C8C6C6] text-[#666666] font-semibold sm:text-base text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex flex-col gap-2">
                  <input
                    type={visiblePass ? "text" : "password"}
                    placeholder="Kata Sandi"
                    className="sm:w-[20rem] w-[95%] rounded-2xl bg-[#C8C6C6] text-[#666666] font-semibold sm:text-base text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="focus:border-0"
                      checked={visiblePass}
                      onChange={(e) => setVisiblePass(e.target.checked)}
                    />
                    <p className="text-slate-100 text-sm">Buka Password</p>
                  </div>

                </div>
                

                <div className="flex w-full justify-end">
                  <Link href="/forgot-password" className="text-white underline">
                    Lupa kata sandi?
                  </Link>
                </div>
              </div>
              <motion.div
                className={`border-2 border-red-500 rounded-xl p-2 ${msgError ? "block" : "hidden"}`}
                initial={"offscreen"}
                whileInView={"onscreen"}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.5 }}
                variants={animateVibrate}
              >
                <p className="text-red-500">{msgError}</p>
              </motion.div>
              <div className="flex gap-3">
                <button type="submit" className="bg-[#DE5959] hover:bg-[#df5f5f] text-white text-xl px-7 py-2 rounded-xl" onClick={() => submitUser()}>
                  Masuk
                </button>
                <Link href="/login-admin" type="submit" className="border-white border-[1px] hover:bg-[#df5f5f] text-white text-xl px-7 py-2 rounded-xl">
                  Masuk Admin
                </Link>
              </div>
              <p className="text-[#716E6B] text-center">
                Belum memiliki akun?{" "}
                <Link href="/register" className="text-white underline">
                  Daftar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
