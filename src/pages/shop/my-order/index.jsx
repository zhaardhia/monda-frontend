import React, { useState, useEffect } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import Select from 'react-select'
import OrderCard from '@/components/MyOrder/OrderCard'
import { useSessionUser } from '../../../contexts/SessionUserContext'
//Import Tables
import $ from "jquery";
import DataTable from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5.js";
import moment from 'moment'
import { checkStatusOrder, rupiah, checkStatusOrderBgColor, checkStatusOrderTextColor } from "../../../utils/libs"
import { BarLoader } from "react-spinners";

const MyOrder = () => {
  const { axiosJWT, refreshToken, state, dispatch } = useSessionUser()
  const [isLoading, setIsLoading] = useState(true)
  const [orderList, setOrderList] = useState([])
  let tableInit = null
  // const DataTable = DataTables(window, $);
  const chooseOrderType = [
    { value: 'sedang_berlangsung', label: 'Sedang Berlangsung' },
    { value: 'selesai', label: 'Selesai' },
  ]

  useEffect(() => {
    setOrderList()
    getData();
  }, [state.userInfo.userId])

  useEffect(() => {
    createTable();
  }, [orderList]);

  const getData = async () => {
    try {
      setIsLoading(true)
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/order/list-order?user_id=${state.userInfo.userId}`, {
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      })
      console.log(response, response.data.data)
      setOrderList(response.data.data)     
      setIsLoading(false)  
      // createTable();
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  };

  const createTable = () => {
    tableInit = new DataTable("#table", {
      pagingType: "full_numbers",
      pageLength: 10,
      processing: true,
      scrollX: true,
      responsive: true,
      destroy: true,
      dom: "Blfrtip",
      search: {
        className: "input-search mr-4",
      },
      buttons: [],
      lengthMenu: [
        [10, 20, 30, 50, -1],
        [10, 20, 30, 50, "All"],
      ],
      columns: [
        { width: "150px" },
        { width: "150px" },
        { width: "150px" },
        { width: "150px" },
        { width: "150px" }
      ],
    });
  };


  return (
    <LayoutShop>
      <div className="w-[90%]">
        <div className="my-10 flex flex-col gap-3">
          <div className="flex gap-3 items-center ">
            <Icon icon="mdi:credit-card-fast-outline" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl">Your Order</span>
          </div>
          <div className="flex justify-between">
            <p>Lihat pesanan anda tertera di bawah ini</p>
            <Select
              className="basic-single w-[30%]"
              classNamePrefix="select"
              // defaultValue={chooseCourier[0]}
              // isLoading={isLoading}
              isClearable={false}
              isSearchable={false}
              name="orderType"
              options={chooseOrderType}
            />
          </div>
        </div>

        {
          isLoading && (
            <BarLoader />
          )
        }

        {!isLoading && (
          <div className='relative flex flex-col table-background'>
            <div className='block w-full'>
              {/* <table id='table'>
                <thead>
                  <tr>
                    <th className='text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2'>
                      No
                    </th>
                    <th className='text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2'>
                      Order ID
                    </th>
                    <th className='text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2'>
                      Date & Time
                    </th>
                    <th className='text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2 w-full'>
                      Amount
                    </th>
                    <th className='text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2'>
                      Status
                    </th>
                    <th className='text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2'>
                      Action
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {orderList?.map((item, index) => {
                    console.log(item)
                    return (
                      <tr key={index}>
                        <td className='text-xs font-weight-bold text-center'>
                          {index + 1}
                        </td>
                        <td className='text-xs font-weight-bold text-center cursor-pointer hover:text-blue-600'>
                          {item.id}
                        </td>
                        <td className='text-xs font-weight-bold'>
                          {moment(item.updated_date).format("LLL")}
                        </td>
                        <td className='text-xs font-weight-bold color-blue'>
                          {rupiah(item.gross_amount)}
                        </td>
                        <td className='text-xs font-weight-bold'>
                          {checkStatusOrder(item.status_order)}
                        </td>
                        <td className='text-xs font-weight-bold'>
                          <Link href={`/shop/my-order/detail/${item.id}`}>Lihat Detail Pesanan</Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table> */}
              <table className="w-full text-sm mt-3 text-left text-gray-500 dark:text-gray-400">
                <thead className="border-b-2 border-[#E5E7EB] text-sm text-[#6B7280] uppercase bg-[#F9FAFB] dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ORDER ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DATE & TIME
                    </th>
                    <th scope="col" className="px-6 py-3">
                      AMOUNT
                    </th>
                    <th scope="col" className="px-6 py-3">
                      STATUS
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderList?.map((item, index) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td scope="row" className="px-6 py-4 font-medium text-base text-gray-900 whitespace-nowrap dark:text-white">
                          #00{item.order_no}
                        </td>
                        <td className="px-6 py-4 text-base">{moment(item.updated_date).format("LLL")}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 text-base">{rupiah(item.gross_amount)}</td>
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
            </div>
          </div>
        )}
      </div>
    </LayoutShop>
  )
}

export default MyOrder