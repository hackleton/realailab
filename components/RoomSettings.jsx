import DropDown from "./DropDown";
import Link from "next/link";

export const RoomSettings = ({ theme, setTheme, room, setRoom, themes, rooms, hasCredits }) => (
  <section className="w-full max-w-sm mx-auto mb-12">
    <div className="mb-10">
      <p className="text-base font-semibold mb-4">Choose your room theme.</p>
      <DropDown theme={theme} setTheme={setTheme} themes={themes} />
    </div>
    <div className="mb-10">
      <p className="text-base font-semibold mb-4">Choose your room type.</p>
      <DropDown theme={room} setTheme={setRoom} themes={rooms} />
    </div>
    {hasCredits ? (
      <div className="mt-8">
        <p className="text-center font-meidum">Upload a picture of your room.</p>
      </div>
    ) : (
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
);