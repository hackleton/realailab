import Header from "../../../components/Header";
import React from "react";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getOrders } from "../../../utils/getDashboardData";

const Orders = async () => {
  const orders = await getOrders();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header title={"Orders"} />
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-betwwen cursor-pointer">
            <span>Order</span>
            <span className="sm:text-left text-right">Status</span>
            <span className="hidden md:grid">Last Order</span>
            <span className="hidden sm:grid">Method</span>
          </div>
          <ul>
            {orders.map((order, _id) => (
              <li
                key={_id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2
items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-gray-200 p-3 rounded-lg">
                    <BiSolidPurchaseTag className="text-gray-700" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold">${order.price}</p>
                    <p className="text-gray-800 text-sm">
                      {order.userId.username}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  <span className="bg-green-200 rounded-lg p-2">
                    {order.status}
                  </span>
                </p>
                <p className="hidden md:flex">{order.formattedDate}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{order.method}</p>
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Orders;
