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
const ChangePassword = () => {
  const { refreshToken } = useSessionUser()
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(false)
  const [msgError, setMsgError] = useState(null);
  console.log(router?.query?.id)
  const submitUser = async () => {
    console.log("tes");
    console.log(process.env.NEXT_PUBLIC_BASE_URL);
    if (!password) setMsgError("Password harus diisi.")
    else if (!confPassword) setMsgError("Konfirmasi Password harus diisi.")
    else if (password !== confPassword) setMsgError("Password dan Konfirmasi Password tidak cocok.")
    else {
      try {
        // axios.defaults.withCredentials = true
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/change-password`,
          {
            password,
            confPassword,
            forgot_pass_token: router?.query?.id
          },
          {
            withCredentials: true,
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
          }
        );
        setMsgError(null);
        router.push("/change-password/success");
      } catch (error) {
        console.error(error.response.data.message);
        setMsgError(error.response.data.message);
      }
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
                <h1 className="text-xl font-semibold text-white">Ganti Password Baru</h1>
                <p className="text-[#716E6B]">Masukkan password baru anda</p>
              </div>
              <div className="flex flex-col gap-4 w-full items-center">
                <input
                  type={visiblePass ? "text" : "password"}
                  name="password"
                  placeholder="Password Baru"
                  className="sm:w-[20rem] w-[95%] rounded-2xl bg-[#C8C6C6] text-[#666666] font-semibold sm:text-base text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type={visiblePass ? "text" : "password"}
                  name="confPassword"
                  placeholder="Konfirmasi Password Baru"
                  className="sm:w-[20rem] w-[95%] rounded-2xl bg-[#C8C6C6] text-[#666666] font-semibold sm:text-base text-sm"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
                <div className="flex gap-3 items-center w-full justify-start">
                  <input
                    type="checkbox"
                    className="focus:border-0 bg-slate-200"
                    checked={visiblePass}
                    onChange={(e) => setVisiblePass(e.target.checked)}
                  />
                  <p className="text-slate-400 text-sm">Lihat Password</p>
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
                <div className="flex gap-3 justify-end w-full">
                  <button type="submit" className="bg-[#DE5959] hover:bg-[#df5f5f] text-white text-xl px-7 py-2 rounded-xl" onClick={() => submitUser()}>
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
