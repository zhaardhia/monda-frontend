import { Icon } from "@iconify/react";
import React from "react";

const TableSectionAdmin = () => {
  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
            <td className="px-6 py-4 font-medium text-base text-gray-900">01748274829472847</td>
            <td className="px-6 py-4 font-medium text-base text-gray-900">JNE</td>
            <td className="px-6 py-4">
              <span className="px-3 py-1 text-[#03543F] rounded-[10px] bg-[#DEF7EC]">Completed</span>
            </td>
            <td className="px-6 py-4">
              <Icon icon="material-symbols:edit-square-outline-rounded" width={25} className="text-[#624DE3]" />
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-base text-gray-900 whitespace-nowrap dark:text-white">
              #001
            </th>
            <td className="px-6 py-4 text-base">Apr 23, 2023</td>
            <td className="px-6 py-4 font-medium text-gray-900 text-base">01748274829472847</td>
            <td className="px-6 py-4 font-medium text-gray-900 text-base">JNE</td>
            <td className="px-6 py-4">
              <span className="px-3 py-1 text-[#CD6200] rounded-[10px] bg-[#FEF2E5]">On Going</span>
            </td>
            <td className="px-6 py-4">
              <Icon icon="material-symbols:edit-square-outline-rounded" width={25} className="text-[#624DE3]" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableSectionAdmin;
