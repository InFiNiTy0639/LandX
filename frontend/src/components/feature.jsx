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
}) => {
  return (
    <div className="min-w-[300px] max-w-xs mx-2 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={image}
          alt="Luxury waterfront villa"
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300";
          }}
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
            Verified
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded-full text-sm font-medium text-gray-700">
            Off-Plan
          </span>
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100">
          <svg
            className="w-5 h-5 text-gray-600"
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
        {/* Image Counter */}
        {/* <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          1/12
        </span> */}
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{price}</h2>
        <div className="flex items-center space-x-4 mb-2 text-gray-600">
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6z" />
              <path d="M10 11a7 7 0 100-14 7 7 0 000 14z" />
            </svg>
            {beds} beds
          </span>
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0zm-5 3a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            {baths} baths
          </span>
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            {sqft} sqft
          </span>
        </div>
        <p className="text-gray-700 mb-4">{description}</p>
        <p className="text-gray-600 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-1 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a8 8 0 00-8 8c0 1.962.76 3.768 2 5.14V18a1 1 0 001 1h4a1 1 0 001-1v-2.86a8 8 0 006-7.14 8 8 0 00-8-8zm0 2a6 6 0 110 12 6 6 0 010-12z" />
          </svg>
          {location}
        </p>
      </div>
    </div>
  );
};

export function Feature() {
  const scrollContainerId = "scroll-container";

  const scroll = (direction) => {
    const container = document.getElementById(scrollContainerId);
    if (container) {
      const scrollAmount = 350;
      container.scrollLeft += direction * scrollAmount;
    } else {
      console.error("Scroll container not found");
    }
  };

  const listings = [
    {
      price: "AED 37,695,000",
      beds: 4,
      baths: 5,
      sqft: "7,898",
      description: "Sea View | Rixos Brand | Luxurious Waterfront",
      location: "Bay Residences, Dubai Islands, Dubai",
      image: "/images/b.jpg",
    },
    {
      price: "AED 42,500,000",
      beds: 5,
      baths: 6,
      sqft: "8,500",
      description: "Ocean View | Premium Villa | Private Beach",
      location: "Palm Jumeirah, Dubai",
      image: "/images/c.jpg",
    },
    {
      price: "AED 28,900,000",
      beds: 3,
      baths: 4,
      sqft: "6,200",
      description: "Marina View | Modern Design | Smart Home",
      location: "Dubai Marina, Dubai",
      image: "/images/d.jpg",
    },
    {
      price: "AED 28,900,000",
      beds: 3,
      baths: 4,
      sqft: "6,200",
      description: "Marina View | Modern Design | Smart Home",
      location: "Dubai Marina, Dubai",
      image: "/images/c.jpg",
    },
    {
      price: "AED 28,900,000",
      beds: 3,
      baths: 4,
      sqft: "6,200",
      description: "Marina View | Modern Design | Smart Home",
      location: "Dubai Marina, Dubai",
      image: "/images/b.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">
        Featured Listings
      </h1>
      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          aria-label="Scroll left"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          id={scrollContainerId}
          className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {listings.map((listing, index) => (
            <RealEstateCard key={index} {...listing} />
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          aria-label="Scroll right"
        >
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
