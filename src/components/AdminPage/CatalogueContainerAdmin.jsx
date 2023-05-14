import React from "react";
import CatalogueCardAdmin from "./CatalogueCardAdmin";

const CatalogueContainerAdmin = ({ products }) => {
  return (
    <div className="grid grid-cols-4 justify-items-center gap-x-0 gap-y-7 w-full mx-auto mt-4">
      {products?.map((data, i) => {
        return <CatalogueCardAdmin key={i} data={data} />;
      })}
    </div>
  );
};

export default CatalogueContainerAdmin;
