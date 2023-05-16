import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { useSessionUser } from '../../contexts/SessionUserContext'

const Delivery = ({ id, courier_id }) => {
  const [courier, setCourier] = useState([])
  const [selectedCourier, setSelectedCourier] = useState(null)
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  const chooseCourier = [
    { value: 'jne', label: 'JNE' },
    { value: 'j&t', label: 'J&T' },
    { value: 'anteraja', label: 'AnterAja' },
    { value: 'cod', label: 'COD' },
  ]

  useEffect(() => {
    getDataCourier()
  }, [])

  const getDataCourier = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/courier`, {
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      })
      console.log(response, response.data.data)
      const kurir = []

      for (const data of response.data.data) {
        kurir.push({
          value: data.id,
          label: data.name.toUpperCase()
        })
      }
      setCourier(kurir)
      const selected = response.data.data.find((e) => e.value === courier_id)
      console.log({selected})
      if (selected) setSelectedCourier({value: selected.id, label: selected.name.toUpperCase()} ?? null)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmitCourier = async (courier) => {
    console.log({courier})
    try {
      await axiosJWT.put(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart/update-courier`, 
        {
          id,
          courier_id: courier
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

  return (
    <div className="flex justify-between items-center p-10 rounded-2xl w-[80%] shadow-xl mx-auto bg-slate-50">
      <h1 className="text-xl">Delivery Courier</h1>
      <div className="flex gap-5 justify-end items-center w-[40%]">
        {/* <p className="font-light">Pilih Kurir: </p> */}
        <Select
          className="basic-single w-[80%]"
          classNamePrefix="select"
          defaultValue={selectedCourier ?? ''}
          value={selectedCourier}
          // isLoading={isLoading}
          placeholder="Select Courier"
          isClearable={true}
          isSearchable={true}
          name="courier"
          options={courier}
          onChange={(e) => {
            console.log(e)
            onSubmitCourier(e?.value)
            setSelectedCourier(e)
          }}
        />
      </div>
    </div>
  )
}

export default Delivery