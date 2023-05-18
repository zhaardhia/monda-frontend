import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { useSessionUser } from '../../contexts/SessionUserContext'
import { ClockLoader } from 'react-spinners'
import moment from "moment";
import { checkStatusOrder, checkStatusOrderTextColor, checkStatusOrderBgColor, rupiah } from '../../utils/libs'
const AdminIndex = () => {
  const { axiosJWTAdmin, refreshTokenAdmin, state } = useSessionUser()
  const [productFav, setProductFav] = useState()
  const [loadProduk, setLoadProduk] = useState()

  const [latestUser, setLatestUser] = useState()
  const [loadUser, setLoadUser] = useState()

  const [latestTransaction, setLatestTransaction] = useState()
  const [loadTrx, setLoadTrx] = useState()

  const [incomePerMonth, setIncomePerMonth] = useState([])
  const [loadIncome, setLoadIncome] = useState()

  useEffect(() => {
    fetchIncome()
    fetchProductFavorite()
    fetchLatestUser()
    fetchLatestTransaction()
  }, [])

  const fetchProductFavorite = async () => {
    try {
      setLoadProduk(true)
      const response = await axiosJWTAdmin.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/product-admin/best-sellers`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response.data)
      setProductFav(response.data.data)
      setLoadProduk(false)
    } catch (error) {
      console.error(error)
      setLoadProduk(false)
    }
  }

  const fetchLatestUser = async () => {
    try {
      setLoadUser(true)
      const response = await axiosJWTAdmin.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user-admin/latest-user`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response.data)
      setLatestUser(response.data.data)
      setLoadUser(false)
    } catch (error) {
      console.error(error)
      setLoadUser(false)
    }
  }

  const fetchLatestTransaction = async () => {
    try {
      setLoadTrx(true)
      const response = await axiosJWTAdmin.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/order-admin/latest-transaction`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response.data)
      setLatestTransaction(response.data.data)
      setLoadTrx(false)
    } catch (error) {
      console.error(error)
      setLoadTrx(false)
    }
  }

  const fetchIncome = async () => {
    try {
      setLoadIncome(true)
      const response = await axiosJWTAdmin.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/order-admin/this-month-income`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response.data)
      setIncomePerMonth(response.data.data)
      setLoadIncome(false)
    } catch (error) {
      console.error(error)
      setLoadIncome(false)
    }
  }

  const option = {
    xAxis: {
      type: "category",
      data: ["1 - 5", "6 - 10", "11 - 15", "16 - 20", "21 - 25", "26 - 30"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [incomePerMonth[0]?.amount, incomePerMonth[1]?.amount, incomePerMonth[2]?.amount, incomePerMonth[3]?.amount, incomePerMonth[4]?.amount, incomePerMonth[5]?.amount],
        type: "line",
      },
    ],
  };
  return (
    <LayoutAdmin>
      <div className="w-full pr-2">
        <div className="my-7">
          <h1 className="text-xl font-bold mb-6">Welcome Back, Admin!</h1>
          <div className="border border-slate-200 p-4 rounded-xl">
            <div className="flex items-end">
              <h1 className="font-semibold text-2xl mr-1">Sales</h1>
              <Icon icon="ph:currency-circle-dollar" width={25} color="#408747" />
            </div>
            <span className="text-[#71717A]">cek hasil pendapatanmu bulan ini</span>
            <div className="w-full">
              {loadIncome && (
                <div className="w-[5rem] ml-5 mt-5">
                  <ClockLoader />
                </div>
              )}
              {!loadIncome && incomePerMonth.length > 0 && (
                <ReactEcharts option={option} style={{ height: "400px", padding: 0 }} />
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 my-10">
            {/* Customer Section */}
            <div className="border border-slate-200 rounded-lg pt-4 pb-2 px-4">
              <span className="font-semibold text-lg">Customer Terbaru</span>
              <div className="mt-3 pr-2">
                {/* one profile */}
                {loadUser && (
                  <div className="w-[5rem] ml-5">
                    <ClockLoader />
                  </div>
                )}
                {!loadUser && latestUser?.map((data) => {
                  return (
                    <div className="flex px-2 border-b-2 pb-2 my-3 ">
                      {/* <img src="ikanroa_aboutus.png" alt="" className="w-14" /> */}
                      <div className="flex justify-between w-full">
                        <div className="mr-10 ms-3">
                          <h1 className="font-bold text-lg">{data.fullname}</h1>
                          <h2 className="font-semibold text-[#88847E]">{data.email}</h2>
                        </div>
                        {/* <h1 className="flex items-center font-bold text-xl">Rp 50K</h1> */}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            {/* Product Fav Section */}
            <div className="border border-slate-200 rounded-lg pt-4 pb-2 px-4">
              <span className="font-semibold text-lg">Produk Favorit</span>
              <div className="mt-3 pr-2">
                {/* Produk Favorit */}
                {loadProduk && (
                  <div className="w-[5rem] ml-5">
                    <ClockLoader />
                  </div>
                )}
                {!loadProduk && productFav?.map((data) => {
                  return (
                    <div className="flex px-2 border-b-2 pb-2 my-3 ">
                      <img src="ikanroa_aboutus.png" alt="" className="w-14" />
                      <div className="flex justify-between w-full">
                        <div className="mr-10 ms-3">
                          <h1 className="font-bold text-lg">{data.name}</h1>
                          <h2 className="font-semibold text-[#88847E]">{data.total_quantity} terjual</h2>
                        </div>
                        <h1 className="flex items-center font-bold text-lg">{rupiah(data.total_quantity * data.price)}</h1>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          {/* Table Transaction Section */}
          <div className="p-3 border border-slate-300 rounded-xl">
            <div className="flex items-center">
              <h1 className="font-semibold text-2xl mr-2">Transactions</h1>
              <Icon icon="grommet-icons:transaction" width={23} color="#A96464" />
            </div>
            <span className="text-[#71717A] font-normal">Berikut list dari transaksi terakhir</span>
            {/* Table Section */}
            <div>
              <table className="w-full text-sm mt-3 text-left text-gray-500 dark:text-gray-400">
                <thead className="border-b-2 border-[#E5E7EB] text-sm text-[#6B7280] uppercase bg-[#F9FAFB] dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      TRANSACTION
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DATE & TIME
                    </th>
                    <th scope="col" className="px-6 py-3">
                      AMOUNT
                    </th>
                    <th scope="col" className="px-6 py-3 w-40">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loadTrx && (
                    <div className="w-[5rem] ml-5">
                      <ClockLoader />
                    </div>
                  )}
                  {!loadTrx && latestTransaction?.map((data) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th className="px-6 py-4 text-base text-gray-900 whitespace-nowrap dark:text-white">
                          <h1 className="font-normal">
                            Payment from <span className="font-bold">{data["user.fullname"]}</span>
                          </h1>
                        </th>
                        <td className="px-6 py-4 text-base">{moment(data.updated_date).format("LL")}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 text-base">{rupiah(data.gross_amount)}</td>
                        <td className="px-6 py-4">
                          <h1 className={`px-3 py-1 ${checkStatusOrderTextColor(data.status_order)} rounded-[10px] ${checkStatusOrderBgColor(data.status_order)} w-24 text-center`}>{checkStatusOrder(data.status_order)}</h1>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminIndex;
