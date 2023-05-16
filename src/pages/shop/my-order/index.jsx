import React, { useState, useEffect } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import Select from 'react-select'
import OrderCard from '@/components/MyOrder/OrderCard'
import { useSessionUser } from '../../../contexts/SessionUserContext'
//Import Tables
import DataTable from "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5.js";
import moment from 'moment'
import { checkStatusOrder, rupiah } from "../../../utils/libs"
import { BarLoader } from "react-spinners";

const MyOrder = () => {
  const { axiosJWT, refreshToken, state, dispatch } = useSessionUser()
  const [isLoading, setIsLoading] = useState(true)
  const [orderList, setOrderList] = useState([])

  const chooseOrderType = [
    { value: 'sedang_berlangsung', label: 'Sedang Berlangsung' },
    { value: 'selesai', label: 'Selesai' },
  ]

  useEffect(() => {
    setOrderList()
    getData();
  }, [state.userInfo.userId])

  // useEffect(() => {
  //   createTable();
  // }, [orderList]);

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
      createTable();
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  };

  const createTable = () => {
    const tableInit = new DataTable("#table", {
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
        { width: "25px" },
        { width: "220px" },
        { width: "180px" },
        { width: "220px" },
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
              <table id='table'>
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
              </table>
            </div>
          </div>
        )}

        {/* <OrderCard />
        <OrderCard />
        <OrderCard />         */}
        
      </div>
    </LayoutShop>
  )
}

export default MyOrder