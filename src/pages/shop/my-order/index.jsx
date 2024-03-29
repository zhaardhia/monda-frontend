import React, { useState, useEffect } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import Select from 'react-select'
import OrderCard from '@/components/MyOrder/OrderCard'
import { useSessionUser } from '../../../contexts/SessionUserContext'
import moment from 'moment'
import { checkStatusOrder, rupiah, checkStatusOrderBgColor, checkStatusOrderTextColor } from "../../../utils/libs"
import { BarLoader } from "react-spinners";
import { Table, Pagination } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
// import 'rsuite-table/lib/less/index.less'; // or 'rsuite-table/dist/css/rsuite-table.css'

const MyOrder = () => {
  const chooseOrderStatus = [
    { value: "", label: 'Semua' },
    { value: "completed", label: 'Selesai' },
    { value: "shipment", label: 'Sedang Dikirim' },
    { value: "paid_verified", label: 'Terbayar, Sudah Diverifikasi' },
    { value: "paid_unverified", label: 'Terbayar, Belum Diverifikasi' },
    { value: "not_paid", label: 'Belum Dibayar' },
  ]

  const chooseOrderByType = [
    { value: ["order_no", "ASC"], label: 'Order Number (dari terlama hingga terbaru)' },
    { value: ["order_no", "DESC"], label: 'Order Number (dari terbaru hingga terlama)' },
    { value: ["status_order", "ASC"], label: 'Status dari abjad awal hingga akhir' },
    { value: ["status_order", "DESC"], label: 'Status dari abjad akhir hingga awal' },
  ]

  const { axiosJWT, refreshToken, state, dispatch } = useSessionUser()
  const [isLoading, setIsLoading] = useState(true)
  const [orderList, setOrderList] = useState([])
  const [orderFilteredList, setOrderFilteredList] = useState([])
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [orderBy, setOrderBy] = useState(chooseOrderByType[1].value[0])
  const [orderBySort, setOrderBySort] = useState(chooseOrderByType[1].value[1])
  const [orderType, setOrderType] = useState(chooseOrderStatus[0].value)

  useEffect(() => {
    setOrderList()
    getData();
  }, [state.userInfo.userId, orderType, orderBy, orderBySort])

  const getData = async () => {
    try {
      setIsLoading(true)
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/order/list-order?user_id=${state.userInfo.userId}&status_order=${orderType}&order=${orderBy}&orderType=${orderBySort}`, {
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      })
      console.log(response, response.data.data)
      setOrderList(response.data.data)
      setOrderFilteredList(
        response.data.data.filter((e, i) => {
          return i < 10
        })
      )
      setTotalPage(Math.ceil(response.data.data.length / 10))
      setPage(1)
      setIsLoading(false)  
      // createTable();
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  };

  // const [limit, setLimit] = React.useState(10);

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const nextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
      setOrderFilteredList(
        orderList.filter((e, i) => {
          return i >= page * 10 && i < (page + 1) * 10
        })
      )
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setOrderFilteredList(
        orderList.filter((e, i) => {
          return i >= (page - 2) * 10 && i < (page - 1) * 10
        })
      )
    }
  };

  console.log({orderList}, {orderFilteredList})
  return (
    <LayoutShop>
      <div className="w-[90%]">
        <div className="my-10 flex flex-col gap-3">
          <div className="flex gap-3 items-center ">
            <Icon icon="mdi:credit-card-fast-outline" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl">Pesanan Anda</span>
          </div>
          <div className="flex justify-between">
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
        </div>

        {
          isLoading && (
            <BarLoader />
          )
        }

        {!isLoading && orderList?.length > 0 && (
          <div className='flex flex-col table-background'>
            <div className='block w-full'>
              <table className="w-full text-sm mt-3 text-left text-gray-500 dark:text-gray-400">
                <thead className="border-b-2 border-[#E5E7EB] text-sm text-[#6B7280] uppercase bg-[#F9FAFB] dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ORDER ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      TANGGAL & JAM
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
                  {orderFilteredList?.map((item, index) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td scope="row" className="px-6 py-4 font-medium text-base text-gray-900 whitespace-nowrap dark:text-white">
                          #00{item.order_no}
                        </td>
                        <td className="px-6 py-4 text-base">{moment(item.updated_date).format("LLL")}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 text-base">{rupiah(+item.gross_amount + +item.delivery_fee + +item.transfer_fee)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 ${checkStatusOrderTextColor(item.status_order)} rounded-[10px] ${checkStatusOrderBgColor(item.status_order)}`}>{checkStatusOrder(item.status_order)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/shop/my-order/detail/${item.id}`} className="underline">Lihat Detail Pesanan</Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="flex justify-between my-10 items-center">
                <button onClick={prevPage} disabled={page < 2} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg shadow-lg disabled:opacity-25">
                  <Icon icon="grommet-icons:previous" />
                </button>
                <p>Page: <span className="underline">{page} / {totalPage}</span></p>
                <button onClick={nextPage} disabled={totalPage === page} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg shadow-lg disabled:opacity-25">
                  <Icon icon="grommet-icons:next" />
                </button>
              </div>              
            </div>
          </div>
        )}
      </div>
    </LayoutShop>
  )
}

export default MyOrder