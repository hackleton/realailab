import React from "react";
import {
  getTotalRevenue,
  getTotalOrders,
  getTotalUsers,
} from "../utils/getDashboardData";

const DashboardCard = async () => {
  const totalRevenue = await getTotalRevenue();
  const totalOrders = await getTotalOrders();
  const totalUsers = await getTotalUsers();

  return (
    <div className="grid lg:grid-cols-6 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className=" font-semibold">Total Revenue</p>
          <p className="text-2xl font-extrabold">${totalRevenue}</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+30%</span>
        </p>
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className=" font-semibold">Orders</p>
          <p className="text-2xl font-extrabold">{totalOrders}</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+90%</span>
        </p>
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className=" font-semibold">Customers</p>
          <p className="text-2xl font-extrabold">{totalUsers}</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+12%</span>
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
