import React from "react";
import SidebarAdmin from "./SidebarAdmin";

const LayoutAdmin = ({ children }) => {
   return (
      <>
         <SidebarAdmin />

         <div className="p-4 sm:ml-32">{children}</div>
      </>
   );
};

export default LayoutAdmin;
