import { CompareSlider } from "./CompareSider";
import Toggle from "./Toggle";
import Image from "next/image";

export const PhotoComparison = ({
  originalPhoto,
  generatedPhoto,
  sideBySide,
  setSideBySide,
  onLoadComplete,
}) => {
  if (!originalPhoto || !generatedPhoto) return null;

  if (sideBySide) {
    return (
      <>
      <div className="flex justify-center mb-6">
        <Toggle
          className="visible my-5"
          sideBySide={sideBySide}
          setSideBySide={setSideBySide}
        />
        </div>
        <CompareSlider
          original={originalPhoto}
          generatedPhoto={generatedPhoto}
        />
      </>
    );
  }

  return (
    <div>
      <div className="flex justify-center my-5">
    <Toggle
          className="visible mb-6"
          sideBySide={sideBySide}
          setSideBySide={setSideBySide}
        />
        </div>
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
          onLoadingComplete={onLoadComplete}
        />
      </div>
    </div>
    </div>
  );
};
