import React, { useEffect, useState } from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'
import { useSessionUser } from '../../contexts/SessionUserContext'
import { useRouter } from 'next/router';
import axios from 'axios';

const Profile = () => {
  const { state, axiosJWT, refreshToken } = useSessionUser()
  const router = useRouter();
  console.log(router.query.id)
  const [userProfile, setUserProfile] = useState()
  const [errorMsg, setErrorMsg] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const [onEdit, setOnEdit] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // refreshToken()
    fetchUserInfo()
  }, [])

  console.log({state})
  const fetchUserInfo = async () => {
    try {
      setLoading(true)
      console.log("userid ", state.userInfo.userId),
      console.log("")
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
  }

  const updateUserInfo = async () => {
    try {
      await axiosJWT.put(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/user-info`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        },
        // data: {
        id: router.query.id,
        email: email ? email : userProfile.email,
        first_name: firstName ? firstName : userProfile,
        last_name: lastName,
        address
        // }
      })

      // setUserProfile({
      //   emai
      // })

      // setFirstName(response?.data?.data?.first_name)
      // setLastName(response?.data?.data?.last_name)
      // setEmail(response?.data?.data?.email)
      // setAddress(response?.data?.data?.address)
    } catch (error) {
      console.error(error)
    }
  }

  // const getUsers = async () => {
  //   const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`, {
  //     headers: {
  //       Authorization: `Bearer ${state?.token}`
  //     }
  //   })
  //   console.log(response.data)
  // }

  return (
    <LayoutShop>
      <div className="w-[90%]">
        {loading && (<p>Loading...</p>)}
        {!loading && (
          <>
            <div className="my-10 flex flex-col gap-3">
              <div className="flex gap-3 items-center ">
                <Icon icon="gg:profile" width={30} className="text-[#A88653]" />
                <span className="text-slate-800 text-2xl">Your Profile</span>
              </div>
            </div>
            <div className="w-[70%] flex flex-col gap-4 justify-center mx-auto">
              <div className="flex justify-between items-center w-full">
                <label className="text-2xl">First Name</label>
                <input type="text" value={firstName} defaultValue={firstName} className="rounded-2xl w-[40rem]" disabled={!onEdit} 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <label className="text-2xl">Last Name</label>
                <input type="text" value={lastName} defaultValue={lastName} className="rounded-2xl w-[40rem]" disabled={!onEdit} 
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <label className="text-2xl">Email</label>
                <input type="text" value={email} defaultValue={email} className="rounded-2xl w-[40rem]" disabled={!onEdit} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center w-full">
                <label className="text-2xl">Address</label>
                <textarea type="text" value={address} defaultValue={address} className="rounded-2xl w-[40rem]" disabled={!onEdit} 
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center my-20">
              <button className="bg-slate-300 px-5 py-2 rounded-xl text-white" onClick={() => setOnEdit(true)}>Update Profil</button>
            </div>
            <div className="flex justify-center gap-5 my-20">
              <button className="bg-red-500 px-5 py-2 rounded-xl text-white" 
                onClick={() => {
                  handleEditCanceled()
                  setOnEdit(false)
                }}>Cancel</button>
              <button className="bg-green-500 px-5 py-2 rounded-xl text-white"
                onClick={updateUserInfo}
              >Save</button>
            </div>
            <div className="flex justify-center gap-5 my-20">
              <button className="bg-red-500 px-5 py-2 rounded-xl text-white" 
                onClick={logout}>Logout</button>
            </div>
          </>
        )}
      </div>
    </LayoutShop>
  )
}

export default Profile