import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import { useSessionUser } from '../../contexts/SessionUserContext'
import { motion } from 'framer-motion'
import { animateVibrate, animateFromAboveSlower, animateFromLeftWithOpacity } from '../../animations/animationFade'

const Address = ({ id, delivery_location, setCartData, cartData, city_shopping, postal_code }) => {
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser()
  const [selectedCity, setSelectedCity] = useState()
  const [address, setAddress] = useState(delivery_location)
  const [city, setCity] = useState(city_shopping)
  const [postalCode, setPostalCode] = useState(postal_code)

  const [errorMsg, setErrorMsg] = useState()

  const [userInfo, setUserInfo] = useState()
  const chooseCity = [
    { value: 'Jakarta', label: 'Jakarta' },
    { value: 'Bogor', label: 'Bogor' },
    { value: 'Depok', label: 'Depok' },
    { value: 'Tangerang', label: 'Tangerang' },
    { value: 'Tangerang Selatan', label: 'Tangerang Selatan' },
    { value: 'Bekasi', label: 'Bekasi' },
  ]

  useEffect(() => {
    getUserAddress()
  }, [state?.userInfo?.userId])
  console.log({userInfo})
  const onSubmitAddress = async () => {
    if ((city || postalCode) &&  !address) setErrorMsg("Alamat wajib diisi jika kota / kode pos telah diisi!")
    else if (address && address.length < 10) setErrorMsg("Alamat harus terdiri lebih dari 10 karakter jika diisikan")
    else if (address && (!city || !postalCode)) setErrorMsg("Kota & kode pos wajib diisi jika alamat terisi!")
    else if (address && (!city || !postalCode)) setErrorMsg("Kota & kode pos wajib diisi jika alamat terisi!")
    else if (address && (isNaN(postalCode))) setErrorMsg("Kode pos wajib berupa angka")
    else if (address && (postalCode.length !== 5)) setErrorMsg("Kode pos harus terdiri dari 5 angka")
    else {
      try {
        await axiosJWT.put(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart/update-delivery-location`, 
          {
            id,
            address,
            city,
            postal_code: postalCode
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${state?.token}`
            }
          }
        )
        setCartData(prevCart => {
          return {...prevCart, delivery_location: address, city: city, postal_code: postalCode};
        });
        setErrorMsg(false)
      } catch (error) {
        console.error(error)
        setErrorMsg(error.response.data.message)
      }
    }
  }

  const getUserAddress = async () => {
    try {
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart/get-user-address?id=${state?.userInfo?.userId}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response.data)
      setUserInfo(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const useAddressProfile = () => {
    setAddress(userInfo.address)
    setPostalCode(userInfo.postal_code)
    setCity(userInfo.city)
    setSelectedCity({ value: userInfo.city, label: userInfo.city })
  }

  return (
    <div className="flex flex-col items-center p-10 rounded-2xl lg:w-[60rem] md:w-[40rem] w-[100%] shadow-xl mx-auto bg-slate-50 gap-5">
      <div className="flex justify-between w-[100%] sm:flex-row flex-col sm:gap-0 gap-5">
        <p className="text-2xl">Alamat</p>
        {!userInfo?.address ? (
          <p className="text-sm">Kamu belum mengisi alamat di profile kamu. <Link href={`/profile/${state?.userInfo?.userId}`} className="underline">Isi sekarang</Link></p>
        ) : (
          <button className="px-5 py-2 bg-blue-400 hover:bg-blue-300 text-white rounded-xl shadow-lg"
            onClick={() => useAddressProfile()}
          >Gunakan Alamat Pribadi</button>
        )}
      </div>
      <textarea name="" id="" cols="30" value={address} defaultValue={delivery_location} onChange={(e) => setAddress(e.target.value)} rows="10" placeholder="Fill your address here" className="w-[100%] md:h-[10rem] h-[15rem] focus:border-none rounded-2xl shadow-xl border-none"></textarea>
      <div className="flex justify-between w-[100%] md:flex-row flex-col md:gap-0 gap-5">
        <Select
          className="basic-single sm:w-[50%] w-full"
          classNamePrefix="select"
          defaultValue={{value: city_shopping, label: city_shopping}}
          // isLoading={isLoading}
          value={selectedCity}
          isClearable={true}
          isSearchable={true}
          name="courier"
          options={chooseCity}
          placeholder="Pilih Kota (Hanya JABODETABEK)"
          onChange={(e) => {
            console.log({e})
            setCity(e?.value)
            setSelectedCity(e)
          }}
        />
        <input type="text" placeholder="Masukkan Kode Pos" defaultValue={postal_code} value={postalCode} className="rounded-xl border-none" onChange={(e) => setPostalCode(e.target.value)} />
      </div>
      <motion.div className={`border-2 border-red-500 rounded-md p-2 ${errorMsg ? "block" : "hidden"} w-[70%] mx-auto mt-10`}
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{once:true}}
        transition={{staggerChildren:0.5}}
        variants={animateVibrate}
      >
        <p className="text-red-500">{errorMsg}</p>
      </motion.div>
      {id && (
        <div className="flex justify-end w-[100%]">
          <button className={`px-5 py-2 bg-slate-400 hover:bg-slate-300 text-white rounded-xl shadow-lg ${cartData.delivery_location === address && cartData.city === city && cartData.postal_code === postalCode ? "hidden" : "block"}`} disabled={cartData.delivery_location === address && cartData.city === city && cartData.postal_code === postalCode}
            onClick={() => onSubmitAddress()}
          >Save</button>
        </div>
      )}
    </div>
  )
}

export default Address