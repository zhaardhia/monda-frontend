import TableSectionAdmin from "@/components/AdminPage/TableSection";
import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useSessionUser } from '../../../contexts/SessionUserContext'
import { ClockLoader } from 'react-spinners'

const index = () => {
  const { axiosJWTAdmin, state } = useSessionUser()
  const [orders, setOrders] = useState()
  const [ordersFilteredList, setOrdersFilteredList] = useState([])
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
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
      setOrdersFilteredList(
        response.data.data.filter((e, i) => {
          return i < 10
        })
      )
      setTotalPage(Math.ceil(response.data.data.length / 10))
      setPage(1)
      setLoad(false)
    } catch (error) {
      console.error(error)
      setLoad(false)
    }
  }

  const nextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
      setOrdersFilteredList(
        orders.filter((e, i) => {
          return i >= page * 10 && i < (page + 1) * 10
        })
      )
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setOrdersFilteredList(
        orders.filter((e, i) => {
          return i >= (page - 2) * 10 && i < (page - 1) * 10
        })
      )
    }
  };

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
              <>
                <TableSectionAdmin orders={ordersFilteredList} />
                <div className="flex justify-between my-10 items-center">
                  <button onClick={prevPage} disabled={page < 2} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg shadow-lg disabled:opacity-25">
                    <Icon icon="grommet-icons:previous" />
                  </button>
                  <p>Page: <span className="underline">{page} / {totalPage}</span></p>
                  <button onClick={nextPage} disabled={totalPage === page} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg shadow-lg disabled:opacity-25">
                    <Icon icon="grommet-icons:next" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default index;
