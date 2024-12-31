import { Play } from "lucide-react";
"use client";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
export default function VideoSection() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const handleClick = () => {
    if (session?.user) {
      router.push("/generate");
    } else {
      // Directly trigger Google sign-in
      signIn("google", { callbackUrl: "/generate" });
    }}
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
            Transform any room with just one photo
            </h2>
            <p className="text-gray-600 mb-8">
              We provide comfort and style to your space in 20 seconds, create a space that reflects who you are.
            </p>
            <button
            type="button"
            className="inline-block bg-[#FF5722] text-white px-8 py-4 rounded-full hover:bg-[#F4511E] transition-colors"
            onClick={handleClick}
          >
          Try now
          </button>
          </div>
          
          <div className="relative aspect-video">
          <video
            className="rounded-lg"
            loop={true}
            autoPlay={true}
            muted
            controls
          >
            {" "}
            <source src="/hero-video.mp4" />
          </video>
          </div>
        </div>
      </div>
    </section>
  );
}