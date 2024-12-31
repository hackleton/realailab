"use client";

import { useSession } from "next-auth/react";
import React from "react";
import PricingCard from "../../../components/PricingCard.jsx";
import { handlePayment } from "./checkout.jsx";
     

const pricingPlans = [
  {
    title: "Standard Plan",
    price: 500,
    credits: 25,
    description: "20 Credits",
    features: [
      "Individual configuration",
      "No setup, or hidden fees",
      "Premium support: 6 months",
      "Free updates: 6 months",
    ],
  },
  {
    title: "Professional Plan",
    price: 1000,
    credits: 60,
    description: "50 Credits",
    features: [
      "Individual configuration",
      "No setup, or hidden fees",
      "Premium support: 24 months",
      "Free updates: 24 months",
    ],
  },
  {
    title: "Enterprise Plan",
    price: 2000,
    credits: 100,
    description: "100 Credits",
    features: [
      "Individual configuration",
      "No setup, or hidden fees",
      "Premium support: 36 months",
      "Free updates: 36 months",
    ],
  }
];

const HomePage = () => {
  const { data: session } = useSession();
  return (
    <>
     <div className="max-w-screen-xl py-12 sm:py-18 md:py-24 lg:px-6 px-4 mx-auto">
     <div className="max-w-screen-md text-center lg:mb-16 mx-auto">
       <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
         Buy Credits
       </h2>
       <p className="mb-5 font-light text-gray-500 sm:text-xl">
         {session && <span>You have {session.user.credits} credits. </span>}
         Join thousands of happy customers by buying more below.
       </p>
     </div>
     </div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-center mb-8">Choose a Pricing Plan</h1>
      <div className="grid gap-8 md:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            credits={plan.credits}
            description={plan.description}
            features={plan.features}
            handlePayment={handlePayment}
            session={session}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default HomePage;
