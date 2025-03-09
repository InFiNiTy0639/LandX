"use client";
import React from "react";

const RealEstateCard = ({
  price,
  beds,
  baths,
  sqft,
  description,
  location,
  image,
  rentPlans,
}) => {
  return (
    <div className="min-w-[400px] max-w-[450px] mx-2 bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="relative">
        <img
          src={image}
          alt="Property Image"
          className="w-full h-72 object-cover transition-opacity duration-300 hover:opacity-90"
          onError={(e) => {
            e.target.src = "";
          }}
        />
        <div className="absolute top-4 left-4 flex space-x-3">
          <span className="bg-gradient-to-r from-green-100 to-green-200 px-3 py-1 rounded-full text-sm font-medium text-gray-800 shadow-md">
            Listed for rent
          </span>
          <span className="bg-gray-50 px-3 py-1 rounded-full text-sm font-medium text-gray-600 shadow-md">
            Listed on | Mar 01, 2025
          </span>
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {price}
        </h2>
        <div className="flex items-center space-x-6 mb-4 text-gray-700">
          <span className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6z" />
              <path d="M10 11a7 7 0 100-14 7 7 0 000 14z" />
            </svg>
            <span className="text-lg">{beds} beds</span>
          </span>
          <span className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0zm-5 3a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            <span className="text-lg">{baths} baths</span>
          </span>
          <span className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <span className="text-lg">{sqft} sqft</span>
          </span>
        </div>
        <p className="text-gray-600 mb-4 text-lg leading-relaxed">{description}</p>
        <p className="text-gray-700 mb-4 flex items-center text-lg">
          <svg
            className="w-6 h-6 mr-2 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a8 8 0 00-8 8c0 1.962.76 3.768 2 5.14V18a1 1 0 001 1h4a1 1 0 001-1v-2.86a8 8 0 006-7.14 8 8 0 00-8-8zm0 2a6 6 0 110 12 6 6 0 010-12z" />
          </svg>
          {location}
        </p>
        <div className="mb-6 bg-gray-50 p-4 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Available Rent Plans:</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200">
              <span className="text-gray-700 font-medium">1 cheque</span>
              <span className="text-gray-600">| AED 50,000 | Annual Contract</span>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200">
              <span className="text-gray-700 font-medium">4 cheque</span>
              <span className="text-gray-600">| AED 60,000 | Annual Contract</span>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200">
              <span className="text-gray-700 font-medium">6/12 cheque</span>
              <span className="text-gray-600">| AED 5,000 | Month-to-Month Contract</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-1 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-md hover:from-cyan-700 hover:to-cyan-600 transition-all duration-200">
            View
          </button>
          <button className="px-4 py-1 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-md hover:from-cyan-700 hover:to-cyan-600 transition-all duration-200">
            Edit
          </button>
          <button className="px-4 py-1 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-md hover:from-cyan-700 hover:to-cyan-600 transition-all duration-200">
            Manage Lease
          </button>
          <button className="px-4 py-1 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-md hover:from-cyan-700 hover:to-cyan-600 transition-all duration-200">
            Manage Rent Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export function Feature() {
  const scrollContainerId = "scroll-container";

  const scroll = (direction) => {
    const container = document.getElementById(scrollContainerId);
    if (container) {
      const scrollAmount = 450;
      container.scrollLeft += direction * scrollAmount;
    } else {
      console.error("Scroll container not found");
    }
  };

  const listings = [
    {
      price: "AED 50,000 Yearly",
      beds: 2,
      baths: 3,
      sqft: "980",
      description: "Apartment | High floor | Furnished | New Construction",
      location: "Azizi Rivera 27, Al Merkadh, Meydan Rd, Dubai, UAE",
      image: "/images/b.jpg",
      rentPlans: [
        { cheques: "1 cheque", amount: "AED 50,000", type: "Annual Contract" },
        { cheques: "4 cheque", amount: "AED 60,000", type: "Annual Contract" },
        { cheques: "6/12 cheque", amount: "AED 5,000", type: "Month-to-Month Contract" },
      ],
    },
    {
      price: "AED 50,000 Yearly",
      beds: 2,
      baths: 3,
      sqft: "980",
      description: "Apartment | High floor | Furnished | New Construction",
      location: "Azizi Rivera 27, Al Merkadh, Meydan Rd, Dubai, UAE",
      image: "/images/c.jpg",
      rentPlans: [
        { cheques: "1 cheque", amount: "AED 50,000", type: "Annual Contract" },
        { cheques: "4 cheque", amount: "AED 60,000", type: "Annual Contract" },
        { cheques: "6/12 cheque", amount: "AED 5,000", type: "Month-to-Month Contract" },
      ],
    },
    {
      price: "AED 50,000 Yearly",
      beds: 2,
      baths: 3,
      sqft: "980",
      description: "Apartment | High floor | Furnished | New Construction",
      location: "Azizi Rivera 27, Al Merkadh, Meydan Rd, Dubai, UAE",
      image: "/images/d.jpg",
      rentPlans: [
        { cheques: "1 cheque", amount: "AED 50,000", type: "Annual Contract" },
        { cheques: "4 cheque", amount: "AED 60,000", type: "Annual Contract" },
        { cheques: "6/12 cheque", amount: "AED 5,000", type: "Month-to-Month Contract" },
      ],
    },
    {
      price: "AED 50,000 Yearly",
      beds: 2,
      baths: 3,
      sqft: "980",
      description: "Apartment | High floor | Furnished | New Construction",
      location: "Azizi Rivera 27, Al Merkadh, Meydan Rd, Dubai, UAE",
      image: "/images/b.jpg",
      rentPlans: [
        { cheques: "1 cheque", amount: "AED 50,000", type: "Annual Contract" },
        { cheques: "4 cheque", amount: "AED 60,000", type: "Annual Contract" },
        { cheques: "6/12 cheque", amount: "AED 5,000", type: "Month-to-Month Contract" },
      ],
    },
    {
      price: "AED 50,000 Yearly",
      beds: 2,
      baths: 3,
      sqft: "980",
      description: "Apartment | High floor | Furnished | New Construction",
      location: "Azizi Rivera 27, Al Merkadh, Meydan Rd, Dubai, UAE",
      image: "/images/c.jpg",
      rentPlans: [
        { cheques: "1 cheque", amount: "AED 50,000", type: "Annual Contract" },
        { cheques: "4 cheque", amount: "AED 60,000", type: "Annual Contract" },
        { cheques: "6/12 cheque", amount: "AED 5,000", type: "Month-to-Month Contract" },
      ],
    },
    {
      price: "AED 50,000 Yearly",
      beds: 2,
      baths: 3,
      sqft: "980",
      description: "Apartment | High floor | Furnished | New Construction",
      location: "Azizi Rivera 27, Al Merkadh, Meydan Rd, Dubai, UAE",
      image: "/images/d.jpg",
      rentPlans: [
        { cheques: "1 cheque", amount: "AED 50,000", type: "Annual Contract" },
        { cheques: "4 cheque", amount: "AED 60,000", type: "Annual Contract" },
        { cheques: "6/12 cheque", amount: "AED 5,000", type: "Month-to-Month Contract" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 bg-black">
      <h1 className="text-4xl font-extrabold mb-8 text-white text-center bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text">
        Featured Listings
      </h1>
      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 transition-all duration-200"
          aria-label="Scroll left"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          id={scrollContainerId}
          className="flex overflow-x-auto scrollbar-hide space-x-6 pb-6"
          style={{ scrollBehavior: "smooth" }}
        >
          {listings.map((listing, index) => (
            <RealEstateCard key={index} {...listing} />
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 transition-all duration-200"
          aria-label="Scroll right"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}