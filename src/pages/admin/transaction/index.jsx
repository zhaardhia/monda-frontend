import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();

  // dummy data
  const [dataTransaction, setDataTransaction] = useState([
    {
      id: "001",
      status: "Verified",
    },
    {
      id: "002",
      status: "On Going",
    },
  ]);

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
                  className="w-32 h-[36px] flex py-1 text-[#53514D] border font-medium border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    <Icon icon="bx:search-alt" width={20} className="text-[#C2C2C2]" />
                  </div>
                  <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border border-gray-300 h-[36px] w-60 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                {dataTransaction?.map((data) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-base text-gray-900 whitespace-nowrap dark:text-white">
                        {data.id}
                      </th>
                      <td className="px-6 py-4 text-base">Apr 23, 2023</td>
                      <td className="px-6 py-4 font-medium text-gray-900 text-base">01748274829472847</td>
                      <td className="px-6 py-4 font-medium text-gray-900 text-base">JNE</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 ${data.status === "Verified" ? "text-[#03543F] bg-[#DEF7EC]" : "text-[#CD6200] bg-[#FEF2E5] "}  rounded-[10px] `}>{data.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/admin/transaction/detail/${data.id}`} className="p-2 bg-[#DE5959] text-white w-24 rounded-3xl flex items-center justify-center gap-2 cursor-pointer group">
                          <h1 className="font-semibold">Details</h1>
                          <Icon icon="material-symbols:keyboard-double-arrow-right" width={20} className="group-hover:translate-x-[6px] duration-300" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default index;
