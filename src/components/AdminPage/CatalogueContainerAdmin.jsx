import React from "react";
import CatalogueCardAdmin from "./CatalogueCardAdmin";

const CatalogueContainerAdmin = ({ products }) => {
   console.log({ products });
   return (
      <div className="grid grid-cols-3 justify-items-center gap-x-0 gap-y-4 w-[75%] mx-auto">
         {products?.map((data) => {
            return <CatalogueCardAdmin data={data} />;
         })}
      </div>
   );
};

export default CatalogueContainerAdmin;
