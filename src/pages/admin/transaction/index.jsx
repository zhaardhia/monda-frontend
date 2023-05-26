import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSessionUser } from '../../../contexts/SessionUserContext'
import moment from "moment";
import { ClockLoader } from 'react-spinners'
import Select from 'react-select'
import { rupiah, checkStatusOrder, checkStatusOrderBgColor, checkStatusOrderTextColor } from '../../../utils/libs'
const index = () => {
  const { axiosJWTAdmin, state } = useSessionUser()
  const router = useRouter();

  const chooseOrderStatus = [
    { value: "", label: 'All' },
    { value: "completed", label: 'Completed' },
    { value: "shipment", label: 'Shipment' },
    { value: "paid_verified", label: 'Paid Verified' },
    { value: "paid_unverified", label: 'Paid Unverified' },
    { value: "not_paid", label: 'Not Paid' },
  ]

  const chooseOrderByType = [
    { value: ["created_date", "ASC"], label: 'Tanggal dibuat transaksi (dari terbaru hingga terbaru)' },
    { value: ["created_date", "DESC"], label: 'Tanggal dibuat transaksi (dari terlama hingga terlama)' },
    { value: ["status_order", "ASC"], label: 'Status dari abjad awal hingga akhir' },
    { value: ["status_order", "DESC"], label: 'Status dari abjad akhir hingga awal' },
  ]

  const [orders, setOrders] = useState()
  const [load, setLoad] = useState(false)
  const [orderBy, setOrderBy] = useState(chooseOrderByType[1].value[0])
  const [orderBySort, setOrderBySort] = useState(chooseOrderByType[1].value[1])
  const [orderType, setOrderType] = useState(chooseOrderStatus[0].value)



  useEffect(() => {
    getAllTransactions()
  }, [orderType, orderBy, orderBySort])

  const getAllTransactions = async () => {
    try {
      setLoad(true)
      const response = await axiosJWTAdmin.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/order-admin/list-order?status_order=${orderType}&order=${orderBy}&orderType=${orderBySort}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response.data)
      setOrders(response.data.data)
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
          <div className="flex gap-3 items-center ">
            <Icon icon="grommet-icons:transaction" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl font-bold">Transaksi</span>
          </div>
          {/* Section Filtering */}
          <div className="border-[1px] rounded-xl px-5 py-7 my-3">
            <div className="flex flex-row pb-3 items-center gap-3">
              <div className="flex justify-between w-full">
                <p>Lihat pesanan anda tertera di bawah ini</p>
                <div className="w-[30%] flex flex-col gap-5">
                  <div>
                    <label>Filter Status Order:</label>
                    <Select
                      className="basic-single w-[100%]"
                      classNamePrefix="select"
                      defaultValue={chooseOrderStatus[0]}
                      // isLoading={isLoading}
                      isClearable={false}
                      isSearchable={false}
                      name="orderType"
                      options={chooseOrderStatus}
                      onChange={(e) => {
                        setOrderType(e.value)
                      }}
                    />
                  </div>
                  <div>
                    <label>Urutkan Berdasarkan:</label>
                    <Select
                      className="basic-single w-[100%]"
                      classNamePrefix="select"
                      defaultValue={chooseOrderByType[1]}
                      // isLoading={isLoading}
                      isClearable={false}
                      isSearchable={false}
                      name="orderType"
                      options={chooseOrderByType}
                      onChange={(e) => {
                        setOrderBy(e.value[0])
                        setOrderBySort(e.value[1])
                      }}
                    />
                  </div>
                </div>
                
              </div>
              {/* Search Bar */}
              {/* <form className="flex items-center ms-2">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                    <Icon icon="bx:search-alt" width={20} className="text-[#C2C2C2]" />
                  </div>
                  <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border border-gray-300 h-[36px] w-60 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                  />
                </div>
              </form> */}
            </div>
            {/* Table */}
            {load && (
              <ClockLoader />
            )}

            {!load && orders?.length > 0 && (
              <table className="w-full text-sm mt-3 text-left text-gray-500 dark:text-gray-400">
                <thead className="border-b-2 border-[#E5E7EB] text-sm text-[#6B7280] uppercase bg-[#F9FAFB] dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ORDER ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ORDER DIBUAT
                    </th>
                    <th scope="col" className="px-6 py-3">
                      NAMA CUSTOMER
                    </th>
                    <th scope="col" className="px-6 py-3">
                      JUMLAH
                    </th>
                    <th scope="col" className="px-6 py-3">
                      STATUS
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DETAIL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((data) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-base text-gray-900 whitespace-nowrap dark:text-white">
                          00{data?.id}
                        </th>
                        <td className="px-6 py-4 text-base">{moment(data?.created_date).format("LL")}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 text-base">{data?.["user.fullname"]}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 text-base">{rupiah(data?.gross_amount)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 ${checkStatusOrderBgColor(data?.status_order)} ${checkStatusOrderTextColor(data?.status_order)} rounded-[10px] `}>{checkStatusOrder(data?.status_order)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/admin/transaction/detail/${data?.id}`} className="p-2 bg-[#DE5959] text-white w-24 rounded-3xl flex items-center justify-center gap-2 cursor-pointer group">
                            <h1 className="">Details</h1>
                            <Icon icon="material-symbols:keyboard-double-arrow-right" width={20} className="group-hover:translate-x-[6px] duration-300" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default index;
