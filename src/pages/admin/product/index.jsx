import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import CatalogueContainerAdmin from "@/components/AdminPage/CatalogueContainerAdmin";
import React, { useState, useEffect } from "react";
import ImageUploader from "@/components/AdminPage/ImageUploader";
import InsertProduct from "@/components/AdminPage/InsertProduct";
import { useSessionUser } from '../../../contexts/SessionUserContext'
const ProductIndex = () => {
  const { axiosJWTAdmin, state } = useSessionUser()
  const [products, setProducts] = useState([]);
  const [loadProduct, setLoadProduct] = useState()

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoadProduct(true)
      const response = await axiosJWTAdmin.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/product-admin/get-all-products`, {
        headers: {
          Authorization: `Bearer ${state?.token}`
        }
      })
      console.log(response.data)
      setProducts(response.data.data)
      setLoadProduct(false)
    } catch (error) {
      console.error(error)
      setLoadProduct(false)
    }
  }

  return (
    <LayoutAdmin>
      <div className="w-full pr-2">
        <div className="my-10 flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <Icon icon="mingcute:shopping-bag-1-fill" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl font-bold">Katalog Produk</span>
          </div>
          <div className="border-[1px] rounded-xl px-5 py-7 my-3">
            <div className="flex flex-row pb-3 items-center gap-3">
              <div className="flex gap-3 items-center">
                <Icon icon="material-symbols:add" width={40} className="text-[#4B8F98]" />
                <span className="text-slate-800 text-2xl font-bold ">Tambah Katalog</span>
              </div>
            </div>
            {/* Form */}
            <InsertProduct />
          </div>
          <div className="border-[1px] rounded-xl px-5 py-7 my-3">
            <div className="flex flex-row pb-3 items-center gap-3">
              <div className="flex flex-col gap-3 ">
                <div className="flex items-center ">
                  <Icon icon="material-symbols:edit" width={40} className="text-[#A88653] inline" />
                  <span className="text-slate-800 text-2xl font-bold">Edit Katalog</span>
                </div>
              </div>
            </div>
            <CatalogueContainerAdmin products={products} />
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default ProductIndex;
