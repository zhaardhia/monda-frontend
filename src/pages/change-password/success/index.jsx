import React, { useState } from "react";
import Layout from "@/components/Layout";
import bg from "../../../../public/bg-monda.png";
import Image from "next/image";
import Link from "next/link";

const Success = () => {
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
              <div className="w-[30rem] flex flex-col gap-5">
                <h1 className="text-xl font-semibold text-white">Ganti Password Baru</h1>
                <p className="text-[#716E6B]">Password kamu berhasil diganti.</p>
              </div>
              <Link href="/login" className="text-white underline">
                Kembali ke halaman login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
