import React from 'react'
import LayoutShop from '@/components/LayoutShop'
import BannerWelcome from '@/components/ShopCatalogue/BannerWelcome'
import SearchBar from '@/components/SearchBar'

const ShopIndex = () => {
  return (
    <LayoutShop>
      <div className="w-[90%]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl">Hi<span className="text-[#A88653]">, Ishaq!</span></h1>
          <SearchBar />
        </div>
        <BannerWelcome />
        <div className="flex justify-center items-center gap-5 my-10">
          <hr className="w-[30%]" />
          <p className="text-xl">Our Products</p>
          <hr className="w-[30%]" />
        </div>
      </div>
    </LayoutShop>
  )
}

export default ShopIndex