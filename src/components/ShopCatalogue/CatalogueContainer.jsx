import React from 'react'
import CatalogueCard from './CatalogueCard'

const CatalogueContainer = () => {
  return (
    <div className="grid grid-cols-3 justify-items-center gap-x-0 gap-y-4 w-[75%] mx-auto">
      <CatalogueCard />
      <CatalogueCard />
      <CatalogueCard />
      <CatalogueCard />
      <CatalogueCard />
      <CatalogueCard />
    </div>
  )
}

export default CatalogueContainer