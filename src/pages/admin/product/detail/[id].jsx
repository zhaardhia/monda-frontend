import ImageUploader from "@/components/AdminPage/ImageUploader";
import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSessionUser } from '../../../../contexts/SessionUserContext'
import { ClockLoader } from 'react-spinners'
import { motion } from "framer-motion";
import { animateVibrate, animateFromAboveSlower } from "../../../../animations/animationFade";

const ProductDetail = () => {
  const router = useRouter();
  const [onEdit, setOnEdit] = useState(false)
  const [product, setProduct] = useState()
  const [loadProduct, setLoadProduct] = useState()
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [stock, setStock] = useState(0)
  const [description, setDescription] = useState()
  const [image, setImage] = useState()

  const { axiosJWTAdmin, state } = useSessionUser()

  const [msgError, setMsgError] = useState(false)
  const [msgSuccess, setMsgSuccess] = useState(false)

  const [modalDelete, setModalDelete] = useState(false)

  useEffect(() => {
    getProductDetail()
  }, [router?.query?.id])

  const handleCancelEdit = () => {
    setOnEdit(false)
    setName(product.name)
    setPrice(product.price)
    setStock(product.stock)
    setDescription(product.description)
  }

  const getProductDetail = async () => {
    try {
      setLoadProduct(true)
      const response = await axiosJWTAdmin.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/product/detail-product?id=${router?.query?.id}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response.data)
      setProduct(response.data.data)
      setName(response.data.data.name)
      setPrice(response.data.data.price)
      setStock(response.data.data.stock)
      setDescription(response.data.data.description)

      setLoadProduct(false)
    } catch (error) {
      console.error(error)
      setLoadProduct(false)
    }
  }

  const submitProduct = async () => {
    console.log({name}, {price}, {stock}, {description}, {image})

    if (!name || !price || !stock || !description) {
      setMsgError("Informasi produk harus diisi dengan lengkap")
      setTimeout(() => {
        setMsgError(false)
      }, 5000)
    } else if (isNaN(price) || isNaN(stock)) {
      setMsgError("Harga atau Stok harus berupa angka.")
      setTimeout(() => {
        setMsgError(false)
      }, 5000)
    } else {
      setMsgError(false)
      const formData = new FormData()
      formData.append('id', product.id)
      formData.append('name', name)
      formData.append('price', price)
      formData.append('stock', stock)
      formData.append('description', description)
      formData.append('image', image)

      try {
        await axiosJWTAdmin( 
          {
            method: "put",
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

  const softDeleteProduct = async () => {
    if (!router.query.id) {
      setMsgError("Produk ID Tidak Terdeteksi")
      setTimeout(() => {
        setMsgError(false)
      }, 5000)
    } else {
      setMsgError(false)

      try {
        await axiosJWTAdmin( 
          {
            method: "put",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/product/soft-delete-product`,
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${state?.token}`,
            },
            data: {
              product_id: router.query.id
            }
          }    
        )
        setMsgError(false)
        setMsgSuccess("Sukses menghapus produk dari katalog.")

        setTimeout(() => {
          window.location = `${process.env.NEXT_PUBLIC_BASE_THIS_WEB}admin/product`
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
    <LayoutAdmin>
      {loadProduct && (
        <div className="mx-auto my-20 w-[5rem]">
          <ClockLoader />
        </div>
      )}
      {!loadProduct && product && (
        <div className="w-full">
          <div className="my-8 flex flex-row gap-3">
            <Icon icon="mingcute:shopping-bag-1-fill" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl font-bold">Katalog Produk</span>
          </div>
          <div className="border-[1px] rounded-xl px-5 py-7 my-3 relative">
            <div className="absolute flex flex-row items-center text-[#393734] font-semibold text-lg cursor-pointer" onClick={() => router.push("/admin/product")}>
              <Icon icon="material-symbols:arrow-back-ios-rounded" />
              <h1>Kembali</h1>
            </div>
            <div className="text-center text-[#393734] font-semibold text-2xl flex flex-row justify-center items-center">
              <Icon icon="majesticons:edit-pen-4-line" className="text-[#999B3F] mr-3" />
              <h1>Detail Katalog</h1>
            </div>
            {/* Detail product */}
            <div className="flex p-8">
              <div className="pt-6 flex flex-col">
                <label className="flex justify-center mb-4 font-semibold text-lg">Gambar Produk</label>
                <img src={`${process.env.NEXT_PUBLIC_BASE_WEB}${product?.image}`} alt={product?.image} className="w-[20rem] rounded-lg" />
                {onEdit && (
                  <>
                    <label className="flex justify-center mt-10 mb-3 font-semibold text-lg">Gambar Produk Baru</label>
                    <ImageUploader setImage={setImage} imageURL={image} />
                  </>
                )}
                
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
                    className="w-[455px] p-2.5 border-b border-t-0 border-l-0 border-r-0 border-grey-dark focus:outline-none focus:border-b-blue-500 focus:ring-0 bg-white border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" 
                    onChange={(e) => setName(e.target.value) }
                    value={name}
                    disabled={!onEdit}
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
                      className="w-[455px] pl-10 p-2.5 border-b border-t-0 border-l-0 border-r-0 border-grey-dark focus:outline-none focus:border-b-blue-500 focus:ring-0 bg-white border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                      pattern="[0-9]"
                      onChange={(e) => setPrice(e.target.value) }
                      value={price}
                      disabled={!onEdit}
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
                      className="w-[455px] inline p-2.5 border-b border-t-0 border-l-0 border-r-0 border-grey-dark focus:outline-none focus:border-b-blue-500 focus:ring-0 bg-white border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                      onChange={(e) => setStock(e.target.value) }
                      value={stock}
                      disabled={!onEdit}
                      pattern="[0-9]"
                    />
                    <button
                      className="w-9 h-9 rounded-full border ms-3 mr-3 text-[#79CEAA] flex justify-center items-center active:border-2 disabled:bg-slate-100"
                      onClick={(e) => setStock(stock + 1) }
                      disabled={!onEdit}
                    >
                      <Icon icon="ic:outline-plus" width={30} />
                    </button>
                    <button
                      className="w-9 h-9 rounded-full border text-[#D72C2C] flex justify-center items-center active:border-2 disabled:bg-slate-100"
                      onClick={(e) => {
                        if (stock > 0) setStock(stock - 1)
                      }}

                      disabled={!onEdit}
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
                    class="peer block w-[630px] min-h-[auto] rounded bg-white border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                    rows="4"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    disabled={!onEdit}
                  ></textarea>
                </div>
                {/* Button Submit */}
                <motion.div
                  className={`border-2 border-green-500 rounded-xl p-2 ${msgSuccess ? "block" : "hidden"} sm:w-[30rem] w-[80%] mx-auto my-10`}
                  initial={"offscreen"}
                  whileInView={"onscreen"}
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.5 }}
                  variants={animateFromAboveSlower}
                >
                  <p className="text-green-500 text-center">{msgSuccess}</p>
                </motion.div>
                <motion.div
                  className={`border-2 border-red-500 rounded-xl p-2 ${msgError ? "block" : "hidden"} sm:w-[30rem] w-[80%] mx-auto my-10`}
                  initial={"offscreen"}
                  whileInView={"onscreen"}
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.5 }}
                  variants={animateVibrate}
                >
                  <p className="text-red-500 text-center">{msgError}</p>
                </motion.div>
                <div className="flex justify-end mt-5 w-[630px] gap-3">
                  {onEdit ? (
                    <>
                      <button className="px-5 py-2 w-64 rounded-[15px] bg-white border-[1px] border-[#DE5959] text-[#DE5959] hover:shadow-lg"
                        onClick={() => handleCancelEdit()}
                      >
                        Cancel
                      </button>
                      <button className="px-5 py-2 w-64 rounded-[15px] bg-[#DE5959] text-white hover:shadow-lg"
                        onClick={() => submitProduct()}
                      >
                        Save
                      </button>
                    </>
                  ) :
                  (
                    <>
                      <button className="px-5 py-2 w-64 rounded-[15px] bg-[#DE5959] text-white hover:shadow-lg"
                        onClick={() => o}
                      >
                        Delete Product
                      </button>
                      <button className="px-5 py-2 w-64 rounded-[15px] border-[1px] border-[#DE5959] text-[#DE5959] hover:shadow-lg"
                        onClick={() => setOnEdit(true)}
                      >
                        Update Product
                      </button>
                    </>
                  )}
                
                </div>
              </div>
            </div>
          </div>
          {modalDelete && (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto w-fit">
                  <div className="border-0 rounded-lg shadow-lg relative bg-white flex flex-col outline-none focus:outline-none h-fit p-5 md:w-[40rem] w-[80%] mx-auto">
                    <div className="place-self-end">
                      <button
                        onClick={() => setModalDelete(false)}
                        className="p-1 bg-red-500 hover:bg-red-600 rounded-lg"
                      >
                        <Icon width={20} icon="basil:cross-outline" className="text-white" />
                      </button>
                    </div>
                    <div className="my-10 flex flex-col items-center gap-10">
                      <h1 className="sm:text-2xl text-xl text-center">Apakah anda yakin untuk menghapus produk ini?</h1>
                      <button className="py-2 px-5 bg-red-500 rounded-xl shadow-xl text-white"
                        onClick={() => softDeleteProduct()}
                      >Hapus Produk Ini</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          )}
        </div>
      )}
      
    </LayoutAdmin>
  );
};

export default ProductDetail;
