import ImageUploader from "@/components/AdminPage/ImageUploader";
import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router = useRouter();

  return (
    <LayoutAdmin>
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
            <h1>Edit Katalog</h1>
          </div>
          {/* Detail product */}
          <div className="flex p-8">
            <div className="pt-6">
              <label className="flex justify-center mb-4 font-semibold text-lg">Gambar Produk</label>
              <ImageUploader />
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
                  // onChange={(e) =>
                  //   setDataForm((prev) => {
                  //     return { ...prev, name: e.target.value };
                  //   })
                  // }
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
                    // value={dataForm.harga}
                    // onChange={(e) =>
                    //   setDataForm((prev) => {
                    //     return { ...prev, harga: parseInt(e.target.value) || 0 };
                    //   })
                    // }
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
                    // value={dataForm.stok}
                    // onChange={(e) =>
                    //   setDataForm((prev) => {
                    //     return { ...prev, stok: parseInt(e.target.value) || 0 };
                    //   })
                    // }
                    pattern="[0-9]"
                  />
                  <button
                    className="w-9 h-9 rounded-full border border-black ms-3 mr-3 text-[#79CEAA] flex justify-center items-center active:border-2"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   setDataForm((prev) => {
                    //     return { ...prev, stok: prev.stok + 1 };
                    //   });
                    // }}
                  >
                    <Icon icon="ic:outline-plus" width={30} />
                  </button>
                  <button
                    className="w-9 h-9 rounded-full border border-black text-[#D72C2C] flex justify-center items-center active:border-2"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   setDataForm((prev) => {
                    //     if (prev.stok > 0) {
                    //       return { ...prev, stok: prev.stok - 1 };
                    //     }
                    //     return { ...prev, stok: 0 };
                    //   });
                    // }}
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
                  // onChange={(e) =>
                  //   setDataForm((prev) => {
                  //     return { ...prev, description: e.target.value };
                  //   })
                  // }
                ></textarea>
              </div>
              {/* Button Submit */}
              <div className="flex justify-end mt-5 w-[630px]">
                <button type="submit" className="px-5 py-2 w-64 rounded-[15px] bg-[#DE5959] text-xl text-white font-bold hover:shadow-lg">
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default index;
