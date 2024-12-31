"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: "square" | "video" | "portrait";
}

export default function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  aspectRatio = "video",
}: ComparisonSliderProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  }[aspectRatio];

  useEffect(() => {
    if (!isResizing) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));
      
      requestAnimationFrame(() => setPosition(percentage));
    };

    const handleUp = () => setIsResizing(false);

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("touchmove", handleMove, { passive: true });
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchend", handleUp);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchend", handleUp);
    };
  }, [isResizing]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg ${aspectRatioClass} select-none`}
    >
      <Image
        src={afterImage}
        alt="After transformation"
        fill
        className="object-cover"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div
        className="absolute inset-0 transform-gpu"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt="Before transformation"
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div
        className="absolute inset-y-0 transform-gpu"
        style={{ left: `${position}%` }}
        onMouseDown={() => setIsResizing(true)}
        onTouchStart={() => setIsResizing(true)}
      >
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow-sm" />
        <div className="absolute top-1/2 -ml-4 -mt-4 h-8 w-8 rounded-full bg-white shadow-xl flex items-center justify-center cursor-ew-resize">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 text-white text-sm font-medium px-2 py-1 bg-black/50 rounded">
        {beforeLabel}
      </div>
      <div className="absolute bottom-4 right-4 text-white text-sm font-medium px-2 py-1 bg-black/50 rounded">
        {afterLabel}
      </div>
    </div>
  );
}