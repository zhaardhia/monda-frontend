import React, { useState, useEffect } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import { useSessionUser } from '../../contexts/SessionUserContext'
import { useRouter } from 'next/router';
import { BarLoader } from 'react-spinners'
import ItemContainer from '@/components/BelanjaBulanan/ItemContainer';
import Link from 'next/link';
import Select from 'react-select'
import { motion } from 'framer-motion'
import { animateVibrate, animateFromAboveSlower, animateFromLeftWithOpacity } from '../../animations/animationFade'

const BelanjaBulanan = () => {
  const { state, axiosJWT, refreshToken, dispatch } = useSessionUser()
  const router = useRouter();
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [optionJam, setOptionJam] = useState([])
  const [optionTanggal, setOptionTanggal] = useState([])
  const [loadUpdate, setLoadUpdate] = useState(false)
  const [msgUpdate, setMsgUpdate] = useState()
  const [updateSucceed, setUpdateSucceed] = useState()
  const optionStatus = [
    {
      label: "Aktif",
      value: 1
    },
    {
      label: "Non-Aktif",
      value: 0
    }
  ]
  const [selectedDate, setSelectedDate] = useState()
  const [selectedHour, setSelectedHour] = useState()
  const [statusReminder, setStatusReminder] = useState()

  useEffect(() => {
    fetchBelanjaBulanan()
    jam()
    tanggal()
  }, [state?.userInfo?.userId])

  const jam = () => {
    const arr = []
    for(let i = 1; i <= 24; i++) {
      arr.push({ label: `Jam ${i}`, value: i })
    }
    setOptionJam(arr)
  }

  const tanggal = () => {
    const arr = []
    for(let i = 1; i <= 30; i++) {
      arr.push({ label: `Tanggal ${i}`, value: i })
    }
    setOptionTanggal(arr)
  }

  const fetchBelanjaBulanan = async () => {
    try {
      setLoading(true)
      
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/belanja-bulanan?user_id=${state.userInfo.userId}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response)
      setData(response.data.data)
      setSelectedDate( response.data.data.date ? { value: response.data.data.date, label: `Tanggal ${response.data.data.date}` } : null)
      setSelectedHour( response.data.data.hour ? { value: response.data.data.hour, label: `Jam ${response.data.data.hour}` } : null)
      setStatusReminder( response.data.data.status === 1 || response.data.data.status === 0 ? {value: response.data.data.status, label: response.data.data.status === 1 ? "Aktif" : "Non-Aktif"} : null)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setSelectedDate(data?.date ? {value: data?.date, label: `Tanggal ${data?.date}`} : null)
    setSelectedHour(data?.hour ? {value: data?.hour, label: `Jam ${data?.hour}`} : null)
    setStatusReminder(data?.status ? {value: data?.status, label: data?.status === 1 ? "Aktif" : "Non-Aktif"} : null)
    setOnEdit(false)
  }

  const handleSubmit = async () => {
    setLoadUpdate(true)
    try {
      await axiosJWT.put(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/belanja-bulanan`, 
        {
          user_id: state.userInfo.userId,
          status: statusReminder.value,
          date: selectedDate.value,
          hour: selectedHour.value
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${state?.token}`
          }
        }
      )
      setData({
        ...data,
        status: statusReminder.value,
        hour: selectedHour.value,
        date: selectedDate.value
      })
      setLoadUpdate(false)
      setUpdateSucceed(true)
      setMsgUpdate("Sukses mengubah informasi reminder!")
      setOnEdit(false)
    } catch (error) {
      console.error(error)
      setLoadUpdate(false)
      setUpdateSucceed(false)
      setMsgUpdate("Gagal mengubah informasi reminder!")
    }
    setTimeout(() => {
      setMsgUpdate()
      setUpdateSucceed()
    }, 5000)
  }

  return (
    <LayoutShop>
      <div className="w-[90%] md:mx-0 mx-auto">
        {/* {loading && (<p>Loading...</p>)}
        {!loading && (
          <>
            <div className="my-10 flex flex-col gap-3">
              <div className="flex gap-3 items-center ">
                <Icon icon="solar:cart-linear" width={30} className="text-[#A88653]" />
                <span className="text-slate-800 text-2xl">Reminder Belanja Bulanan</span>
              </div>
            </div>
          </>
        )} */}
        <>
          <div className="my-10 flex flex-col gap-3">
            <div className="flex gap-3 items-center ">
              <Icon icon="solar:cart-linear" width={30} className="text-[#A88653]" />
              <span className="text-slate-800 text-2xl">Reminder Belanja Bulanan</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <hr />
            <div className="bg-gray-100 rounded-lg p-2">
              <p className="text-sm font-light">Jika status reminder <strong>Aktif</strong>, produk yang ada di halaman ini akan otomatis ada di dalam keranjang belanja anda, dan anda akan menerima email reminder untuk checkout produk-produk tersebut</p>
            </div>
          </div>
          {
            loading && (
              <div className="flex justify-center py-20">
                <BarLoader
                  color="#B7C4CF"
                  loading={loading}
                  // cssOverride={override}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )
          }
          {
            !loading && (
              <div className="flex flex-col gap-10 my-20">
                <ItemContainer scheduler_item={data?.scheduler_item} setData={setData} dataScheduler={data} />
              </div>
            )
          }
          <div className="flex justify-center items-center gap-5 mt-20 mb-10">
            <hr className="w-[10rem]" />
            <p className="text-xl">Detail Reminder</p>
            <hr className="w-[10rem]" />
          </div>
          <div className="flex justify-between sm:flex-row flex-col sm:gap-0 gap-5 sm:mx-0 mx-auto">
            <Select
              className="basic-single sm:w-[30%] w-[100%] sm:mx-0 mx-auto"
              classNamePrefix="select"
              defaultValue={ data?.date ? {value: data?.date, label: `Tanggal ${data?.date}`} : null}
              value={selectedDate}
              isClearable={true}
              isSearchable={true}
              name="date"
              options={optionTanggal}
              placeholder="Pilih Tanggal Reminder"
              onChange={(e) => {
                console.log({e})
                // setCity(e?.value)
                setSelectedDate(e)
              }}
              isDisabled={!onEdit}
            />
            <Select
              className="basic-single sm:w-[30%] w-[100%] sm:mx-0 mx-auto"
              classNamePrefix="select"
              defaultValue={ data?.hour ? {value: data?.hour, label: `Jam ${data?.hour}`} : null}
              value={selectedHour}
              isClearable={true}
              isSearchable={true}
              name="hour"
              options={optionJam}
              placeholder="Pilih Jam Reminder"
              onChange={(e) => {
                console.log({e})
                // setCity(e?.value)
                setSelectedHour(e)
              }}
              isDisabled={!onEdit}
            />
            <Select
              className="basic-single sm:w-[30%] w-[100%] sm:mx-0 mx-auto"
              classNamePrefix="select"
              defaultValue={ data?.status === 1 || data?.status === 0 ? {value: data?.status, label: data?.status === 1 ? "Aktif" : "Non-Aktif"} : null}
              value={statusReminder}
              isClearable={true}
              isSearchable={true}
              name="status"
              options={optionStatus}
              placeholder="Status Reminder"
              onChange={(e) => {
                console.log({e})
                // setCity(e?.value)
                setStatusReminder(e)
              }}
              isDisabled={!onEdit}

            />
          </div>
          <motion.div className={`md:w-[30rem] w-[80%] mx-auto my-10 p-3 border-[1px] rounded-lg ${msgUpdate ? "block" : "hidden"} ${updateSucceed ? "border-green-500 text-green-500" : updateSucceed === false ? "border-red-500 text-red-500" : null}`}
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{once:true}}
            transition={{staggerChildren:0.5}}
            variants={updateSucceed ? animateFromAboveSlower : updateSucceed === false ? animateVibrate : null}
          >
            {msgUpdate}
          </motion.div>
          <div className="my-5 flex justify-end gap-3">
            {!onEdit && (
              <button className="px-7 py-1 rounded-lg border-[1px] border-red-500 text-red-500 hover:bg-slate-50"
                onClick={() => setOnEdit(true)}
              >Edit</button>
            )}
            {onEdit && (
              <>
                <button className="px-7 py-1 rounded-lg border-[1px] border-red-500 text-red-500 hover:bg-slate-50"
                  onClick={() => handleCancel()}
                >Cancel</button>
                <button className="px-7 py-1 rounded-lg border-[1px] bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => handleSubmit()}
                >Save</button>
              </>
              
            )}
          </div>
        </>
      </div>
    </LayoutShop>
  )
}

export default BelanjaBulanan