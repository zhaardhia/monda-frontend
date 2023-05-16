import React, { useState } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import { useSessionUser } from '../../contexts/SessionUserContext'

const Address = ({ id, delivery_location }) => {
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  const [address, setAddress] = useState(delivery_location)
  const chooseCity = [
    { value: 'Jakarta', label: 'Jakarta' },
    { value: 'Bogor', label: 'Bogor' },
    { value: 'Depok', label: 'Depok' },
    { value: 'Tangerang', label: 'Tangerang' },
    { value: 'Bekasi', label: 'Bekasi' },
  ]

  const onSubmitAddress = async () => {
    try {
      await axiosJWT.put(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart/update-delivery-location`, 
        {
          id,
          address
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )
    } catch (error) {
      console.error(error)
    }
  }
  console.log(delivery_location)
  return (
    <div className="flex flex-col items-center p-10 rounded-2xl w-[90%] shadow-xl mx-auto bg-slate-50 gap-5">
      <div className="flex justify-between w-[100%]">
        <p className="text-2xl">Alamat</p>
        <p className="text-sm">You haven't filled your address in profile page. <Link href="/profile" className="underline">Fill it now</Link></p>
      </div>
      <textarea name="" id="" cols="30" value={address} defaultValue={delivery_location} onChange={(e) => setAddress(e.target.value)} rows="10" placeholder="Fill your address here" className="w-[100%] h-[10rem] focus:border-none rounded-2xl shadow-xl border-none"></textarea>
      {/* <div className="flex justify-between w-[100%]">
        <Select
          className="basic-single w-[50%]"
          classNamePrefix="select"
          // defaultValue={chooseCourier[0]}
          // isLoading={isLoading}
          isClearable={true}
          isSearchable={true}
          name="courier"
          options={chooseCity}
          placeholder="Pilih Kota (Hanya JABODETABEK)"
        />
        <input type="text" placeholder="Masukkan Kode Pos" className="rounded-xl border-none" />
      </div> */}
      <div className="flex justify-end w-[100%]">
        <button className="px-5 py-2 bg-slate-400 hover:bg-slate-300 text-white rounded-xl shadow-lg" disabled={delivery_location === address} 
          onClick={() => onSubmitAddress()}
        >Save</button>
      </div>
    </div>
  )
}

export default Address