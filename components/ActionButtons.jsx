import LoadingDots from "./LoadingDots";
import { saveAs } from "file-saver";
import appendNewToName from "../utils/appendNewToName.js";

export const ActionButtons = ({
  loading,
  originalPhoto,
  generatedPhotoLoaded,
  onGenerate,
  photoName,
  generatedPhoto,
}) => (
  <div className="flex space-x-2 justify-center">
    {loading ? (
      <button
        disabled
        className="bg-blue-500 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-4 w-40"
      >
        <span className="pt-4">
          <LoadingDots color="white" style="large" />
        </span>
      </button>
    ) : (
      <>
        {originalPhoto && (
          <button
            onClick={onGenerate}
            className="bg-blue-500 rounded-full text-white font-medium px-4 py-2 mt-8"
          >
            {generatedPhotoLoaded ? "Generate New Room" : "Generate This Room"}
          </button>
        )}
        {generatedPhotoLoaded && (
          <button
            onClick={() => saveAs(generatedPhoto, appendNewToName(photoName))}
            className="bg-black rounded-full text-white font-medium px-4 py-2 mt-8"
          >
            Download Generated Room
          </button>
        )}
      </>
    )}
  </div>
);
