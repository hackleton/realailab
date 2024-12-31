"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function StartProject() {
  const { data: session } = useSession();
    const router = useRouter();
    
    const handleClick = () => {
      if (session?.user) {
        router.push("/generate");
      } else {
        // Directly trigger Google sign-in
        signIn("google", { callbackUrl: "/generate" });
      }
    }
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
            alt="Start your project"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-8">
                Start project
              </h2>
              <button
            type="button"
            className="inline-block bg-[#FF5722] text-white px-8 py-4 rounded-full hover:bg-[#F4511E] transition-colors"
            onClick={handleClick}
          >
          Start for free
          </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}