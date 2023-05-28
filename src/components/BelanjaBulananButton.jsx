import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useSessionUser } from '../contexts/SessionUserContext'
import { useRouter } from 'next/router';
const BelanjaBulananButton = ({ product_id }) => {
  const [modalShow, setModalShow] = useState(false)
  const { state, axiosJWT, refreshToken, dispatch } = useSessionUser()
  const router = useRouter();
  const [flagSchedulerItem, setFlagSchedulerItem] = useState(false)

  useEffect(() => {
    checkSchedulerItem()
  }, [state?.userInfo?.userId, product_id, flagSchedulerItem])

  const checkSchedulerItem = async () => {
    try {
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/belanja-bulanan/get-item?user_id=${state?.userInfo?.userId}&product_id=${product_id}`)
      console.log(response)
      setFlagSchedulerItem(response.data.data.flag)
    } catch (error) {
      console.error(error)
    } 
  }

  const addItemBelanjaBulanan = async () => {
    try {
      await axiosJWT.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/belanja-bulanan`, 
        {
          user_id: state.userInfo.userId,
          product_id
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )
      setFlagSchedulerItem(true)
      setModalShow(false)
    } catch (error) {
      console.error(error)
    }
  }
  console.log({flagSchedulerItem})
  return (
    <>
      {!flagSchedulerItem && (
        <button className="px-7 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white text-center"
          onClick={() => setModalShow(true)}
        >Tambahkan Produk Ke Reminder Belanja bulanan</button>
      )}

      {flagSchedulerItem && (
        <div className="px-7 py-3 rounded-lg bg-green-600 text-white text-center">
          Produk sudah dimasukkan ke dalam list reminder belanja bulanan
        </div>
      )}
      
      {modalShow && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto w-fit">
              <div className="border-0 rounded-lg shadow-lg relative bg-white flex flex-col outline-none focus:outline-none h-fit p-5 md:w-[40rem] w-[80%] mx-auto">
                <div className="place-self-end">
                  <button
                    onClick={() => setModalShow(false)}
                    className="p-1 bg-red-500 hover:bg-red-600 rounded-lg"
                  >
                    <Icon width={20} icon="basil:cross-outline" className="text-white" />
                  </button>
                </div>
                <div className="my-10 flex flex-col items-center gap-10">
                  <h1 className="sm:text-2xl text-xl text-center">Apakah anda yakin untuk menambahkan produk ini kedalam daftar reminder belanja bulanan?</h1>
                  <button className="py-2 px-5 bg-green-500 rounded-xl shadow-xl text-white"
                    onClick={() => addItemBelanjaBulanan()}
                  >Tambahkan Produk Ini</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  )
}

export default BelanjaBulananButton