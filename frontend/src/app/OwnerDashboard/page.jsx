"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiFileText,
  FiPackage,
  FiTrendingUp,
  FiLogOut,
} from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function OwnerDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "My Property", icon: <FiPackage /> },
    { name: "Lease Management", icon: <FiFileText /> },
    { name: "Account Management", icon: <FiTrendingUp /> },
    { name: "Work Management", icon: <FiSettings /> },
    { name: "My Profile", icon: <FiUser /> },
  ];

  const customerInfo = {
    name: "Furkan Ahmad",
    customerSince: "January 2025",
    role: "Owner",
    status: "Active",
    contact: "Furkan@example.com",
  };

  const financialInfo = {
    totalUnits: 20,
    rentedUnits: 15,
    listedUnits: 5,
    revenueCollected: "$15,000",
    revenueReceivable: "$5,000",
    expenses: "$2,000",
    netIncome: "$13,000",
  };

  const propertyData = [
    {
      id: "1",
      address: "Dubai",
      type: "Apartment",
      title: "2-Bedroom Apartment",
      bed: 2,
      bath: 1,
      area: "800 sq ft",
      furnished: "Yes",
      status: "Rented",
    },
    {
      id: "2",
      address: "India",
      type: "House",
      title: "3-Bedroom House",
      bed: 3,
      bath: 2,
      area: "1,500 sq ft",
      furnished: "No",
      status: "Available",
    },
  ];
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-900 text-white">
        <aside className="hidden md:flex md:w-64 flex-col bg-gray-800 p-5">
          <div className="flex items-center pb-6 border-b border-gray-700">
            <img className="w-8 h-8" src="/images/a.png" alt="Logo" />
            <span className="ml-3 text-lg font-semibold">Owner portal</span>
          </div>
          <nav className="mt-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center w-full px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  active === item.name ? "bg-indigo-600" : "hover:bg-gray-700"
                }`}
                onClick={() => setActive(item.name)}
              >
                <span className="mr-4 text-lg">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>
          <div className="mt-auto">
            <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 rounded-lg">
              <FiLogOut className="mr-3 text-lg" /> Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold">{active}</h1>

          {/* Customer Info Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Name</h3>
              <p>{customerInfo.name}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Customer Since</h3>
              <p>{customerInfo.customerSince}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Role</h3>
              <p>{customerInfo.role}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Status</h3>
              <p>{customerInfo.status}</p>
            </div>
          </div>

          {/* Financial Info Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Total Units</h3>
              <p>{financialInfo.totalUnits}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Rented Units</h3>
              <p>{financialInfo.rentedUnits}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Listed Units</h3>
              <p>{financialInfo.listedUnits}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Revenue Collected</h3>
              <p>{financialInfo.revenueCollected}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Revenue Receivable</h3>
              <p>{financialInfo.revenueReceivable}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Expenses</h3>
              <p>{financialInfo.expenses}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Net Income</h3>
              <p>{financialInfo.netIncome}</p>
            </div>
          </div>

          {/* Property Table Row */}
          <div className="bg-gray-800 p-4 rounded-lg mt-6 overflow-x-auto">
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
                {propertyData.map((property) => (
                  <tr key={property.id} className="border-b border-gray-700">
                    <td className="px-4 py-2">{property.id}</td>
                    <td className="px-4 py-2">{property.address}</td>
                    <td className="px-4 py-2">{property.type}</td>
                    <td className="px-4 py-2">{property.title}</td>
                    <td className="px-4 py-2">{property.bed}</td>
                    <td className="px-4 py-2">{property.bath}</td>
                    <td className="px-4 py-2">{property.area}</td>
                    <td className="px-4 py-2">{property.furnished}</td>
                    <td className="px-4 py-2">{property.status}</td>
                    <td className="px-4 py-2">
                      <button className="text-indigo-500 hover:text-indigo-400">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Items */}
          <div className="mt-6">
            <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">
              Sign Lease
            </button>
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700 transition duration-200">
              Order Request
            </button>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
