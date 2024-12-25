"use client";

import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export function RazorpayCheckout({ amount }) {
  const { data: session } = useSession();

  const handlePayment = async () => {
    if (!session) {
      toast.error(
        "Authentication is required. Please sign in to your account."
      );
      return;
    }

    try {
      // Determine credits based on amount
      let credits = 0;
      if (amount === 500) credits = 25;
      else if (amount === 1000) credits = 60;
      else {
        toast.error("Invalid amount.");
        return;
      }

      // Step 1: Create order on the backend
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to smallest currency unit
          email: session.user.email,
          credits,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Order creation failed.");
      }

      const order = await res.json();

      // Step 2: Load Razorpay script dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const options = {
          key: process.env.RAZORPAY_KEY_ID,
          order_id: order.id,
          handler: async (response) => {
            try {
              // Step 3: Verify the payment on the backend
              const verifyRes = await fetch("/api/verifyOrder", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  email: session.user.email,
                  amount,
                  credits,
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyData.isOk) {
                toast.success("Payment successful! Credits have been added.");
              } else {
                toast.error("Payment verification failed.");
              }
            } catch (error) {
              console.error("Verification error:", error);
              toast.error("Payment verification failed.");
            }
          },
          prefill: {
            name: session.user.name || "Guest",
            email: session.user.email,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error(error.message || "An error occurred during payment.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      Pay ₹{amount}
    </button>
  );
}
