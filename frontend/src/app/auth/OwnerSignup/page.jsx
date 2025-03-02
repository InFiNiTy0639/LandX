"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ownersignup } from "@/lib/api";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useAuthStore } from "@/store/auth";
import { ownerlogin } from "@/lib/api";

const countryCodes = [
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "India", code: "+91" },
  { name: "Canada", code: "+1" },
  { name: "Australia", code: "+61" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "China", code: "+86" },
  { name: "Brazil", code: "+55" },
  { name: "Pakistan", code: "+92" },
  { name: "Bangladesh", code: "+880" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "UAE", code: "+971" },
  { name: "Russia", code: "+7" },
];

function OwnerSignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const handleSignup = async () => {
    if(!firstName || !lastName || !email || !password){
      setErrorMessage("All fields are required");
      return;
    }
    console.log("Signup payload:", {firstName,lastName,email,password,countryCode,phoneNumber});
    try {
      const response = await ownersignup(firstName, lastName, email, password, countryCode, phoneNumber);
      const user = `${firstName} ${lastName}`;
      const token = await ownerlogin(email, password);
      setUser(user, "owner");
      setToken(token.data.access_token);
      router.push("/OwnerDashboard");
    } catch (error) {
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          setErrorMessage(error.response.data.detail[0].msg || "Signup failed");
        } else {
          setErrorMessage(error.response.data.detail);
        }
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-2xl p-6 md:p-8 shadow-xl bg-white dark:bg-black mt-20 border border-blue-400 shadow-blue-400/50">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
        Owner Signup
      </h2>

      <form
        className="my-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Aadil"
              type="text"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Rizwan"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            type="email"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4 relative">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="••••••••"
              type={passwordVisible ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <IconEyeOff className="h-5 w-5" />
              ) : (
                <IconEye className="h-5 w-5" />
              )}
            </button>
          </div>
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex space-x-2">
            <select
              className="p-2 border rounded-md bg-gray-100 dark:bg-gray-800"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {countryCodes.map((country, index) => (
                <option key={`${country.code}-${index}`} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="123 456 7890"
              type="tel"
            />
          </div>
        </LabelInputContainer>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button
          className="bg-gradient-to-br from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600 block w-full text-white rounded-md h-10 font-medium shadow-md hover:shadow-blue-500/50 transition-all"
          type="submit"
        >
          Signup
          <BottomGradient />
        </button>

        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link
              href="/auth/OwnerLogin"
              className="text-blue-500 hover:underline"
            >
              Owner Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default OwnerSignupPage;

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};