import Link from "next/link";
import React from "react";
import { RxDashboard, RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag, HiOutlinePhotograph } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
const Sidebar = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="/">
            <div className="flex justify-center items-center">
              <p className="font-bold text-xl text-black tracking-wide">AI</p>
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <Link href="/dashboard">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <RxDashboard size={20} />
            </div>
          </Link>
          <Link href="/dashboard/customers">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <RxPerson size={20} />
            </div>
          </Link>
          <Link href="/dashboard/orders">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <HiOutlineShoppingBag size={20} />
            </div>
          </Link>
          <Link href="/dashboard/room-photos">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <HiOutlinePhotograph size={20} />
            </div>
          </Link>
          <Link href="/dashboard/settings">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <FiSettings size={20} />
            </div>
          </Link>
        </div>
      </div>

      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
