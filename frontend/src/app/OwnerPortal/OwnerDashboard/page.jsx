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

export default function OwnerDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [properties, setProperties] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { token, role, user = { id: null, firstName: "",lastName:"", email:"", phoneNumber: "", countryCode: "", }, logout } = useAuthStore();

  useEffect(() => {
    if (pathname === "/OwnerPortal/OwnerDashboard" && token) {
      const navbar = document.querySelector(".navbar-demo");
      if (navbar) navbar.style.display = "none";
      return () => {
        if (navbar) navbar.style.display = "block";
      };
    }
  }, [pathname, token]);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!token) {
        setErrorMessage("No authentication token found");
        return;
      }
      try {
        console.log("Fetching properties with token:", token);
        const response = await api.get("/api/v1/Owner/User_properties/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Properties fetched:", response.data);
        setProperties(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setErrorMessage(
          error.response?.data?.detail || "Failed to load properties. Please try again."
        );
      }
    };
    fetchProperties();
  }, [token]);

  const handleLogout = () => {
    logout();
    router.push("/auth/OwnerLogin");
  };

  const handleCreateProperty = () => {
    router.push("/OwnerPortal/OwnerPropertyCreate");
  };

  const Myprofile = () =>{
    router.push("/OwnerPortal/MyProfile")
  }

  const menuItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "My Properties", icon: <FiPackage /> },
    { name: "Create Property", icon: <FiPlus />, onClick: handleCreateProperty },
    { name: "Lease Management", icon: <FiFileText /> },
    { name: "Account Management", icon: <FiTrendingUp /> },
    { name: "Work Management", icon: <FiSettings /> },
    { name: "My Profile", icon: <FiUser /> , onClick: Myprofile},
  ];

  return (
    <ProtectedRoute allowedRole="owner">
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 flex-col bg-gray-800 p-5">
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
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold">{active}</h1>

          {/* User Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-6">
            <div className="bg-gray-800 p-4 rounded-lg text-white shadow-md">
              <p className="text-sm font-bold">Name</p>
              <p className="text-lg text-blue-500">{user.firstName && user.lastName ? `${user.firstName}${user.lastName}`: "Owner"}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-white shadow-md">
              <p className="text-sm font-bold">Role</p>
              <p className="text-lg capitalize text-blue-500">{role}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-white shadow-md">
              <p className="text-sm font-bold">Contact</p>
              <p className="text-lg text-blue-500">{user.phoneNumber ? `${user.countryCode}${" "}${user.phoneNumber}` : "N/A"}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-white shadow-md">
              <p className="text-sm font-bold">customer since</p>
              <p className="text-lg text-blue-500">{user.email || "N/A"}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-white shadow-md">
              <p className="text-sm font-bold">Status</p>
              <p className="text-lg text-green-400">Active</p>
            </div>
          </div>

          {/* Create Property Button */}
          <div className="flex space-x-4 my-4">
            <button
              onClick={handleCreateProperty}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Create Property
            </button>
          </div>

          {/* Properties Table */}
          <h2 className="text-lg font-semibold">Your Properties</h2>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <div className="bg-gray-800 p-4 rounded-lg mt-4 overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-400">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Bed</th>
                  <th className="px-4 py-2">Bath</th>
                  <th className="px-4 py-2">Area</th>
                  <th className="px-4 py-2">Furnished</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {properties.length > 0 ? (
                  properties.map((prop) => (
                    <tr key={prop.id} className="border-b border-gray-700">
                      <td className="px-4 py-2">{prop.property_title}</td>
                      <td className="px-4 py-2">{prop.property_address}</td>
                      <td className="px-4 py-2">{prop.property_status}</td>
                      <td className="px-4 py-2">
                        <button className="text-indigo-500 hover:text-indigo-400">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="px-4 py-2 text-center">No properties found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
