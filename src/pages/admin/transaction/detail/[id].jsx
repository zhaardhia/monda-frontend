import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalTransaction from "@/components/AdminPage/ModalVerificatonTransaction";
import { rupiah } from "../../../../utils/libs";
import moment from "moment";
import { checkStatusOrder, checkStatusOrderBgColor, checkStatusOrderTextColor } from '../../../../utils/libs'
import { ClockLoader } from 'react-spinners'
import { useSessionUser } from '../../../../contexts/SessionUserContext'

const TransactionDetail = () => {
  const router = useRouter();
  const { axiosJWTAdmin, state } = useSessionUser()
  const [statusPayment, setStatusPayment] = useState("Unverified");
  const [showModal, setShowModal] = useState(false);
  const [showModalVerifPayment, setShowModalVerifPayment] = useState(false)
  const [order, setOrder] = useState()
  const [load, setLoad] = useState(false)
  console.log({order})
  const [resi, setResi] = useState()
  const [onEditResi, setOnEditResi] = useState()

  useEffect(() => {
    getTransactionDetail()
  }, [router?.query?.id])

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

  const getTransactionDetail = async () => {
    try {
      setLoad(true)
      const response = await axiosJWTAdmin.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/order-admin/order-detail?order_id=${router?.query?.id}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response.data)
      setOrder(response.data.data)
      setLoad(false)
    } catch (error) {
      console.error(error)
      setLoad(false)
    }
  }

  return (
    <LayoutAdmin>
      <div className="w-full pr-2">
        <div className="my-10 flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <Icon icon="grommet-icons:transaction" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl font-bold">Transaksi</span>
          </div>

          <Link href={"/admin/transaction"} className="flex items-center group w-20 mt-10">
            <Icon icon="material-symbols:arrow-back-ios-new-rounded" width={18} className="group-hover:-translate-x-1 duration-300" />
            <h1 className="text-lg font-semibold ">Kembali</h1>
          </Link>

          <div className="flex gap-[30px] lg:flex-row flex-col mx-auto my-5">
            {/* left section */}
            <div className="xl:w-[1000px] lg:w-[40rem] w-[90%]">
              <div className="rounded-[26px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ps-5 pr-5 py-4">
                <h1 className="text-xl text-[#88847E] px-4">
                  Order ID <span className="font-semibold text-[#393734]">{router.query.id}</span>
                </h1>

                <table className="w-full text-sm mt-3 text-left text-gray-500 dark:text-gray-400">
                  <thead className="border-b-2 border-[#E5E7EB] text-xl font-bold text-black bg-[#F9FAFB] dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-5 pt-3 pb-5 text-[#393734]">
                        Detail Item Pesanan
                      </th>
                      <th scope="col" className="px-5 pt-3 pb-5 text-[#393734]">
                        Qty
                      </th>
                      <th scope="col" className="px-5 pt-3 pb-5 text-[#393734]">
                        Harga
                      </th>
                      <th scope="col" className="px-5 pt-3 pb-5 text-[#393734]">
                        Total Harga
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.order_detail?.map((data) => {
                      return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-5 font-bold text-base text-[#393734]">
                            {data?.["product.image"] ? (
                              <img src={`${process.env.NEXT_PUBLIC_BASE_WEB}${data?.["product.image"]}`} alt="items" className="inline h-[60px] w-[60px] mr-3 rounded-full object-fill" />
                            ) :
                            (
                              <img src={`/kebab.png`} alt="items" className="inline h-[60px] w-[60px] mr-3 rounded-full object-fill" />
                            )
                          }
                            {data?.["product.name"]}
                          </td>
                          <td className="px-6 py-5 text-[#393734] text-base">{data?.quantity}x</td>
                          <td className="px-6 py-5 text-[#393734] text-base">{rupiah(data?.["product.price"])}</td>
                          <td className="px-6 py-5 text-[#393734] text-base">{rupiah(data.quantity * data?.["product.price"])}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <h1 className="text-lg text-[#88847E] mt-6">
                  Order Status :
                  {
                    <span className={`ms-2 px-3 py-1 h-8 text-lg ${checkStatusOrderBgColor(order?.status_order)} ${checkStatusOrderTextColor(order?.status_order)} rounded-[10px] `}>
                      {checkStatusOrder(order?.status_order)}
                    </span>
                  }
                </h1>
                <div className="w-full flex justify-end mt-2">
                  {order?.status_order === "paid_unverified" && (
                    <button
                      className="w-[267.17px] h-10 px-3 py-2 bg-[#DE5959] flex items-center justify-center gap-3 text-white rounded-2xl hover:bg-[#db4040] hover:shadow-md"
                      onClick={() => setShowModalVerifPayment(true)}
                    >
                      <Icon icon="bi:exclamation-circle" />
                      <h1>Verifikasi Pembayaran</h1>
                    </button>
                  )}
                </div>
              </div>
              {showModal ? <ModalTransaction type="to_shipment" setShowModal={setShowModal} order_id={order?.id} resi={resi} /> : null}
              {showModalVerifPayment ? <ModalTransaction type="to_verif_payment" setShowModal={setShowModalVerifPayment} order_id={order?.id} /> : null}

              <div className="rounded-[26px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-7 py-8 mt-4">
                <h1 className="text-xl font-bold text-[#393734]">Customer & Detail Order</h1>
                <div className="grid grid-cols-2 mt-4">
                  <div className="border-t border-[#D3C9C9] text-lg ps-6 py-5 text-[#393734]">Nama Customer</div>
                  <div className="border-t border-[#D3C9C9] text-[#A88653] text-lg text-end pr-6 py-5">{order?.["user.fullname"]}</div>
                  <div className="border-t border-[#D3C9C9] text-lg ps-6 py-5 text-[#393734]">Email</div>
                  <div className="border-t border-[#D3C9C9] text-[#A88653] text-lg text-end pr-6 py-5">{order?.["user.email"]}</div>
                  <div className="border-t border-[#D3C9C9] text-lg ps-6 py-5 text-[#393734]">Nomor HP Customer</div>
                  <div className="border-t border-[#D3C9C9] text-[#A88653] text-lg text-end pr-6 py-5">{order?.["user.phone"]}</div>
                  <div className="border-t border-[#D3C9C9] text-lg ps-6 py-5 text-[#393734]">Kurir</div>
                  <div className="border-t border-[#D3C9C9] text-[#A88653] text-lg text-end pr-6 py-5">{order?.courier.toUpperCase()}</div>
                </div>
              </div>
            </div>

            {/* right section */}
            <div className="w-[378px]">
              <div className="rounded-[26px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-7 py-8 h-[288px] flex flex-col justify-center items-center">
                <h1 className="font-bold text-xl mb-3 text-[#393734]">Customer</h1>
                {/* <img src="/kentang.png" alt="user_photo" className="object-cover w-[100px] h-[130px] rounded-full" /> */}
                <h1 className="font-bold text-lg text-[#A88653] mt-4">{order?.["user.fullname"]}</h1>
                <h1 className="text-[#737069] mt-1">Member sejak {moment(order?.["user.created_date"]).format("LL")}</h1>
              </div>

              {order?.status_order === "paid_verified" && onEditResi && (
                <div className="rounded-[26px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-7 mt-5 py-8 flex flex-col items-center justify-center">
                  <h1 className="text-xl font-bold text-[#393734]">Masukkan nomor Resi</h1>
                  <input type="text" value={resi} onChange={(e) => setResi(e.target.value)} className="rounded-lg border-slate-300 my-5 w-full focus:border-0" />
                  <div className="flex flex-col gap-2">
                    <button
                      className="w-[267.17px] h-10 px-3 py-2 bg-white border-[1px] border-[#DE5959] flex items-center justify-center gap-3 rounded-2xl hover:bg-slate-200 hover:shadow-md text-[#DE5959]"
                      onClick={() => {
                        setResi()
                        setOnEditResi(false)
                      }}
                    >
                      <h1>Batalkan</h1>
                    </button>
                    <button
                      className="w-[267.17px] h-10 px-3 py-2 bg-[#DE5959] flex items-center justify-center gap-3 text-white rounded-2xl hover:bg-[#db4040] hover:shadow-md"
                      onClick={() => setShowModal(true)}
                    >
                      <h1>Update</h1>
                    </button>
                  </div>
                  
                </div>
              )}

              {order?.status_order === "paid_verified" && !onEditResi && (
                <div className="rounded-[26px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-7 mt-5 py-8 flex flex-col items-center gap-2 justify-center">
                  <h1 className="text-lg text-center font-semibold text-[#393734]">Status pesanan belum dikirim oleh ekspedisi</h1>
                  <button
                    className="w-[267.17px] h-10 px-3 py-2 bg-[#DE5959] flex items-center justify-center gap-3 text-white rounded-2xl hover:bg-[#db4040] hover:shadow-md"
                    onClick={() => setOnEditResi(true)}
                  >
                    <h1>Verifikasi & Input Resi</h1>
                  </button>
                  
                </div>
              )}

              <div className="rounded-[26px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-7 mt-5 py-4 flex flex-col">
                <h1 className="font-bold text-xl mb-3 text-[#393734]">Order Summary</h1>
                <hr className="border-t border-[#D3C9C9] mb-5"/>
                <div className=" grid grid-cols-2">
                  <div className=" text-[#393734] text-lg mb-3 font-semibold">Order Created</div>
                  <div className="text-end">{moment(order?.created_date).format("LL")}</div>
                  <div className="text-[#393734] text-lg mb-3 font-semibold">Order Time</div>
                  <div className="text-end">{moment(order?.created_date).format("LT")}</div>
                  <div className="text-[#393734] text-lg mb-3 font-semibold">Subtotal</div>
                  <div className="text-end">
                    {rupiah(
                      order?.gross_amount
                    )}
                  </div>
                  <div className="text-[#393734] text-lg mb-3 font-semibold">Fee Admin</div>
                  <div className="text-end">
                    {rupiah(
                      +order?.transfer_fee
                    )}
                  </div>
                  <div className="border-b border-[#D3C9C9] text-[#393734] text-lg pb-3 font-semibold">Delivery</div>
                  <div className="border-b border-[#D3C9C9] text-end">{rupiah(order?.delivery_fee)}</div>
                  <div className="text-[#393734] text-lg mb-3 font-semibold mt-2">Total</div>
                  <div className="mt-2 text-end">{rupiah(+order?.gross_amount + +order?.transfer_fee + +order?.delivery_fee)}</div>
                </div>
              </div>

              <div className="rounded-[26px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-7 mt-5 py-8 flex flex-col">
                <h1 className="text-xl font-bold text-[#393734] pb-4">Delivery Address</h1>
                <h1 className="text-lg text-[#393734] mt-6">{order?.address}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default TransactionDetail;
