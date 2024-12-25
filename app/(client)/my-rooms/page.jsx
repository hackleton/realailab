"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidDownload } from "react-icons/bi";
import { saveAs } from "file-saver";

const MyRooms = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [myRooms, setMyRooms] = useState([]);

  if (typeof window === "undefined") return null;
  if (status === "unauthenticated") {
    router.push("/");
  }

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/rooms`);
      const data = await response.json();
      setMyRooms(data);
    };
    if (session?.user.id) fetchRooms();
  }, [session?.user.id]);

  if (session) {
    return (
      <div className="max-w-screen-xl mx-auto w-full">
        <h1 className="text-2xl md:text-3xl font-extrabold text-black text-center mt-8">
          My Rooms
        </h1>
        <div className="mt-4 px-4 py-4 max-w-screen-xl grid grid-cols-9 gap-4 w-full mx-auto">
          {myRooms.map((room) => (
            <>
              <div className="col-span-4 mt-4">
                <div className="h-64 sm:h-96 w-full aspect-video bg-gray-100 relative">
                  <Image
                    className="rounded-lg object-cover"
                    alt="photo"
                    src={room.original_photo}
                    fill
                  />
                </div>
              </div>
              <div className="col-span-1 mt-4">
                <div className="h-64 sm:h-96 w-full flex justify-center items-center">
                  <Image
                    alt="photo"
                    src="/assets/images/arrow.png"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <div className="col-span-4 mt-4">
                <div className="h-64 sm:h-96 w-full aspect-video bg-gray-100 relative">
                  <Image
                    className="rounded-lg object-cover"
                    alt="photo"
                    src={room.generated_photo}
                    fill
                  />
                  <button
                    onClick={() => {
                      saveAs(room.generated_photo);
                    }}
                    className="absolute top-0 right-0 p-2 m-2 text-white bg-black"
                  >
                    <BiSolidDownload className="w-4 h-4 hover:scale-125 duration-300" />
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    );
  }
};

export default MyRooms;
