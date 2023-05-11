import React from "react";

const RowDataAdmin = () => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        #001
      </th>
      <td className="px-6 py-4 ">Apr 23, 2023</td>
      <td className="px-6 py-4 font-medium text-gray-900">Laptop</td>
      <td className="px-6 py-4 font-medium text-gray-900">JNE</td>
      <td className="px-6 py-4">
        <span className="border border-slate-300 px-3 py-1 font-medium text-[#03543F] rounded-[10px] bg-[#DEF7EC] ">Completed</span>
      </td>
    </tr>
  );
};

export default RowDataAdmin;
