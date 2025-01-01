"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { themes, rooms } from "../../../utils/dropdownTypes";
import toast from "react-hot-toast";
import { PhotoUploader } from "../../../components/PhotoUploader";
import { RoomSettings } from "../../../components/RoomSettings";
import { PhotoComparison } from "../../../components/PhotoComparison";
import { ActionButtons } from "../../../components/ActionButtons.jsx";

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

  const handlePhotoUpload = (uploadedFile) => {
    setPhotoName(uploadedFile.originalFile.originalFileName);
    setOriginalPhoto(uploadedFile.fileUrl);
  };

  const handleGeneratePhoto = async () => {
    if (generatedPhotoLoaded) {
      handleDelete();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/room/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: originalPhoto,
          theme,
          room,
          photoName,
          userId: session?.user.id,
          email: session?.user.email,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const newPhoto = await response.json();
      setGeneratedPhoto(newPhoto[1]);
      router.refresh();
      update();
      toast.success("Success!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div className="max-w-7xl mx-auto my-5 px-4 mt-20 flex flex-col items-center">
      <section className="text-center mb-5">
        <h1 className="font-bold text-black text-5xl">
          Generate your dream room
        </h1>
      </section>

      {!generatedPhoto && (
        <RoomSettings
          theme={theme}
          setTheme={setTheme}
          room={room}
          setRoom={setRoom}
          themes={themes}
          rooms={rooms}
          hasCredits={session?.user.credits > 0}
        />
      )}
      {!generatedPhoto && (
  <PhotoUploader
    originalPhoto={originalPhoto}
    onPhotoUpload={handlePhotoUpload}
    onDelete={handleDelete}
    hasCredits={session?.user.credits > 0}
  />
)}
      {generatedPhoto && (
        <div>
          Here's your remodeled <b>{room.toLowerCase()}</b> in the{" "}
          <b>{theme.toLowerCase()}</b> theme!
        </div>
      )}
     
      <PhotoComparison
        originalPhoto={originalPhoto}
        generatedPhoto={generatedPhoto}
        sideBySide={sideBySide}
        setSideBySide={setSideBySide}
        onLoadComplete={() => setGeneratedPhotoLoaded(true)}
      />

      <ActionButtons
        loading={loading}
        originalPhoto={originalPhoto}
        generatedPhotoLoaded={generatedPhotoLoaded}
        onGenerate={handleGeneratePhoto}
        photoName={photoName}
        generatedPhoto={generatedPhoto}
      />
    </div>
  );
};

export default GenerateRoom;
