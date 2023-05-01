import React from 'react'
import LayoutShop from '@/components/LayoutShop'
import { Icon } from '@iconify/react'

const Profile = () => {
  return (
    <LayoutShop>
      <div className="w-[90%]">
        <div className="my-10 flex flex-col gap-3">
          <div className="flex gap-3 items-center ">
            <Icon icon="gg:profile" width={30} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl">Your Profile</span>
          </div>
        </div>
        <div className="w-[70%] flex flex-col gap-4 justify-center mx-auto">
          <div className="flex justify-between items-center w-full">
            <label className="text-2xl">First Name</label>
            <input type="text" value="First" className="rounded-2xl w-[40rem] disabled" />
          </div>
          <div className="flex justify-between items-center w-full">
            <label className="text-2xl">Last Name</label>
            <input type="text" value="Last" className="rounded-2xl w-[40rem] disabled" />
          </div>
          <div className="flex justify-between items-center w-full">
            <label className="text-2xl">Email</label>
            <input type="text" value="email@gmail.com" className="rounded-2xl w-[40rem] disabled" />
          </div>
          <div className="flex justify-between items-center w-full">
            <label className="text-2xl">Address</label>
            <textarea type="text" value="email@gmail.com" className="rounded-2xl w-[40rem] disabled" />
          </div>
        </div>
        <div className="flex justify-center my-20">
          <button className="bg-slate-300 px-5 py-2 rounded-xl text-white">Update Profil</button>
        </div>
      </div>
    </LayoutShop>
  )
}

export default Profile