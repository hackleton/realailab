"use client";

import { RazorpayCheckout } from "./checkout.jsx";
import { RAZOR_PAY_CREDIT_PRICING } from "../constants.js";
export default function Home() {
  return (
    <>
      {RAZOR_PAY_CREDIT_PRICING.map((pricing) => (
        <RazorpayCheckout key={pricing.id} amount={pricing.amount} />
      ))}
    </>
  );
}
