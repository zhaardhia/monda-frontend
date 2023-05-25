import React, { useEffect, useState } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import { useSessionUser } from '../../contexts/SessionUserContext'
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'
import { animateVibrate, animateFromAboveSlower, animateFromLeftWithOpacity } from '../../animations/animationFade'
import Select from 'react-select'

const Profile = () => {
  const { state, axiosJWT, refreshToken, dispatch } = useSessionUser()
  const router = useRouter();
  console.log(router.query.id)
  const [userProfile, setUserProfile] = useState()
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const [city, setCity] = useState('')
  const [selectedCity, setSelectedCity] = useState()
  const [postalCode, setPostalCode] = useState('')

  const [onEdit, setOnEdit] = useState(false)
  const [loading, setLoading] = useState(true)

  const chooseCity = [
    { value: 'Jakarta', label: 'Jakarta' },
    { value: 'Bogor', label: 'Bogor' },
    { value: 'Depok', label: 'Depok' },
    { value: 'Tangerang', label: 'Tangerang' },
    { value: 'Tangerang Selatan', label: 'Tangerang Selatan' },
    { value: 'Bekasi', label: 'Bekasi' },
  ]

  useEffect(() => {
    fetchUserInfo()
  }, [router?.query?.id])

  const fetchUserInfo = async () => {
    try {
      setLoading(true)
      
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/user-info?id=${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })

      console.log(response)
      setUserProfile(response?.data?.data)

      setFirstName(response?.data?.data?.first_name)
      setLastName(response?.data?.data?.last_name)
      setEmail(response?.data?.data?.email)
      setAddress(response?.data?.data?.address)

      setPhone(response?.data?.data?.phone)
      setCity(response?.data?.data?.city)
      if (response.data.data.city) setSelectedCity({ value: response.data.data.city, label: response.data.data.city })
      setPostalCode(response?.data?.data?.postal_code)

      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await axiosJWT.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/logout-user`, {
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      })
      dispatch({ type: "setIsLoggedIn", payload: false})
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditCanceled = () => {
    setFirstName(userProfile.first_name)
    setLastName(userProfile.last_name)
    setEmail(userProfile.email)
    setAddress(userProfile.address)
    setPhone(userProfile.phone)
    setCity(userProfile.city)
    if (userProfile.city) setSelectedCity({ value: userProfile.city, label: userProfile.city})
    else setSelectedCity("")
    setPostalCode(userProfile.postal_code)
    setErrorMsg(false)
  }

  const updateUserInfo = async () => {
    if (!firstName) setErrorMsg("First name / nama depan harus diisi!")
    else if (!email) setErrorMsg("Email harus diisi!")
    else if (!phone) setErrorMsg("Nomor telepon / whatsapp harus diisi!")
    else if ((city || postalCode) &&  !address) setErrorMsg("Alamat wajib diisi jika kota / kode pos telah diisi!")
    else if (address && address.length < 10) setErrorMsg("Alamat harus terdiri lebih dari 10 karakter jika diisikan")
    else if (address && (!city || !postalCode)) setErrorMsg("Kota & kode pos wajib diisi jika alamat terisi!")
    else if (address && (!city || !postalCode)) setErrorMsg("Kota & kode pos wajib diisi jika alamat terisi!")
    else if (address && (isNaN(postalCode))) setErrorMsg("Kode pos wajib berupa angka")
    else if (address && (postalCode.length !== 5)) setErrorMsg("Kode pos harus terdiri dari 5 angka")
    else {
      try {
        await axiosJWT.put(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/user-info`, {
          headers: {
            Authorization: `Bearer ${state?.token}`
          },
          id: router.query.id,
          email: email ? email : userProfile.email,
          first_name: firstName ? firstName : userProfile.first_name,
          last_name: lastName,
          address,
          city,
          postal_code: postalCode,
          phone
        })
  
        setUserProfile({
          address,
          city,
          email,
          first_name: firstName,
          fullname: `${firstName} ${lastName}`,
          id: router.query.id,
          last_name: lastName,
          phone,
          postal_code: postalCode,
          role: 1
        })

        setErrorMsg(false)
        setOnEdit(false)
        setSuccessMsg("Berhasil mengubah data anda!")

        setTimeout(() => {
          setSuccessMsg(false)
        }, 5000)

      } catch (error) {
        console.error(error)
        setErrorMsg(error.response.data.message);
      }
    }
    
  }

  return (
    <LayoutShop>
      <div className="w-[90%] md:mx-0 mx-auto">
        {loading && (<p>Loading...</p>)}
        {!loading && (
          <>
            <div className="my-10 flex flex-col gap-3">
              <div className="flex gap-3 items-center ">
                <Icon icon="gg:profile" width={30} className="text-[#A88653]" />
                <span className="text-slate-800 text-2xl">Your Profile</span>
              </div>
            </div>
            <motion.div className="lg:w-[50rem] w-[80%] flex flex-col gap-4 justify-center mx-auto"
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{once:true}}
              transition={{staggerChildren:0.5}}
              variants={animateFromLeftWithOpacity}
            >
              <div className="flex justify-between lg:flex-row flex-col">
                <div className="flex flex-col">
                  <label className="text-lg text-slate-700">First Name</label>
                  <input type="text" value={firstName} defaultValue={firstName} className="rounded-md sm:w-[23rem] w-full bg-white border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" disabled={!onEdit} 
                    onChange={(e) => setFirstName(e.target.value)} 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg text-slate-700">Last Name</label>
                  <input type="text" value={lastName} defaultValue={lastName} className="rounded-md sm:w-[23rem] w-full bg-white border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" disabled={!onEdit} 
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-col w-full">
                <label className="text-lg text-slate-700">Email</label>
                <input type="text" value={email} defaultValue={email} className="rounded-md lg:w-[50rem] w-full bg-white border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" disabled={!onEdit} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-lg text-slate-700">Address</label>
                <textarea type="text" value={address} defaultValue={address} className="rounded-md lg:w-[50rem] md:h-auto h-[10rem] w-full bg-white border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" disabled={!onEdit} 
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-lg text-slate-700">Contact Number (Whatsapp)</label>
                <input type="text" value={phone} defaultValue={email} className="rounded-md lg:w-[50rem] w-full bg-white border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" disabled={!onEdit} 
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex justify-between lg:flex-row flex-col">
                <div className="flex flex-col">
                  <label className="text-lg text-slate-700">City</label>
                  <Select
                    className="basic-single sm:w-[23rem] w-full"
                    classNamePrefix="select"
                    defaultValue={selectedCity}
                    isDisabled={!onEdit}
                    // defaultValue={{ value: 2, label: "SICEPATT" }}
                    value={selectedCity}
                    // isLoading={isLoading}
                    placeholder="Select City"
                    isClearable={true}
                    // isSearchable={true}
                    name="city"
                    options={chooseCity}
                    onChange={(e) => {
                      console.log({e})
                      setCity(e?.value)
                      setSelectedCity(e)
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg text-slate-700">Postal Code</label>
                  <input type="text" value={postalCode} defaultValue={postalCode} className="rounded-md sm:w-[23rem] w-full bg-white border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" disabled={!onEdit} 
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
            <motion.div className={`border-2 border-red-500 rounded-md p-2 ${errorMsg ? "block" : "hidden"} w-[70%] mx-auto mt-10`}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{once:true}}
              transition={{staggerChildren:0.5}}
              variants={animateVibrate}
            >
              <p className="text-red-500">{errorMsg}</p>
            </motion.div>
            <motion.div className={`border-2 border-green-500 rounded-md p-2 ${successMsg ? "block" : "hidden"} w-[70%] mx-auto mt-10`}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{once:true}}
              transition={{staggerChildren:0.5}}
              variants={animateFromAboveSlower}
            >
              <p className="text-green-500">{successMsg}</p>
            </motion.div>
            
            {onEdit ? (
              <div className="flex gap-5 my-20 lg:w-[50rem] w-full mx-auto">
                <button className="bg-white hover:bg-slate-50 border-[1px] border-red-500 px-5 py-2 rounded-md text-red-500" 
                  onClick={() => {
                    handleEditCanceled()
                    setOnEdit(false)
                  }}>Cancel</button>
                <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-md text-white"
                  onClick={updateUserInfo}
                >Save</button>
              </div>
            ) : (
              <div className="flex justify-between my-20 lg:w-[50rem] w-full mx-auto">
                <button className="bg-white hover:bg-slate-50 px-5 py-2 border-[1px] border-red-500 rounded-md text-red-500" onClick={() => setOnEdit(true)}>Update Profil</button>
                <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-md text-white" onClick={logout}>Logout</button>
              </div>
            )}
          </>
        )}
      </div>
    </LayoutShop>
  )
}

export default Profile