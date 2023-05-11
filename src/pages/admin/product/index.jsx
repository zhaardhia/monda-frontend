import LayoutAdmin from "@/components/LayoutAdmin";
import React from "react";
import { Icon } from "@iconify/react";

const ProductInput = () => {
   return (
      <LayoutAdmin>
         <div className="w-[90%]">
            <div className="flex my-10">
               <Icon
                  icon="mingcute:shopping-bag-1-fill"
                  width={30}
                  className="text-[#A88653]"
               />
               <span className="text-slate-800 text-2xl">Katalog Produk</span>
            </div>
         </div>
         ;
      </LayoutAdmin>
   );
};

export default ProductInput;
