import TableSectionAdmin from "@/components/AdminPage/TableSection";
import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import React from "react";

const index = () => {
  return (
    <LayoutAdmin>
      <div className="w-full pr-2">
        <div className="my-10 flex flex-col gap-3">
          <div className="flex gap-3 items-center ">
            <Icon icon="iconoir:delivery-truck" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl">Pengiriman</span>
          </div>
          <div className="border-[1px] rounded-xl px-5 py-7 my-3">
            <TableSectionAdmin />
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default index;
