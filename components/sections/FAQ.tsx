"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Dcrafty?",
    answer: "Dcrafty is an innovative AI-based platform designed for virtual staging, emptying furnished spaces, landscaping, redesigning furnished rooms & rendering exterior structures. It caters to a wide range of professionals including realtors, marketers, photographers, developers, and interior designers. The platform emphasizes swift, intuitive, and customizable makeovers at the lowest cost, providing a tool that requires no learning curve and delivers quick, photo-realistic design ideas."
  },
  {
    question: "How does Dcrafty work?",
    answer: "Dcrafty functions by allowing you to upload photos of your spaces and enter your design preferences. Based on this input, the platform's AI algorithms generate customized design ideas and visualizations."
  },
  {
    question: "Is Dcrafty free to use?",
    answer: "Yes, Dcrafty is free to use. It offers 5 free credits to every user. After the free credits are used up, users will have to switch to the paid plan. Dcrafty allows users to experience the full range of services initially for free."
  },
  {
    question: "Can I commercialize my images?",
    answer: "Yes, you can."
  },
  {
    question: "Is it possible to use Dcrafty on the phone during a visit?",
    answer: "Yes, since Dcrafty is an online service, you can use it from your phone and take photos directly from our mobile site."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-0"
            >
              <button
                className="w-full py-4 flex justify-between items-center text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="pb-4 text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}