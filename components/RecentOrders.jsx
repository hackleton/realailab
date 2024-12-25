import React from "react";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { getRecentOrders } from "../utils/getDashboardData";

const RecentOrders = async () => {
  const recentOrders = await getRecentOrders();
  return (
    <div className="w-full relative md:col-span-1 lg:h-[70vh] h-[50vh] m-auto border rounded-lg bg-white pt-4 pb-8 overflow-auto">
      <h1 className="pl-4 pb-2 font-bold text-xl">Recent Orders</h1>
      <ul className="pl-4">
        {recentOrders.map((order, _id) => (
          <li
            key={_id}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
          >
            <div className="bg-gray-200 rounded-lg p-3">
              <BiSolidPurchaseTag className="text-gray-700" />
            </div>
            <div className="pl-4">
              <p className="text-gray-800 font-bold">${order.price}</p>
              <p className="text-gray-500 text-sm">{order.userId.username}</p>
            </div>
            <p className="lg:flex md:hidden absolute right-6 text-sm">
              {order.formattedDate}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;
