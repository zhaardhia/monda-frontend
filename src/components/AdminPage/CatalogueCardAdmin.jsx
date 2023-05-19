import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSessionUser } from "../../contexts/SessionUserContext";
import { rupiah } from '../../utils/libs'
const CatalogueCardAdmin = ({ data }) => {
  const router = useRouter();

  const [countCart, setCountCart] = useState(data?.userCart?.quantity || 0);
  const { axiosJWT, refreshToken, dispatch, state } = useSessionUser();

  return (
    <div className="w-64 shadow-xl rounded-lg flex flex-col items-center">
      {data?.image ? (
        <img src={`${process.env.NEXT_PUBLIC_BASE_WEB}${data?.image}`} alt="" className="md:w-[18rem] w-[5rem] h-[70%] object-cover" />
      ) : (
        <img src={`/sambel-roa.png`} alt="" className="md:w-[18rem] w-[5rem] object-cover" />
      )}
      <div className="w-[90%] my-4 flex flex-col gap-2">
        <Link href={`product/detail/${data?.id}`} className="text-xl font-semibold">
          {data?.name}
        </Link>
        <div className="flex justify-between items-center">
          <p>{rupiah(data?.price)}</p>
          <div className="flex h-[2rem]">
            <Link href={`product/detail/${data?.id}`} className="w-20 border-[1px] rounded-lg flex justify-center items-center bg-[#DE5959] text-white">
              {/* <Icon icon="material-symbols:edit" width={25} className="mr-0.5" /> */}
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogueCardAdmin;
