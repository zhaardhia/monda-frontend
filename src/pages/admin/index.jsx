import LayoutAdmin from "@/components/LayoutAdmin";
import React from "react";
import BannerWelcome from "@/components/ShopCatalogue/BannerWelcome";
import CatalogueContainer from "@/components/ShopCatalogue/CatalogueContainer";

const AdminIndex = () => {
   return (
      <LayoutAdmin>
         <div className="w-[90%]">
            <div className="flex justify-between items-center mb-8">
               <h1 className="text-2xl">
                  Welcome Back<span className="text-[#A88653]">, Admin!</span>
               </h1>
            </div>
         </div>
      </LayoutAdmin>
   );
};

export default AdminIndex;
