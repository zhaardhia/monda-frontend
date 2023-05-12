import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSessionUser } from "../../contexts/SessionUserContext";

const CatalogueCardAdmin = ({ data }) => {
   const [countCart, setCountCart] = useState(data?.userCart?.quantity || 0);
   const { axiosJWT, refreshToken, dispatch, state } = useSessionUser();

   const addToCart = async () => {
      try {
         await axiosJWT.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/v1/shopping-cart`,
            {
               product_id: data?.id,
               user_id: state.userInfo.userId,
            },
            {
               withCredentials: true,
               headers: {
                  Authorization: `Bearer ${state?.token}`,
               },
            }
         );
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className="w-[20rem] shadow-xl rounded-lg flex flex-col items-center">
         <img src="/sambel-roa.png" alt="" className="md:w-[18rem] w-[5rem]" />
         <div className="w-[90%] my-4 flex flex-col gap-2">
            <Link
               href={`/shop/detail-product/${data?.id}`}
               className="text-xl font-semibold"
            >
               {data?.name}
            </Link>
            <div className="flex justify-between items-center">
               <p>Rp {data?.price}</p>
               <div className="flex h-[2rem]">
                  <button
                     className="w-20 border-[1px] rounded-full flex justify-center items-center bg-[#DE5959] text-white"
                     onClick={() => router.push("/shop")}
                  >
                     <Icon
                        icon="material-symbols:edit"
                        width={25}
                        className="mr-0.5"
                     />
                     Edit
                  </button>
                  {/* <div className="flex justify-evenly border-[1px] items-center w-[4rem] bg-[#DE5959] text-white">
                     <div className="">
                        <p>{countCart}</p>
                     </div>
                     <Icon
                        icon="material-symbols:shopping-cart-outline-rounded"
                        width={20}
                     />
                  </div> */}
               </div>
            </div>
         </div>
      </div>
   );
};

export default CatalogueCardAdmin;
