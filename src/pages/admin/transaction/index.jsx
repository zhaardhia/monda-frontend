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
            <span className="text-slate-800 text-2xl font-bold">Transaksi</span>
          </div>
          {/* Section Filtering */}
          <div className="border-[1px] rounded-xl px-5 py-7 my-3">
            <div className="flex flex-row pb-3 items-center gap-3">
              <h1 className="font-semibold text-lg">Sort By :</h1>
              <div>
                <select
                  id="small"
                  class="w-32 h-[36px] flex py-1 text-[#53514D] border font-medium border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="order">ORDER ID</option>
                  <option value="date">DATE</option>
                  <option value="status">STATUS</option>
                  <option value="shipping">SHIPPING</option>
                </select>
              </div>
              {/* Search Bar */}
              <form className="flex items-center ms-2">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                    <Icon icon="bx:search-alt" width={20} />
                  </div>
                  <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border border-gray-300 h-[36px] w-60 font-semibold text-[#C2C2C2] rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
            {/* Table */}
            <table className="w-full text-sm mt-3 text-left text-gray-500 dark:text-gray-400">
              <thead className="border-b-2 border-[#E5E7EB] text-sm text-[#6B7280] uppercase bg-[#F9FAFB] dark:bg-gray-700 dark:text-gray-400">
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
                  <th scope="row" className="px-6 py-4 font-medium text-base text-gray-900 whitespace-nowrap dark:text-white">
                    #001
                  </th>
                  <td className="px-6 py-4 text-base">Apr 23, 2023</td>
                  <td className="px-6 py-4 font-medium text-gray-900 text-base">01748274829472847</td>
                  <td className="px-6 py-4 font-medium text-gray-900 text-base">JNE</td>
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
                  <th scope="row" className="px-6 py-4 font-medium text-base text-gray-900 whitespace-nowrap dark:text-white">
                    #002
                  </th>
                  <td className="px-6 py-4 text-base">Apr 23, 2023</td>
                  <td className="px-6 py-4 font-medium text-gray-900 text-base">01748274829472847</td>
                  <td className="px-6 py-4 font-medium text-gray-900 text-base">Ninja Go</td>
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
