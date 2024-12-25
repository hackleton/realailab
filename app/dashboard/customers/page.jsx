import Header from "../../../components/Header";
import React from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { getUsers } from "../../../utils/getDashboardData";
import { connectToDB } from "../../../utils/database";

const Customers = async () => {
  await connectToDB();
  const users = await getUsers();
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header title={"Customers"} />
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-betwwen cursor-pointer">
            <span>Name</span>
            <span className="sm:text-left text-right">Email</span>
            <span className="hidden md:grid">Credits</span>
            <span className="hidden sm:grid">Role</span>
          </div>
          <ul>
            {users.map((user, _id) => (
              <li
                key={_id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2
 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-gray-200 p-3 rounded-lg">
                    <BsPersonFill className="text-gray-700" />
                  </div>
                  <p className="pl-4">{user.username}</p>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  {user.email}
                </p>
                <p className="hidden md:flex">{user.credits}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{user.role}</p>
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

export default Customers;
