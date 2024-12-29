import { UploadDropzone } from "@bytescale/upload-widget-react";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";

const uploadOptions = {
  apiKey: "public_W142iv2DB2unDjkz9qPpfufWj4Z9",
  maxFileCount: 1,
  showFinishButton: true,
  styles: {
    colors: {
      primary: "#111",
      error: "#d23f4d",
      shade100: "#111",
      shade200: "red",
      shade400: "#111",
    },
  },
};

export const PhotoUploader = ({
  originalPhoto,
  onPhotoUpload,
  onDelete,
  hasCredits,
}) => {
  if (!hasCredits) return null;

  if (!originalPhoto) {
    return (
      <UploadDropzone
        options={uploadOptions}
        onUpdate={({ uploadedFiles }) => {
          if (uploadedFiles.length !== 0) {
            onPhotoUpload(uploadedFiles[0]);
          }
        }}
        width="600px"
        height="375px"
      />
    );
  }

  return (
    <div className="relative">
      <Image
        alt="original photo"
        src={originalPhoto}
        className="rounded-2xl h-96"
        width={475}
        height={475}
      />
      <button
        onClick={onDelete}
        className="absolute top-0 right-0 p-2 m-2 text-white bg-black"
      >
        <FaTrashAlt className="w-4 h-4 hover:scale-125 duration-300" />
      </button>
    </div>
  );
};
