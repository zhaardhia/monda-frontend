import React from 'react'
import CatalogueCard from './CatalogueCard'

const CatalogueContainer = ({ products }) => {
  console.log({products})
  return (
    <div className="grid lg:grid-cols-3 grid-cols-2 justify-items-center gap-x-0 gap-y-4 xl:w-[70rem] mx-auto">
      {products?.map((data) => {
        return (
          <CatalogueCard data={data} />
        )
      })}
    </div>
  )
}

export default CatalogueContainer