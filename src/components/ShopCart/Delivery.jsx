import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { useSessionUser } from '../../contexts/SessionUserContext'

const Delivery = ({ id, courier_id, setDeliveryFee, setCartData, cartData }) => {
  const [courier, setCourier] = useState([])
  const [originCourier, setOriginCourier] = useState([])
  const [selectedCourier, setSelectedCourier] = useState()
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  const [loadSelect, setLoadSelect] = useState(true)

  useEffect(() => {
    getDataCourier()
  }, [])

  const getDataCourier = async () => {
    try {
      setLoadSelect(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/courier`, {
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      })
      console.log(response, response.data.data)
      setOriginCourier(response.data.data)
      const kurir = []

      for (const data of response.data.data) {
        kurir.push({
          value: data.id,
          label: data.name.toUpperCase()
        })
      }
      setCourier(kurir)
      console.log("DISINI", courier_id)

      const selected = response.data.data.find((e) => e.id === courier_id)
      if (selected) {
        setSelectedCourier({value: selected.id, label: selected.name.toUpperCase()})
        setDeliveryFee(selected?.fee)
      } else {
        setSelectedCourier()
        setDeliveryFee()
      }
      setLoadSelect(false)
    } catch (error) {
      console.error(error)
      setLoadSelect(false)
    }
  }
  console.log({selectedCourier})
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
      // console.log("kurir data nich", ...cartData)
      // setCartData({
      //   ...cartData,
      //   courier_id: courier
      // })
      setCartData(prevCart => {
        // Object.assign would also work
        return {...prevCart, courier_id: courier};
      });
      const selected = originCourier.find((e) => e.id === courier)
      if (selected) {
        setSelectedCourier({value: selected.id, label: selected.name.toUpperCase()})
        setDeliveryFee(selected.fee)
      } else {
        setSelectedCourier()
        setDeliveryFee()
      }
    } catch (error) {
      console.error(error)
    }
  }
  console.log("kurir", {selectedCourier})
  return (
    <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-5 md:items-center p-10 rounded-2xl lg:w-[60rem] md:w-[40rem] w-[100%] shadow-xl mx-auto bg-slate-50">
      <h1 className="text-xl">Kurir Delivery</h1>
      <div className="flex gap-5 md:justify-end items-center md:w-[40%]">
        {/* <p className="font-light">Pilih Kurir: </p> */}
        {loadSelect && (<p>loading...</p>)}
        {!loadSelect && (
          <Select
            className="basic-single md:w-[80%] w-full"
            classNamePrefix="select"
            defaultValue={selectedCourier}
            // defaultValue={{ value: 2, label: "SICEPATT" }}
            // value={selectedCourier}
            // isLoading={isLoading}
            placeholder="Pilih Kurir"
            isClearable={true}
            // isSearchable={true}
            name="courier"
            options={courier}
            onChange={(e) => {
              console.log({e})
              onSubmitCourier(e?.value)
              setSelectedCourier(e)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Delivery