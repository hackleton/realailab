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
    <div>
    <button
      onClick={handlePayment}
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      Pay ₹{amount}
    </button>
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
     <div className="lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10">
       <div className="mt-8 flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 rounded-lg border border-gray-100 shadow-lg xl:p-8">
         <h3 className="mb-4 text-2xl font-semibold">
           Credits
         </h3>
         <p className="font-light text-gray-500 sm:text-lg">
           gd
         </p>
         <span className="mr-2 text-5xl font-extrabold my-8">
           dg
         </span>
         <ul className="mb-8 space-y-4 text-left">
           <li className="flex items-center space-x-3">
             <svg
               className="flex-shrink-0 w-5 h-5 text-green-500 "
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                 clipRule="evenodd"
               ></path>
             </svg>
             <span>Individual configuration</span>
           </li>
           <li className="flex items-center space-x-3">
             <svg
               className="flex-shrink-0 w-5 h-5 text-green-500 "
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                 clipRule="evenodd"
               ></path>
             </svg>
             <span>No setup, or hidden fees</span>
           </li>

           <li className="flex items-center space-x-3">
             <svg
               className="flex-shrink-0 w-5 h-5 text-green-500 "
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                 clipRule="evenodd"
               ></path>
             </svg>
             <span>
               Premium support: <span className="font-semibold">6 months</span>
             </span>
           </li>
           <li className="flex items-center space-x-3">
             <svg
               className="flex-shrink-0 w-5 h-5 text-green-500 "
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                 clipRule="evenodd"
               ></path>
             </svg>
             <span>
               Free updates: <span className="font-semibold">6 months</span>
             </span>
           </li>
         </ul>
         <button
           
           className="text-white black_btn font-medium rounded-lg text-sm px-5 py-2.5 text-center"
         >
           Pay
         </button>
       </div>

       <div className="mt-8 flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 rounded-lg border border-gray-100 shadow-lg xl:p-8">
         <h3 className="mb-4 text-2xl font-semibold">
           Credits
         </h3>
         <p className="font-light text-gray-500 sm:text-lg">
           5f
         </p>
         <span className="mr-2 text-5xl font-extrabold my-8">
           gfh
         </span>
         <ul className="mb-8 space-y-4 text-left">
           <li className="flex items-center space-x-3">
             <svg
               className="flex-shrink-0 w-5 h-5 text-green-500 "
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                 clipRule="evenodd"
               ></path>
             </svg>
             <span>Individual configuration</span>
           </li>
           <li className="flex items-center space-x-3">
             <svg
               className="flex-shrink-0 w-5 h-5 text-green-500 "
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                 clipRule="evenodd"
               ></path>
             </svg>
             <span>No setup, or hidden fees</span>
           </li>

           <li className="flex items-center space-x-3">
             <svg
               className="flex-shrink-0 w-5 h-5 text-green-500 "
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                 clipRule="evenodd"
               ></path>
             </svg>
             <span>
               Premium support:{" "}
               <span className="font-semibold">24 months</span>
             </span>
           </li>
           <li className="flex items-center space-x-3">
             <svg
               className="flex-shrink-0 w-5 h-5 text-green-500 "
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                 clipRule="evenodd"
               ></path>
             </svg>
             <span>
               Free updates: <span className="font-semibold">24 months</span>
             </span>
           </li>
         </ul>
         <button
           
           className="text-white black_btn font-medium rounded-lg text-sm px-5 py-2.5 text-center"
         >
           Pay
         </button>
       </div>
       <div className="mt-8 flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 rounded-lg border border-gray-100 shadow-lg xl:p-8">
         <h3 className="mb-4 text-2xl font-semibold">
           Credits
         </h3>
         <p className="font-light text-gray-500 sm:text-lg">
           dfs
         </p>
         <span className="mr-2 text-5xl font-extrabold my-8">
           85
         </span>
         <ul className="mb-8 space-y-4 text-left">
           <li className="flex items-center space-x-3">
             <svg
               className="flex-shrink-0 w-5 h-5 text-green-500 "
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                 clipRule="evenodd"
               ></path>
             </svg>
             <span>Individual configuration</span>
           </li>
           <li className="flex items-center space-x-3">
             <svg
               className="flex-shrink-0 w-5 h-5 text-green-500 "
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                 clipRule="evenodd"
               ></path>
             </svg>
             <span>No setup, or hidden fees</span>
           </li>

           <li className="flex items-center space-x-3">
             <svg
               className="flex-shrink-0 w-5 h-5 text-green-500 "
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                 clipRule="evenodd"
               ></path>
             </svg>
             <span>
               Premium support:{" "}
               <span className="font-semibold">36 months</span>
             </span>
           </li>
           <li className="flex items-center space-x-3">
             <svg
               className="flex-shrink-0 w-5 h-5 text-green-500 "
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 fillRule="evenodd"
                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                 clipRule="evenodd"
               ></path>
             </svg>
             <span>
               Free updates: <span className="font-semibold">36 months</span>
             </span>
           </li>
         </ul>
         <button
           
           className="text-white black_btn font-medium rounded-lg text-sm px-5 py-2.5 text-center"
         >
           Pay
         </button>
       </div>
     </div>
   </div>
   </div>
  );
}
