"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

const services = [
  { title: "Home redesign", href: "#" },
  { title: "Interior detailing", href: "#" },
  { title: "Furniture layout", href: "#" },
  { title: "Exterior finish selections", href: "#" },
  { title: "Color and paint selection", href: "#" },
];

export default function Services() {
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

    const elements = containerRef.current?.children;
    if (elements) {
      Array.from(elements).forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div ref={containerRef}>
          {services.map((service, index) => (
            <div
              key={service.title}
              className="service-item group flex items-center justify-between"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl sm:text-3xl font-light">{service.title}</h3>
              <ChevronRight className="w-6 h-6 text-[#FF5722] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}