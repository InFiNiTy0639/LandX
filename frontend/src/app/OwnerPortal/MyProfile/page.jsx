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
  FiCamera,
} from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore } from "@/store/auth";
import { api,updateProfile } from "@/lib/api";

export default function MyProfile() {
  const [active, setActive] = useState("My Profile");
  const [properties, setProperties] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { token, logout, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const DEFAULT_PIC = "/images/b.jpg";
  // MyProfile state
  const [profile, setProfile] = useState({
    pic: user.pic || DEFAULT_PIC,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    address: "",
    email: user.email || "",
    phoneNumber: user.phoneNumber
      ? `${user.countryCode} ${user.phoneNumber}`
      : "",
    idType: "",
    eidNo: "",
    driverLicenseNumber: "",
    password: user.password || "********",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const navbar = document.querySelector(".navbar-demo");
    if (pathname.startsWith("/OwnerPortal/MyProfile") && token) {
      if (navbar) navbar.style.display = "none";
      return () => {
        if (navbar) navbar.style.display = "block";
      };
    }
  }, [pathname, token]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    console.log("Profile updated:", profile);
    const updatedUser = {
      ...user,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phoneNumber: profile.phoneNumber.split(" ").slice(1).join(" ") || user.phoneNumber,
      countryCode: profile.phoneNumber.split(" ")[0] || user.countryCode,
      pic:profile.pic || DEFAULT_PIC
    };
    useAuthStore.getState().setUser(updatedUser, "owner");
    try {
      await updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phoneNumber.split(" ").slice(1).join(" ") || "",
        countryCode: profile.phoneNumber.split(" ")[0] || "",
        address: profile.address,
        idType: profile.idType,
        eidNo: profile.eidNo,
        driverLicenseNumber: profile.driverLicenseNumber,
      });
      console.log("Profile Successfully update on backend");
    } catch (error) {
      console.error("Failed to update profile:", error.response?.data || error.message);
    }
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, pic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, onClick: handleDashboard },
    { name: "My Properties", icon: <FiPackage /> },
    {
      name: "Create Property",
      icon: <FiPlus />,
      onClick: handleCreateProperty,
    },
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
        <main className="flex-1 ml-0 md:ml-64 h-screen overflow-y-auto bg-gray-900">
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">{active}</h1>
            
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2 flex justify-center relative">
                  <img
                    src={profile.pic}
                    alt=""
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                  />
                  {isEditing && (
                    <label className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition duration-200">
                      <FiCamera className="text-white text-lg" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePicChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 ${
                      isEditing ? "focus:ring-indigo-500" : "bg-gray-700"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 ${
                      isEditing ? "focus:ring-indigo-500" : "bg-gray-700"
                    }`}
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 font-semibold mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 ${
                      isEditing ? "focus:ring-indigo-500" : "bg-gray-700"
                    }`}
                    rows="2"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 ${
                      isEditing ? "focus:ring-indigo-500" : "bg-gray-700"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 ${
                      isEditing ? "focus:ring-indigo-500" : "bg-gray-700"
                    }`}
                  />
                </div>
                <div className="col-span-1 md:col-span-2 mt-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Identifications
                  </h3>
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    ID Type
                  </label>
                  <input
                    type="text"
                    name="idType"
                    value={profile.idType}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 ${
                      isEditing ? "focus:ring-indigo-500" : "bg-gray-700"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    EID No
                  </label>
                  <input
                    type="text"
                    name="eidNo"
                    value={profile.eidNo}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 ${
                      isEditing ? "focus:ring-indigo-500" : "bg-gray-700"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Driver License Number
                  </label>
                  <input
                    type="text"
                    name="driverLicenseNumber"
                    value={profile.driverLicenseNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 ${
                      isEditing ? "focus:ring-indigo-500" : "bg-gray-700"
                    }`}
                  />
                </div>
                <div className="col-span-1 md:col-span-2 mt-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Security
                  </h3>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-300 font-semibold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 text-white bg-gray-800 ${
                      isEditing ? "focus:ring-indigo-500" : "bg-gray-700"
                    }`}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-center gap-4">
                {!isEditing ? (
                  <button
                    onClick={handleUpdate}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="bg-green-400 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition duration-200"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
