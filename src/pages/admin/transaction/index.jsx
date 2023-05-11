import ModalTransaction from "@/components/AdminPage/ModalTransaction";
import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import React from "react";
import { useState } from "react";

const index = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <LayoutAdmin>
      <div className="w-full pr-2">
        <div className="my-10 flex flex-col gap-3">
          <div className="flex gap-3 items-center ">
            <Icon icon="grommet-icons:transaction" width={40} className="text-[#A88653]" />
            <span className="text-slate-800 text-2xl">Transaksi</span>
          </div>
          <div className="border-[1px] rounded-xl px-5 py-7 my-3">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="border-b-2 border-[#E5E7EB] text-xs text-gray-700 uppercase bg-[#F9FAFB] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ORDER ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DATE & TIME
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NO. RESI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SHIPPING
                  </th>
                  <th scope="col" className="px-6 py-3">
                    STATUS
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    #001
                  </th>
                  <td className="px-6 py-4 ">Apr 23, 2023</td>
                  <td className="px-6 py-4 font-medium text-gray-900">01748274829472847</td>
                  <td className="px-6 py-4 font-medium text-gray-900">JNE</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-[#03543F] rounded-[10px] bg-[#DEF7EC] ">Verified</span>
                  </td>
                  <td className="px-6 py-4">
                    <div onClick={() => setShowModal(true)} className="cursor-pointer">
                      <Icon icon="material-symbols:edit-square-outline-rounded" width={25} className="text-[#624DE3]" />
                    </div>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    #002
                  </th>
                  <td className="px-6 py-4 ">Apr 23, 2023</td>
                  <td className="px-6 py-4 font-medium text-gray-900">01748274829472847</td>
                  <td className="px-6 py-4 font-medium text-gray-900">Ninja Go</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-slate-800 rounded-[10px] bg-slate-300 ">Not verified</span>
                  </td>
                  <td className="px-6 py-4">
                    <div onClick={() => setShowModal(true)} className="cursor-pointer">
                      <Icon icon="material-symbols:edit-square-outline-rounded" width={25} className="text-[#624DE3]" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {showModal ? <ModalTransaction setShowModal={setShowModal} /> : null}
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default index;
