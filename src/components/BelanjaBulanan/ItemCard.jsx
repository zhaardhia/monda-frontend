import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import Link from 'next/link';
import { useSessionUser } from '../../contexts/SessionUserContext'
import { rupiah } from "../../utils/libs"

const ItemCard = ({ data, setData, dataScheduler }) => {
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  console.log({ data })
  const [modalDelete, setModalDelete] = useState(false)

  const removeItemBelanjaBulanan = async () => {
    try {
      await axiosJWT.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/belanja-bulanan`, 
        {
          data: {
            user_id: state.userInfo.userId,
            product_id: data["product.id"]
          },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )
      setData({
        ...dataScheduler,
        scheduler_item: dataScheduler.scheduler_item.filter((e) => {
          return e["product.id"] !== data["product.id"]
        })
      })
      setModalDelete(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="md:w-[20rem] sm:w-[15rem] w-[10rem] shadow-xl rounded-lg flex flex-col items-center">
      {data?.["product.image"] ? (
        <img src={`${process.env.NEXT_PUBLIC_BASE_WEB}${data?.["product.image"]}`} alt="" className="md:w-[18rem] w-[100%]" />
      ) : (
        <img src="/sambel-roa.png" alt="" className="md:w-[18rem] w-[100%]" />
      )}
      <div className="w-[90%] my-4 flex flex-col">
        <Link href={`/shop/detail-product/${data?.["product.id"]}`} className="sm:text-xl text-lg font-semibold">{data?.["product.name"]}</Link>
        <div className="flex flex-col sm:my-0 my-3 sm:gap-0 gap-2">
          <p>{rupiah(data?.["product.price"])}</p>
          <div className="flex my-3 justify-center">
            {data?.["product.stock"] == 0 ? (
              <p className="text-center">Stock produk habis, produk tidak akan masuk kedalam cart ketika reminder tiba</p>
            ) : (
              <button className="sm:px-5 px-2 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white sm:text-base text-sm"
                onClick={() => setModalDelete(true)}
              >Hapus dari reminder belanja bulanan</button>
            )}
          </div>
        </div>
      </div>
      {modalDelete && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto w-fit">
              <div className="border-0 rounded-lg shadow-lg relative bg-white flex flex-col outline-none focus:outline-none h-fit p-5 md:w-[40rem] w-[80%] mx-auto">
                <div className="place-self-end">
                  <button
                    onClick={() => setModalDelete(false)}
                    className="p-1 bg-red-500 hover:bg-red-600 rounded-lg"
                  >
                    <Icon width={20} icon="basil:cross-outline" className="text-white" />
                  </button>
                </div>
                <div className="my-10 flex flex-col items-center gap-10">
                  <h1 className="sm:text-2xl text-xl text-center">Apakah anda yakin untuk menghapus produk ini dari daftar reminder belanja bulanan?</h1>
                  <button className="py-1 px-5 bg-green-500 rounded-xl shadow-xl text-white"
                    onClick={() => removeItemBelanjaBulanan()}
                  >Hapus Produk Ini</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  )
}

export default ItemCard