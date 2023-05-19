import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { checkStatusOrder, checkStatusOrderBgColor, checkStatusOrderTextColor } from '../../utils/libs'
const TableSectionAdmin = ({ orders }) => {
  console.log({orders})
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
            {/* <th scope="col" className="px-6 py-3">
              ACTION
            </th> */}
          </tr>
        </thead>
        <tbody>
          {orders?.map((data) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-base text-gray-900 whitespace-nowrap dark:text-white">
                  {data?.id}
                </th>
                <td className="px-6 py-4 text-base">{moment(data?.created_date).format("LL")}</td>
                <td className="px-6 py-4 font-medium text-base text-gray-900">{data?.resi}</td>
                <td className="px-6 py-4 font-medium text-base text-gray-900">{data?.courier.toUpperCase()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 ${checkStatusOrderTextColor(data?.status_order)} rounded-[10px] ${checkStatusOrderBgColor(data?.status_order)}`}>{checkStatusOrder(data?.status_order)}</span>
                </td>
                {/* <td className="px-6 py-4">
                  <Icon icon="material-symbols:edit-square-outline-rounded" width={25} className="text-[#624DE3]" />
                </td> */}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableSectionAdmin;
