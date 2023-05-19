import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalTransaction from "@/components/AdminPage/ModalVerificatonTransaction";
import { rupiah } from "../../../../utils/libs";

const TransactionDetail = () => {
  const router = useRouter();

  const [dataItems, setDataItems] = useState([
    {
      name: "Nasi Kuning Monda",
      quantity: 1,
      price: 55000,
    },
    {
      name: "Kebab Ala Monda",
      quantity: 2,
      price: 55000,
    },
    {
      name: "Kebab Ala Monda",
      quantity: 2,
      price: 55000,
    },
    {
      name: "Kebab Ala Monda",
      quantity: 2,
      price: 55000,
    },
  ]);

  const [statusPayment, setStatusPayment] = useState("Unverified");
  const [showModal, setShowModal] = useState(false);

  return (
    <LayoutAdmin>
      <div className="w-full pr-2">
        <div className="my-10 flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <Icon icon="grommet-icons:transaction" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl font-bold">Transaksi</span>
          </div>

          <Link href={"/admin/transaction"} className="flex items-center group w-20 ">
            <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={18} className="group-hover:-translate-x-1 duration-300" />
            <h1 className="text-lg font-semibold ">Kembali</h1>
          </Link>

          <div className="flex gap-[21px]">
            {/* left section */}
            <div className="w-[826px]">
              <div className="rounded-[26px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ps-5 pr-5 py-4">
                <h1 className="text-xl text-[#88847E] px-4">
                  Order No. <span className="font-semibold text-[#393734]">{router.query.id}</span>
                </h1>

                <table className="w-full text-sm mt-3 text-left text-gray-500 dark:text-gray-400">
                  <thead className="border-b-2 border-[#E5E7EB] text-2xl font-bold text-black bg-[#F9FAFB] dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-5 pt-3 pb-5 text-[#393734]">
                        Items Summary
                      </th>
                      <th scope="col" className="px-5 pt-3 pb-5 text-[#393734]">
                        Qty
                      </th>
                      <th scope="col" className="px-5 pt-3 pb-5 text-[#393734]">
                        Price
                      </th>
                      <th scope="col" className="px-5 pt-3 pb-5 text-[#393734]">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataItems?.map((data) => {
                      return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-5 font-bold text-base text-[#393734]">
                            <img src="/kebab.png" alt="items" className="inline h-[60px] w-[60px] mr-1 rounded-full object-fill" />
                            {data.name}
                          </td>
                          <td className="px-6 py-5 text-[#393734] text-base">{data.quantity}x</td>
                          <td className="px-6 py-5 text-[#393734] text-base">{rupiah(data.price)}</td>
                          <td className="px-6 py-5 text-[#393734] text-base">{rupiah(data.quantity * data.price)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <h1 className="text-2xl text-[#88847E] mt-6">
                  Order Status :
                  {
                    <span className={`ms-2 px-3 py-1 h-8 text-xl ${statusPayment === "Verified" ? "text-[#1E429F] bg-[#E1EFFE]" : "text-[#CD6200] bg-[#FEF2E5] "}  rounded-[10px] `}>
                      {statusPayment === "Verified" ? "Paid Verified" : "Paid Unverified"}
                    </span>
                  }
                </h1>
                <div className="w-full flex justify-end mt-2">
                  {statusPayment === "Verified" ? (
                    ""
                  ) : (
                    <button
                      className="w-[267.17px] h-10 px-3 py-2 bg-[#DE5959] flex items-center justify-center gap-3 text-white font-bold rounded-2xl hover:bg-[#db4040] hover:shadow-md"
                      onClick={() => setShowModal(true)}
                    >
                      <Icon icon="bi:exclamation-circle" />
                      <h1>Verifikasi Pembayaran</h1>
                    </button>
                  )}
                </div>
                {showModal ? <ModalTransaction setShowModal={setShowModal} setStatusPayment={setStatusPayment} /> : null}
              </div>

              <div className="rounded-[26px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-7 py-8 mt-4">
                <h1 className="text-2xl font-bold text-[#393734]">Customer & Order Details</h1>
                <div className="grid grid-cols-2 mt-4">
                  <div className="border-t border-[#D3C9C9] text-2xl ps-6 py-5 text-[#393734]">Customer Name</div>
                  <div className="border-t border-[#D3C9C9] text-[#A88653] text-2xl text-end pr-6 py-5">Ghaly Wisnu</div>
                  <div className="border-t border-[#D3C9C9] text-2xl ps-6 py-5 text-[#393734]">Email</div>
                  <div className="border-t border-[#D3C9C9] text-[#A88653] text-2xl text-end pr-6 py-5">ghalywsnexample@gmail.com</div>
                  <div className="border-t border-[#D3C9C9] text-2xl ps-6 py-5 text-[#393734]">Phone Number</div>
                  <div className="border-t border-[#D3C9C9] text-[#A88653] text-2xl text-end pr-6 py-5">081891829832</div>
                  <div className="border-t border-[#D3C9C9] text-2xl ps-6 py-5 text-[#393734]">Delivery Courier</div>
                  <div className="border-t border-[#D3C9C9] text-[#A88653] text-2xl text-end pr-6 py-5">JNE</div>
                </div>
              </div>
            </div>

            {/* right section */}
            <div className="w-[378px]">
              <div className="rounded-[26px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-7 py-8 h-[288px] flex flex-col items-center">
                <h1 className="font-bold text-2xl mb-3 text-[#393734]">Customer</h1>
                <img src="/kentang.png" alt="user_photo" className="object-cover w-[100px] h-[130px] rounded-full" />
                <h1 className="font-bold text-3xl text-[#A88653] mt-4">Ghaly Wisnu</h1>
                <h1 className="text-[#737069] mt-1">Member since May 24, 2023</h1>
              </div>

              <div className="rounded-[26px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-7 mt-5 py-8 h-[288px] flex flex-col">
                <h1 className="font-bold text-2xl mb-3 text-[#393734]">Order Summary</h1>
                <div className=" grid grid-cols-2">
                  <div className="border-t border-[#D3C9C9] text-[#393734] text-xl mb-3 font-semibold">Order Created</div>
                  <div className="border-t border-[#D3C9C9] text-end">Sun, May 14, 2023</div>
                  <div className="text-[#393734] text-xl mb-3 font-semibold">Order Time</div>
                  <div className="text-end">07.29 AM</div>
                  <div className="text-[#393734] text-xl mb-3 font-semibold">Subtotal</div>
                  <div className="text-end">
                    {rupiah(
                      dataItems.reduce((total, num) => {
                        return total + num.price * num.quantity;
                      }, 0)
                    )}
                  </div>
                  <div className="border-b border-[#D3C9C9] text-[#393734] text-xl pb-3 font-semibold">Delivery</div>
                  <div className="border-b border-[#D3C9C9] text-end">Rp. 8.000,00</div>
                  <div className="text-[#393734] text-xl mb-3 font-semibold mt-2">Total</div>
                  <div className="mt-2 text-end">Rp. 173.000,00</div>
                </div>
              </div>

              <div className="rounded-[26px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-7 mt-5 py-8 h-[288px] flex flex-col">
                <h1 className="text-2xl font-bold text-[#393734] pb-4">Delivery Address</h1>
                <h1 className="text-xl text-[#393734] mt-6">Jl. Suluh Keadilan Blok D5 N0.12, Puri Indah, Kembangan Selatan, Jakarta Barat</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default TransactionDetail;
