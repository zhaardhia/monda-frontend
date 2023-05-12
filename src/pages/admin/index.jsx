import LayoutAdmin from "@/components/LayoutAdmin";
import { Icon } from "@iconify/react";
import React from "react";
import ReactEcharts from "echarts-for-react";

const AdminIndex = () => {
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "line",
      },
    ],
  };
  return (
    <LayoutAdmin>
      <div className="w-full pr-2">
        <div className="my-7">
          <h1 className="text-xl font-bold mb-6">Welcome Back, Admin!</h1>
          <div className="border border-slate-200 p-4 rounded-xl">
            <div className="flex items-end">
              <h1 className="font-semibold text-2xl mr-1">Sales</h1>
              <Icon icon="ph:currency-circle-dollar" width={25} color="#408747" />
            </div>
            <span className="text-[#71717A]">cek hasil pendapatanmu bulan ini</span>
            <div>
              <ReactEcharts option={option} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 my-10">
            {/* Customer Section */}
            <div className="border border-slate-200 rounded-lg pt-4 pb-2 px-4">
              <span className="font-semibold text-lg">Customer Terbaru</span>
              <div className="mt-3 pr-2">
                {/* one profile */}
                <div className="flex px-2 border-b-2 pb-2 my-3 ">
                  <img src="ikanroa_aboutus.png" alt="" className="w-14" />
                  <div className="flex justify-between w-full">
                    <div className="mr-10 ms-3">
                      <h1 className="font-bold text-lg">Ishaq Matanggwan Wisnu</h1>
                      <h2 className="font-semibold text-[#88847E]">sihaqmatanggwan@cmail.com</h2>
                    </div>
                    <h1 className="flex items-center font-bold text-xl">Rp 50K</h1>
                  </div>
                </div>
                <div className="flex px-2 border-b-2 pb-2 my-3">
                  <img src="ikanroa_aboutus.png" alt="" className="w-14" />
                  <div className="flex justify-between w-full">
                    <div className="mr-10 ms-3">
                      <h1 className="font-bold text-lg">Tri Kusumo Apri</h1>
                      <h2 className="font-semibold text-[#88847E]">Ghalywa@ymail.com</h2>
                    </div>
                    <h1 className="flex items-center font-bold text-xl">Rp 125K</h1>
                  </div>
                </div>
                <div className="flex px-2 border-b-2 pb-2 my-3">
                  <img src="ikanroa_aboutus.png" alt="" className="w-14" />
                  <div className="flex justify-between w-full">
                    <div className="mr-10 ms-3">
                      <h1 className="font-bold text-lg">Ghaly Wisnu</h1>
                      <h2 className="font-semibold text-[#88847E]">Ghalywa@ymail.com</h2>
                    </div>
                    <h1 className="flex items-center font-bold text-xl">Rp 125K</h1>
                  </div>
                </div>
              </div>
            </div>
            {/* Product Fav Section */}
            <div className="border border-slate-200 rounded-lg pt-4 pb-2 px-4">
              <span className="font-semibold text-lg">Produk Favorit</span>
              <div className="mt-3 pr-2">
                {/* Produk Favorit */}
                <div className="flex px-2 border-b-2 pb-2 my-3 ">
                  <img src="ikanroa_aboutus.png" alt="" className="w-14" />
                  <div className="flex justify-between w-full">
                    <div className="mr-10 ms-3">
                      <h1 className="font-bold text-lg">Nasi Kuning Monda</h1>
                      <h2 className="font-semibold text-[#88847E]">2 terjual</h2>
                    </div>
                    <h1 className="flex items-center font-bold text-xl">Rp 55K</h1>
                  </div>
                </div>
                <div className="flex px-2 border-b-2 pb-2 my-3">
                  <img src="ikanroa_aboutus.png" alt="" className="w-14" />
                  <div className="flex justify-between w-full">
                    <div className="mr-10 ms-3">
                      <h1 className="font-bold text-lg">Kebab Ala Monda </h1>
                      <h2 className="font-semibold text-[#88847E]">1 Terjual</h2>
                    </div>
                    <h1 className="flex items-center font-bold text-xl">Rp 70K</h1>
                  </div>
                </div>
                <div className="flex px-2 border-b-2 pb-2 my-3">
                  <img src="ikanroa_aboutus.png" alt="" className="w-14" />
                  <div className="flex justify-between w-full">
                    <div className="mr-10 ms-3">
                      <h1 className="font-bold text-lg">Sambal Roa Olahan</h1>
                      <h2 className="font-semibold text-[#88847E]">1 Terjual</h2>
                    </div>
                    <h1 className="flex items-center font-bold text-xl">Rp 30K</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Table Transaction Section */}
          <div className="p-3 border border-slate-300 rounded-xl">
            <div className="flex items-center">
              <h1 className="font-semibold text-2xl mr-2">Transactions</h1>
              <Icon icon="grommet-icons:transaction" width={23} color="#A96464" />
            </div>
            <span className="text-[#71717A] font-normal">Berikut list dari transaksi terakhir</span>
            {/* Table Section */}
            <div>
              <table className="w-full text-sm mt-3 text-left text-gray-500 dark:text-gray-400">
                <thead className="border-b-2 border-[#E5E7EB] text-sm text-[#6B7280] uppercase bg-[#F9FAFB] dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      TRANSACTION
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DATE & TIME
                    </th>
                    <th scope="col" className="px-6 py-3">
                      AMOUNT
                    </th>
                    <th scope="col" className="px-6 py-3 w-40">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="px-6 py-4 text-base text-gray-900 whitespace-nowrap dark:text-white">
                      <h1 className="font-normal">
                        Payment failed from <span className="font-bold">#087651</span>
                      </h1>
                    </th>
                    <td className="px-6 py-4 text-base">Apr 23, 2023</td>
                    <td className="px-6 py-4 font-medium text-gray-900 text-base">Rp50.000,00</td>
                    <td className="px-6 py-4">
                      <h1 className="px-3 py-1 text-[#9B1C1C] rounded-[10px] bg-[#FBD5D5] w-24 text-center">Cancelled</h1>
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="px-6 py-4 text-base text-gray-900 whitespace-nowrap dark:text-white">
                      <h1 className="font-normal">
                        Payment from <span className="font-bold">Ishaq</span>
                      </h1>
                    </th>
                    <td className="px-6 py-4 text-base">Apr 23, 2023</td>
                    <td className="px-6 py-4 font-medium text-gray-900 text-base">Rp50.000,00</td>
                    <td className="px-6 py-4">
                      <h1 className="px-3 py-1 text-[#03543F] rounded-[10px] bg-[#DEF7EC] w-24 text-center">Verified</h1>
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="px-6 py-4 text-base text-gray-900 whitespace-nowrap dark:text-white">
                      <h1 className="font-normal">
                        Payment refund to <span className="font-bold">#00910</span>
                      </h1>
                    </th>
                    <td className="px-6 py-4 text-base">Apr 23, 2023</td>
                    <td className="px-6 py-4 font-medium text-gray-900 text-base">Rp50.000,00</td>
                    <td className="px-6 py-4">
                      <h1 className="px-3 py-1 text-[#1E429F] rounded-[10px] bg-[#E1EFFE] w-24 text-center">In Progress</h1>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminIndex;
