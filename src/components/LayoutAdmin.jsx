import React from "react";
import SidebarAdmin from "./SidebarAdmin";
import Link from "next/link";
import { Icon } from "@iconify/react";

const LayoutAdmin = ({ children }) => {
  return (
    <>
      <SidebarAdmin />
      <div className="absolute right-7 top-7">
        <Link href="#" className="">
          <Icon icon="gg:profile" width={40} />
        </Link>
      </div>
      <div className="p-4 sm:ml-28">{children}</div>
    </>
  );
};

export default LayoutAdmin;
