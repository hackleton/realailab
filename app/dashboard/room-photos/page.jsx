import React from "react";
import Header from "../../../components/Header";
import { getRoomPhotos } from "../../../utils/getDashboardData";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const RoomPhotos = async () => {
  const roomPhotos = await getRoomPhotos();
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header title={"Room Photos"} />
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-betwwen cursor-pointer">
            <span className="hidden md:grid">Customer</span>
            <span className="hidden sm:grid sm:text-left text-right">
              Photo Name
            </span>
            <span className="">Original Photo</span>
            <span className="">Generated Photo</span>
          </div>
          <ul>
            {roomPhotos.map((room, _id) => (
              <li
                key={_id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2
     items-center justify-between cursor-pointer"
              >
                <div className="hidden md:flex items-center">
                  <div className="bg-gray-200 p-3 rounded-lg">
                    <BsPersonFill className="text-gray-700" />
                  </div>
                  <p className="pl-4">{room.creator.username}</p>
                </div>
                <p className="hidden sm:flex text-gray-600 sm:text-left text-right">
                  {room.name}
                </p>
                <p className=" md:flex">
                  <Link href={room.original_photo} target="_blank">
                    <Image
                      alt="original photo"
                      src={room.original_photo}
                      className="h-12"
                      width={48}
                      height={48}
                    />
                  </Link>
                </p>
                <div className="sm:flex justify-between items-center">
                  <p>
                    <Link href={room.generated_photo} target="_blank">
                      <Image
                        alt="generated photo"
                        src={room.generated_photo}
                        className="h-12"
                        width={48}
                        height={48}
                      />
                    </Link>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomPhotos;
