"use client";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DynamicText from "../animations/DynamicText";
import { useEffect, useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = containerRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div ref={containerRef} className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <h1 className="hero-title font-bold animate-on-scroll opacity-0">
            Transform your{" "}
            <DynamicText />
          </h1>
          <p className="text-gray-600 text-lg animate-on-scroll opacity-0">
          Your personal AI interior designer
          </p>
          <div className="flex flex-wrap gap-4 animate-on-scroll opacity-0">
          <button
            type="button"
            className="inline-block bg-[#FF5722] text-white px-8 py-4 rounded-full hover:bg-[#F4511E] transition-colors"
            onClick={handleClick}
          >
          Start for free
          </button>
            {/* <Link
              href="#learn-more"
              className="flex items-center gap-2 text-gray-900 hover:text-[#FF5722] transition-colors group"
            >
              Learn More{" "}
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link> */}
          </div>
          
          <div className="grid grid-cols-3 gap-4 stagger-animation">
            {[
              "photo-1616486338812-3dadae4b4ace",
              "photo-1616137466211-f939a420be84",
              "photo-1519974719765-e6559eac2575"
            ].map((id) => (
              <div key={id} className="relative aspect-square overflow-hidden rounded-lg animate-scale-in">
                <Image
                  src={`https://images.unsplash.com/${id}`}
                  alt="Interior design sample"
                  fill
                  className="object-cover image-hover"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative aspect-square lg:aspect-auto lg:h-[600px] animate-on-scroll opacity-0">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
            alt="Modern interior design showcase"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}

