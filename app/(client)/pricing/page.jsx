"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [amount, setAmount] = useState(0);
  const { data: session } = useSession();
  const createOrder = async () => {
    if (!session) {
      toast.error(
        "Authentication is Required. You need to sign into your Account."
      );
    } 
    else {
      try {
        const email = session.user.email;
        let credits = 0;
        if (amount === 500) {
          credits = 25;
        } else if (amount === 1000) {
          credits = 60;
        } else {
          toast.error("Invalid amount.");
          return;
        }
        const res = await fetch("/api/createOrder", {
            method: "POST",
            body: JSON.stringify({ amount: amount * 100, email,credits }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Unknown error occurred.");
        }

        const data = await res.json();
        const paymentData = {
            key: process.env.RAZORPAY_KEY_ID,
            order_id: data.id,
            handler: async function (response) {
                try {
                    const res = await fetch("/api/verifyOrder", {
                        method: "POST",
                        body: JSON.stringify({
                            orderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            email,
                            amount,
                            credits,
                        }),
                    });

                    if (!res.ok) {
                        throw new Error("Failed to verify payment.");
                    }

                    const data = await res.json();
                    if (data.isOk) {
                        alert("Payment successful");
                    } else {
                        toast.error("Payment failed");
                    }
                } catch (error) {
                    console.error("Verification error:", error);
                    toast.error("Payment verification failed.");
                }
            },  
        };

        const payment = new window.Razorpay(paymentData);
        payment.open();
    } catch (error) {
        console.error("Order creation error:", error);
        toast.error(error.message || "Failed to create order.");
    }
  }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col gap-4">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

<button
    className="bg-green-500 text-white px-4 py-2 rounded-md"
    onClick={() => {
      setAmount(500); // Hardcode the amount value
      createOrder();
    }}
  >
    Pay ₹500
  </button>
  <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          setAmount(1000); // Hardcode the amount value
          createOrder();
        }}
      >
        Pay ₹1000
      </button>
    </div>
  );
}