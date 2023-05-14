import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import CatalogueContainerAdmin from "@/components/AdminPage/CatalogueContainerAdmin";
import React, { useState, useEffect } from "react";

const ProductIndex = () => {
  const [products, setProducts] = useState([
    { id: "#001", name: "Bango", price: 2000 },
    { id: "#002", name: "Mie Goreng", price: 21000 },
    { id: "#003", name: "Kacang Popol", price: 4000 },
    { id: "#004", name: "Telor Bebek", price: 54000 },
    { id: "#005", name: "Mie Goreng", price: 21000 },
    { id: "#006", name: "Mie Goreng", price: 21000 },
  ]);

  const [dataForm, setDataForm] = useState({
    name: "",
    harga: 0,
    stok: 0,
    description: "",
  });
  console.log(dataForm);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      setProducts(response.data.data);
    } catch (error) {}
  };

  return (
    <LayoutAdmin>
      <div className="w-full pr-2">
        <div className="my-10 flex flex-col gap-3">
          <div className="flex gap-3 items-center ">
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
            <form action="" className="flex p-8">
              <div>
                <label>Gambar Produk</label>
                <div className="border border-gray-400 p-4 w-72 h-80">Tambah Gambar</div>
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
                      setDataForm((prev) => {
                        return { ...prev, name: e.target.value };
                      })
                    }
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
                      value={dataForm.harga}
                      onChange={(e) =>
                        setDataForm((prev) => {
                          return { ...prev, harga: parseInt(e.target.value) || 0 };
                        })
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
                      value={dataForm.stok}
                      onChange={(e) =>
                        setDataForm((prev) => {
                          return { ...prev, stok: parseInt(e.target.value) || 0 };
                        })
                      }
                      pattern="[0-9]"
                    />
                    <button
                      className="w-9 h-9 rounded-full border border-black ms-3 mr-3 text-[#79CEAA] flex justify-center items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        setDataForm((prev) => {
                          return { ...prev, stok: prev.stok + 1 };
                        });
                      }}
                    >
                      <Icon icon="ic:outline-plus" width={30} />
                    </button>
                    <button
                      className="w-9 h-9 rounded-full border border-black text-[#D72C2C] flex justify-center items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        setDataForm((prev) => {
                          if (prev.stok > 0) {
                            return { ...prev, stok: prev.stok - 1 };
                          }
                          return { ...prev, stok: 0 };
                        });
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
                      setDataForm((prev) => {
                        return { ...prev, description: e.target.value };
                      })
                    }
                  ></textarea>
                </div>
                {/* Button Submit */}
                <div className="flex justify-end mt-5 w-[630px]">
                  <button type="submit" className="px-5 py-2 w-64 rounded-[15px] bg-[#DE5959] text-xl text-white font-bold hover:shadow-lg">
                    Upload Product
                  </button>
                </div>
              </div>
            </form>
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
