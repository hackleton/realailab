import React from "react";

const PricingCard = ({ title, price, credits, description, features, handlePayment,session }) => {
  return (
    <div className="mt-8 flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 rounded-lg border border-gray-100 shadow-lg xl:p-8">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <p className="font-light text-gray-500 sm:text-lg">{description}</p>
      <span className="mr-2 text-5xl font-extrabold my-8">₹{price}</span>
      <ul className="mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-green-500"
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
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => handlePayment(price, credits,session)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Pay ₹{price}
      </button>
    </div>
  );
};

export default PricingCard;
