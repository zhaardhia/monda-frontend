import React from 'react'
import ItemCard from './ItemCard'

const ItemContainer = ({ scheduler_item, setData, dataScheduler }) => {
  console.log({scheduler_item})
  return (
    <div className="grid lg:grid-cols-3 grid-cols-2 justify-items-center sm:gap-x-0 gap-x-2 gap-y-4 xl:w-[70rem] mx-auto">
      {scheduler_item?.map((data) => {
        return (
          <ItemCard data={data} setData={setData} dataScheduler={dataScheduler} />
        )
      })}
    </div>
  )
}

export default ItemContainer