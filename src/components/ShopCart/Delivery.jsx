import React from 'react'
import Select from 'react-select'

const Delivery = () => {
  const chooseCourier = [
    { value: 'jne', label: 'JNE' },
    { value: 'j&t', label: 'J&T' },
    { value: 'anteraja', label: 'AnterAja' },
    { value: 'cod', label: 'COD' },
  ]
  return (
    <div className="flex justify-between items-center p-10 rounded-2xl w-[80%] shadow-xl mx-auto bg-slate-50">
      <h1 className="text-xl">Delivery Courier</h1>
      <div className="flex gap-5 items-center w-[40%]">
        <p className="font-light">Pilih Kurir: </p>
        <Select
          className="basic-single w-[80%]"
          classNamePrefix="select"
          // defaultValue={chooseCourier[0]}
          // isLoading={isLoading}
          isClearable={true}
          isSearchable={true}
          name="courier"
          options={chooseCourier}
        />
      </div>
    </div>
  )
}

export default Delivery