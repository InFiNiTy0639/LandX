"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Select from "react-select"; // For dropdowns
import { ImagesSlider } from "./ui/images-slider";
export function SearchBar() {
  const [location, setLocation] = useState("");
  const [buildingType, setBuildingType] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);

  // Options for dropdowns
  const buildingTypeOptions = [
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
  ];

  const bedroomOptions = [
    { value: "1", label: "1 Bedroom" },
    { value: "2", label: "2 Bedrooms" },
    { value: "3", label: "3 Bedrooms" },
    { value: "4+", label: "4+ Bedrooms" },
  ];

  const bathroomOptions = [
    { value: "1", label: "1 Bathroom" },
    { value: "2", label: "2 Bathrooms" },
    { value: "3", label: "3 Bathrooms" },
    { value: "4+", label: "4+ Bathrooms" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({
      location,
      buildingType: buildingType?.value,
      bedrooms: bedrooms?.value,
      bathrooms: bathrooms?.value,
    });
  };

  return (
    <div
      className="relative w-full h-[200px] bg-cover bg-center"
      style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>{" "}
      <div className="relative flex items-center justify-center h-full px-4">
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-5xl space-x-4 bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/10 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
        >
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 p-3 text-sm md:text-base bg-transparent border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-white"
          />
          <Select
            options={buildingTypeOptions}
            value={buildingType}
            onChange={setBuildingType}
            placeholder="Building Type"
            className="flex-1"
            classNamePrefix="react-select"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
                borderRadius: "0.75rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.4)",
                },
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused
                  ? "rgba(0, 120, 255, 0.1)"
                  : "transparent",
                color: state.isFocused ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor: "rgba(0, 120, 255, 0.1)",
                  color: "#fff",
                },
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "rgba(255, 255, 255, 0.6)",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#fff",
              }),
            }}
          />
          <Select
            options={bedroomOptions}
            value={bedrooms}
            onChange={setBedrooms}
            placeholder="Bedrooms"
            className="flex-1"
            classNamePrefix="react-select"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
                borderRadius: "0.75rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.4)",
                },
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused
                  ? "rgba(0, 120, 255, 0.1)"
                  : "transparent",
                color: state.isFocused ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor: "rgba(0, 120, 255, 0.1)",
                  color: "#fff",
                },
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "rgba(255, 255, 255, 0.6)",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#fff",
              }),
            }}
          />
          <Select
            options={bathroomOptions}
            value={bathrooms}
            onChange={setBathrooms}
            placeholder="Bathrooms"
            className="flex-1"
            classNamePrefix="react-select"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
                borderRadius: "0.75rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.4)",
                },
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused
                  ? "rgba(0, 120, 255, 0.1)"
                  : "transparent",
                color: state.isFocused ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor: "rgba(0, 120, 255, 0.1)",
                  color: "#fff",
                },
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "rgba(255, 255, 255, 0.6)",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#fff",
              }),
            }}
          />
          
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
export function ImagesSliderDemo() {
  const images = ["/images/b.jpg", "/images/c.jpg", "/images/d.jpg"];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Find Your Dream Home <br /> Sweet Home
        </motion.p>
        <SearchBar />
      </motion.div>
    </ImagesSlider>
  );
}
