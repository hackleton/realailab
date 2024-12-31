"use client";

import { useEffect, useRef } from "react";
import ComparisonSlider from "../ImageSlider/ComparisonSlider";

const transformations = [
  {
    title: "Renovation Transformation",
    before: "/assets/images/renovate before.webp",
    after: "/assets/images/renovate after.webp",
  },
  {
    title: "Furnish Transformation",
    before: "/assets/images/furnish before.webp",
    after: "/assets/images/furnish after.webp",
  },
  {
    title: "Renovation and Furinish Transformation",
    before: "/assets/images/renovate and furnish before.webp",
    after: "/assets/images/renovate and furnish after.webp",
  },
  {
    title: "Renovation and Furinish Transformation",
    before: "/assets/images/renovate and furnish before.webp",
    after: "/assets/images/renovate and furnish after.webp",
  }
];

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light mb-4">
            Before & After Transformations
          </h2>
          <p className="text-gray-500 text-lg">
            Witness the power of professional interior design
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {transformations.map((item, index) => (
            <div
              key={item.title}
              className="space-y-4 animate-on-scroll opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ComparisonSlider
                beforeImage={item.before}
                afterImage={item.after}
                aspectRatio="video"
              />
              <h3 className="text-xl font-medium text-center">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}