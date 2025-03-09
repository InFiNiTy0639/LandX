"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiFileText,
  FiPackage,
  FiTrendingUp,
  FiLogOut,
  FiPlus,
} from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore } from "@/store/auth";
import { api } from "@/lib/api";

export default function OwnerPropertyCreate() {
  const [formData, setFormData] = useState({
    property_title: "",
    property_subtitle: "",
    property_description: "",
    property_type: "",
    property_address: "",
    property_city: "",
    property_state: "",
    property_country: "",
    property_zipcode: "",
    property_govt_id: "",
    property_purchase_price: 0,
    property_listed_rental_price: 0,
    property_currency: "",
    property_area: 0,
    property_bedrooms: 0,
    property_bathrooms: 0,
    property_bldg_floors: 0,
    property_floor: 0,
    property_balcony: false,
    property_furnishing: "",
    property_amenities: "",
    property_rules: "",
    property_status: "",
    property_availability: "",
    property_available_from: "",
    property_available_to: "",
    property_image_description: "",
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [active, setActive] = useState("Create Property");
  const { token, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const navbar = document.querySelector(".navbar-demo");
    if (pathname.startsWith("/OwnerPortal/OwnerPropertyCreate") && token) {
      if (navbar) navbar.style.display = "none";
      return () => {
        if (navbar) navbar.style.display = "block";
      };
    }
  }, [pathname, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    images.forEach((image) => data.append("images", image));

    try {
      await api.post("/api/v1/Owner/properties/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/OwnerPortal/OwnerDashboard");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail || "Failed to create property"
      );
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/auth/OwnerLogin");
  };

  const handleCreateProperty = () => {
    router.push("/OwnerPortal/OwnerPropertyCreate");
  };
  const handleDashboard = () => {
    router.push("/OwnerPortal/OwnerDashboard");
  };

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, onClick: handleDashboard },
    { name: "My Properties", icon: <FiPackage /> },
    { name: "Create Property", icon: <FiPlus />, onClick: handleCreateProperty },
    { name: "Lease Management", icon: <FiFileText /> },
    { name: "Account Management", icon: <FiTrendingUp /> },
    { name: "Work Management", icon: <FiSettings /> },
    { name: "My Profile", icon: <FiUser /> },
  ];

  return (
    <ProtectedRoute allowedRole="owner">
      <div className="flex h-screen bg-gray-900 text-white">
        <aside className="hidden md:flex md:w-64 flex-col bg-gray-800 p-5 fixed top-0 left-0 h-full overflow-y-auto">
          <div className="flex items-center pb-6 border-b border-gray-700">
            <img className="w-8 h-8" src="/images/a.png" alt="Logo" />
            <span className="ml-3 text-lg font-semibold">Owner Portal</span>
          </div>
          <nav className="mt-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center w-full px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  active === item.name ? "bg-indigo-600" : "hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActive(item.name);
                  if (item.onClick) item.onClick();
                  else router.push(`/OwnerPortal${item.name === "Dashboard" ? "" : "/" + item.name.replace(" ", "")}`);
                }}
              >
                <span className="mr-4 text-lg">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>
          <div className="mt-auto">
            <button
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 rounded-lg"
              onClick={handleLogout}
            >
              <FiLogOut className="mr-3 text-lg" /> Logout
            </button>
          </div>
        </aside>
        <main className="flex-1 ml-0 md:ml-64 h-screen overflow-y-auto bg-gray-900 p-6">
          <h1 className="text-2xl font-semibold mb-6">Create Property</h1>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Title
                  </label>
                  <input
                    name="property_title"
                    value={formData.property_title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Subtitle
                  </label>
                  <input
                    name="property_subtitle"
                    value={formData.property_subtitle}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    name="property_description"
                    value={formData.property_description}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                    rows="2"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Type
                  </label>
                  <input
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Address
                  </label>
                  <input
                    name="property_address"
                    value={formData.property_address}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    City
                  </label>
                  <input
                    name="property_city"
                    value={formData.property_city}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    State
                  </label>
                  <input
                    name="property_state"
                    value={formData.property_state}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Country
                  </label>
                  <input
                    name="property_country"
                    value={formData.property_country}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Zipcode
                  </label>
                  <input
                    name="property_zipcode"
                    value={formData.property_zipcode}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Government ID
                  </label>
                  <input
                    name="property_govt_id"
                    value={formData.property_govt_id}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Purchase Price
                  </label>
                  <input
                    name="property_purchase_price"
                    type="number"
                    value={formData.property_purchase_price}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Rental Price
                  </label>
                  <input
                    name="property_listed_rental_price"
                    type="number"
                    value={formData.property_listed_rental_price}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Currency
                  </label>
                  <input
                    name="property_currency"
                    value={formData.property_currency}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Area (sq ft)
                  </label>
                  <input
                    name="property_area"
                    type="number"
                    value={formData.property_area}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Bedrooms
                  </label>
                  <input
                    name="property_bedrooms"
                    type="number"
                    value={formData.property_bedrooms}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Bathrooms
                  </label>
                  <input
                    name="property_bathrooms"
                    type="number"
                    value={formData.property_bathrooms}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Building Floors
                  </label>
                  <input
                    name="property_bldg_floors"
                    type="number"
                    value={formData.property_bldg_floors}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Floor
                  </label>
                  <input
                    name="property_floor"
                    type="number"
                    value={formData.property_floor}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Balcony
                  </label>
                  <input
                    name="property_balcony"
                    type="checkbox"
                    checked={formData.property_balcony}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Furnishing
                  </label>
                  <input
                    name="property_furnishing"
                    value={formData.property_furnishing}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 font-semibold mb-2">
                    Amenities
                  </label>
                  <textarea
                    name="property_amenities"
                    value={formData.property_amenities}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                    rows="2"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 font-semibold mb-2">
                    Rules
                  </label>
                  <textarea
                    name="property_rules"
                    value={formData.property_rules}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                    rows="2"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Status
                  </label>
                  <input
                    name="property_status"
                    value={formData.property_status}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Availability
                  </label>
                  <input
                    name="property_availability"
                    value={formData.property_availability}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Available From
                  </label>
                  <input
                    name="property_available_from"
                    type="datetime-local"
                    value={formData.property_available_from}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Available To
                  </label>
                  <input
                    name="property_available_to"
                    type="datetime-local"
                    value={formData.property_available_to}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 font-semibold mb-2">
                    Image Description
                  </label>
                  <textarea
                    name="property_image_description"
                    value={formData.property_image_description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 focus:ring-indigo-500"
                    rows="2"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-green-400 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition duration-200"
                >
                  Save Property
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/OwnerPortal")}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}