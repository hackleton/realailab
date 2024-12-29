"use client";
import DropDown from "../../../components/DropDown";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { themes, rooms } from "../../../utils/dropdownTypes";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import LoadingDots from "../../../components/LoadingDots";
import Toggle from "../../../components/Toggle";
import { CompareSlider } from "../../../components/CompareSider";
import downloadPhoto from "../../../utils/downloadPhoto";
import appendNewToName from "../../../utils/appendNewToName";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import Link from "next/link";

const options = {
  apiKey: "public_W142iv2DB2unDjkz9qPpfufWj4Z9", // This is your API key.
  maxFileCount: 1,
  showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
  styles: {
    colors: {
      primary: "#111", // Primary buttons & links
      error: "#d23f4d", // Error messages
      shade100: "#111", // Standard text
      shade200: "red", // Secondary button text
      shade400: "#111", // Welcome text
    },
  },
};

const GenerateRoom = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [theme, setTheme] = useState("Modern");
  const [room, setRoom] = useState("Living Room");
  const [originalPhoto, setOriginalPhoto] = useState(null);
  const [generatedPhoto, setGeneratedPhoto] = useState(null);
  const [photoName, setPhotoName] = useState(null);
  const [generatedPhotoLoaded, setGeneratedPhotoLoaded] = useState(false);
  const [sideBySide, setSideBySide] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (typeof window === "undefined") return null;
  if (status === "unauthenticated") {
    router.push("/");
  }

  const handleDelete = () => {
    setOriginalPhoto(null);
    setGeneratedPhoto(null);
    setGeneratedPhotoLoaded(false);
    setPhotoName(null);
    setError(null);
  };

  const UploadDropZone = () => (
    <UploadDropzone
      options={options}
      onUpdate={({ uploadedFiles }) => {
        if (uploadedFiles.length !== 0) {
          setPhotoName(uploadedFiles[0].originalFile.originalFileName);
          setOriginalPhoto(uploadedFiles[0].fileUrl);
        }
      }}
      width="600px"
      height="375px"
    />
  );

  const handleGeneratePhoto = async (fileUrl) => {
    if (generatedPhotoLoaded) {
      handleDelete();
    } else {
      setLoading(true);
      const response = await fetch("/api/room/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: fileUrl,
          theme,
          room,
          photoName,
          userId: session?.user.id,
          email: session?.user.email,
        }),
      });
      let newPhoto = await response.json();
      if (response.status !== 200) {
        setError(response.statusText);
        toast.error(res.statusText);
      } else {
        setGeneratedPhoto(newPhoto[1]);
        router.refresh();
        update();
        // success message
        toast.success("Success!");
      }
      setLoading(false);
    }
  };

  if (session) {
    return (
      <div className="max-w-7xl mx-auto my-8 px-4 mt-20 flex flex-col items-center">
        <section className="text-center mb-10">
          <h1 className="font-bold text-black text-5xl">
            Generate your dream room
          </h1>
        </section>
        {!generatedPhoto && (
          <section className="w-full max-w-sm mx-auto mb-12">
            <div className="mb-10">
              <p className="text-base font-semibold mb-4">
                Choose your room theme.
              </p>
              <DropDown theme={theme} setTheme={setTheme} themes={themes} />
              {/* <select
     id="themes"
     className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
     value={theme}
     onChange={(e) => setTheme(e.target.value)}
   >
     {themes.map((t, index) => (
       <option key={index} value={t}>
         {t}
       </option>
     ))}
   </select> */}
            </div>
            <div className="mb-10">
              <p className="text-base font-semibold mb-4">
                Choose your room type.
              </p>
              <DropDown theme={room} setTheme={setRoom} themes={rooms} />
            </div>
            {session?.user.credits > 0 && (
              <div className="mt-8">
                <p className="text-center font-meidum">
                  Upload a picture of your room.
                </p>
              </div>
            )}
            {!(session?.user.credits > 0) && (
              <div className="mt-8">
                <div className="text-center font-meidum">
                  Insufficient Credits.{" "}
                  <Link
                    className="relative font-bold w-fit inline-block after:block after:content-[''] 
                    after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                    href="/pricing"
                  >
                    Buy more
                  </Link>
                </div>
              </div>
            )}
          </section>
        )}

        {generatedPhoto && (
          <div>
            Here's your remodeled <b>{room.toLowerCase()}</b> in the{" "}
            <b>{theme.toLowerCase()}</b> theme!
          </div>
        )}
        <div
          className={`${
            generatedPhotoLoaded
              ? "visible mt-6 mb-2 md:mb-0 -ml-8"
              : "invisible"
          }`}
        >
          <Toggle
            className={`${generatedPhotoLoaded ? "visible mb-6" : "invisible"}`}
            sideBySide={sideBySide}
            setSideBySide={(newVal) => setSideBySide(newVal)}
          />
        </div>
        {generatedPhotoLoaded && sideBySide && (
          <CompareSlider
            original={originalPhoto}
            generatedPhoto={generatedPhoto}
          />
        )}
        {!originalPhoto && session?.user.credits > 0 && <UploadDropZone />}
        {originalPhoto && !generatedPhoto && (
          <div className="relative">
            <Image
              alt="original photo"
              src={originalPhoto}
              className="rounded-2xl h-96"
              width={475}
              height={475}
            />
            <button
              onClick={() => handleDelete()}
              className="absolute top-0 right-0 p-2 m-2 text-white bg-black"
            >
              <FaTrashAlt className="w-4 h-4 hover:scale-125 duration-300" />
            </button>
          </div>
        )}
        {generatedPhoto && originalPhoto && !sideBySide && (
          <div className="flex sm:space-x-4 sm:flex-row flex-col text-center">
            <div>
              <h2 className="mb-5 font-medium text-lg">Original Room</h2>
              <Image
                alt="original photo"
                src={originalPhoto}
                className="rounded-2xl h-96"
                width={475}
                height={475}
              />
            </div>
            <div className="sm:mt-0 mt-8">
              <h2 className="mb-5 font-medium text-lg">Generated Room</h2>
              <Image
                alt="generated photo"
                src={generatedPhoto}
                className="rounded-2xl h-96"
                width={475}
                height={475}
                onLoadingComplete={() => setGeneratedPhotoLoaded(true)}
              />
            </div>
          </div>
        )}
        {loading && (
          <button
            disabled
            className="bg-blue-500 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-4 w-40"
          >
            <span className="pt-4">
              <LoadingDots color="white" style="large" />
            </span>
          </button>
        )}
        <div className="flex space-x-2 justify-center">
          {originalPhoto && !loading && (
            <button
              onClick={() => {
                handleGeneratePhoto(originalPhoto);
              }}
              className="bg-blue-500 rounded-full text-white font-medium px-4 py-2 mt-8"
            >
              {!generatedPhotoLoaded && <span>Generate This Room</span>}
              {generatedPhotoLoaded && <span>Generate New Room</span>}
            </button>
          )}
          {generatedPhotoLoaded && (
            <button
              onClick={() => {
                saveAs(generatedPhoto, appendNewToName(photoName));
              }}
              className="bg-black rounded-full text-white font-medium px-4 py-2 mt-8"
            >
              Download Generated Room
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default GenerateRoom;
