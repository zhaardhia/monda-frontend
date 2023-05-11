import LayoutAdmin from "@/components/LayoutAdmin";
import React from "react";
import { Icon } from "@iconify/react";

const ShipmentInput = () => {
   return (
      <LayoutAdmin>
         <div className="flex my-10">
            <Icon
               icon="iconoir:delivery-truck"
               width={30}
               className="text-[#A88653]"
            />
            <span className="text-slate-800 text-2xl">Pengiriman</span>
         </div>
      </LayoutAdmin>
   );
};

export default ShipmentInput;
