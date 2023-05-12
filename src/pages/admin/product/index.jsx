import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import CatalogueContainerAdmin from "@/components/AdminPage/CatalogueContainerAdmin";
import React, { useState, useEffect } from "react";

const ProductIndex = () => {
   const [products, setProducts] = useState([
      { id: "#001", name: "Bango", price: 2000 },
      { id: "#002", name: "Mie Goreng", price: 21000 },
      { id: "#002", name: "Mie Goreng", price: 21000 },
      { id: "#002", name: "Mie Goreng", price: 21000 },
   ]);

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
                  <Icon
                     icon="mingcute:shopping-bag-1-fill"
                     width={40}
                     className="text-[#A88653]"
                  />
                  <span className="text-slate-800 text-2xl font-bold">
                     Katalog Produk
                  </span>
               </div>
               <div className="border-[1px] rounded-xl px-5 py-7 my-3">
                  <div className="flex flex-row pb-3 items-center gap-3">
                     <div className="flex gap-3 items-center ">
                        <Icon
                           icon="material-symbols:add"
                           width={40}
                           className="text-[#4B8F98]"
                        />
                        <span className="text-slate-800 text-2xl font-bold ">
                           Tambah Katalog
                        </span>
                     </div>
                  </div>
               </div>
               <div className="border-[1px] rounded-xl px-5 py-7 my-3">
                  <div className="flex flex-row pb-3 items-center gap-3 ">
                     <div className="flex flex-col gap-3 ">
                        <div className="flex items-center ">
                           <Icon
                              icon="material-symbols:edit"
                              width={40}
                              className="text-[#A88653] inline"
                           />
                           <span className="text-slate-800 text-2xl font-bold">
                              Edit Katalog
                           </span>
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
