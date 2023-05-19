import TableSectionAdmin from "@/components/AdminPage/TableSection";
import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useSessionUser } from '../../../contexts/SessionUserContext'
import { ClockLoader } from 'react-spinners'

const index = () => {
  const { axiosJWTAdmin, state } = useSessionUser()
  const [orders, setOrders] = useState()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    getAllTransactionsShipment()
  }, [])

  const getAllTransactionsShipment = async () => {
    try {
      setLoad(true)
      const response = await axiosJWTAdmin.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/order-admin/list-order-shipment`, {
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
            <Icon icon="iconoir:delivery-truck" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl font-bold">Pengiriman</span>
          </div>
          <div className="border-[1px] rounded-xl px-5 py-7 my-3">
            {load && (
              <ClockLoader />
            )}
            {!load && (
              <TableSectionAdmin orders={orders} />
            )}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default index;
