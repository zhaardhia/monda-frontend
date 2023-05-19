import React, { useState } from 'react'
import ImageUploader from './ImageUploader';
import { Icon } from '@iconify/react'
import { useSessionUser } from '../../contexts/SessionUserContext'
import { motion } from "framer-motion";
import { animateVibrate, animateFromAboveSlower } from "../../animations/animationFade";

const InsertProduct = () => {
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [stock, setStock] = useState(0)
  const [description, setDescription] = useState()
  const [image, setImage] = useState()
  const { axiosJWTAdmin, state } = useSessionUser()
  const [msgError, setMsgError] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(false)

  const submitProduct = async () => {
    console.log({name}, {price}, {stock}, {description}, {image})

    if (!name || !price || !stock || !description || !image) {
      setMsgError("Informasi produk harus diisi dengan lengkap")
      setTimeout(() => {
        setMsgError(false)
      }, 5000)
    } else {
      setMsgError(false)
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('stock', stock)
      formData.append('description', description)
      formData.append('image', image)

      try {
        await axiosJWTAdmin( 
          {
            method: "post",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/product`,
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${state?.token}`,
              "Content-Type": "multipart/form-data"
            },
            data: formData,
          }    
        )
        setMsgError(false)
        setMsgSuccess("Sukses menambahkan produk baru kedalam katalog.")

        setTimeout(() => {
          window.location.reload()
        }, 5000)
      } catch (error) {
        console.error(error)
        setMsgError(error.response.data.message)
        setMsgSuccess(false)
        setTimeout(() => {
          setMsgError(false)
        }, 5000)
      }
    }
  }

  return (
    <>
      <div className="flex ml-10">
        <div className="pt-6">
          <label className="flex justify-center mb-4 font-semibold text-lg">Gambar Produk</label>
          <ImageUploader setImage={setImage} imageURL={image} />
        </div>
        <div className="ms-12 w-full">
          {/* Nama Produk */}
          <div className="mb-3">
            <label htmlFor="" className="block font-semibold text-lg">
              Nama Produk
            </label>
            <input
              type="text"
              id="input-group-1"
              className="w-[455px] p-2.5 border-b border-t-0 border-l-0 border-r-0 border-grey-dark focus:outline-none focus:border-b-blue-500 focus:ring-0"
              onChange={(e) =>
                setName(e.target.value)
              }
              value={name}
              placeholder="Masukan nama produk"
            />
          </div>
          {/* Harga Produk */}
          <div className="mb-3">
            <label htmlFor="" className="block font-semibold text-lg">
              Harga Produk
            </label>
            <div class="relative ">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none font-semibold text-gray-400">Rp</div>
              <input
                type="text"
                id="input-group-2"
                className="w-[455px] pl-10 p-2.5 border-b border-t-0 border-l-0 border-r-0 border-grey-dark focus:outline-none focus:border-b-blue-500 focus:ring-0"
                pattern="[0-9]"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />
            </div>
          </div>
          {/* Stok Produk */}
          <div className="mb-3">
            <label htmlFor="" className="block font-semibold text-lg">
              Stok Produk
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="input-group-1"
                className="w-[455px] inline p-2.5 border-b border-t-0 border-l-0 border-r-0 border-grey-dark focus:outline-none focus:border-b-blue-500 focus:ring-0"
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value)
                }
                pattern="[0-9]"
              />
              <button
                className="w-9 h-9 rounded-full border border-black ms-3 mr-3 text-[#79CEAA] flex justify-center items-center active:border-2"
                onClick={(e) => {
                  e.preventDefault();
                  setStock(stock + 1);
                }}
              >
                <Icon icon="ic:outline-plus" width={30} />
              </button>
              <button
                className="w-9 h-9 rounded-full border border-black text-[#D72C2C] flex justify-center items-center active:border-2"
                onClick={(e) => {
                  e.preventDefault();
                  if (stock > 0) setStock(stock - 1);
                }}
              >
                <Icon icon="ic:outline-minus" width={30} />
              </button>
            </div>
          </div>
          {/* Deskripsi Produk */}
          <div>
            <label htmlFor="" className="block font-semibold text-lg mb-1">
              Deskripsi Produk
            </label>
            <textarea
              class="peer block w-[630px] min-h-[auto] rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              rows="4"
              placeholder="Description"
              onChange={(e) =>
                setDescription(e.target.value)
              }
              value={description}
            ></textarea>
          </div>
          {/* Button Submit */}
          <div className="flex justify-end mt-5 w-[630px]">
            <button type="submit" className="px-5 py-2 w-64 rounded-[15px] bg-[#DE5959] text-white hover:shadow-lg"
              onClick={submitProduct}
            >
              Upload Product
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className={`border-2 border-green-500 rounded-xl p-2 ${msgSuccess ? "block" : "hidden"} sm:w-[30rem] w-[80%] mx-auto mt-10 mb-20`}
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.5 }}
        variants={animateFromAboveSlower}
      >
        <p className="text-green-500 text-center">{msgSuccess}</p>
      </motion.div>
      <motion.div
        className={`border-2 border-red-500 rounded-xl p-2 ${msgError ? "block" : "hidden"} sm:w-[30rem] w-[80%] mx-auto mt-10 mb-20`}
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.5 }}
        variants={animateVibrate}
      >
        <p className="text-red-500 text-center">{msgError}</p>
      </motion.div>
    </>
  )
}

export default InsertProduct