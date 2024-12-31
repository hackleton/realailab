"use client";

import toast from "react-hot-toast";
export const handlePayment = async (amount, credits,session) => {
  if (!session) {
    toast.error("Authentication is required. Please sign in to your account.");
    return;
  }

  try {
    // Step 1: Create order on the backend
    const res = await fetch("/api/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to smallest currency unit (paise)
        email: session.user.email,
        credits,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Order creation failed.");
    }

    const order = await res.json();

    // Step 2: Dynamically load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Your Razorpay key
        order_id: order.id, // Order ID from backend
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

      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  } catch (error) {
    console.error("Payment initiation error:", error);
    toast.error(error.message || "An error occurred during payment.");
  }
};



