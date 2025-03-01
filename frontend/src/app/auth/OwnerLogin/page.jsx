"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconEye, IconEyeOff, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { ownerlogin, googleSignIn } from "@/lib/api";

function OwnerLoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await ownerlogin(email, password);
      setUser(response.data.user, response.data.role);
      setToken(response.data.access_token);
      router.push("/OwnerDashboard");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail || "Login failed. Please try again."
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const token = "google_oauth_token";
      const response = await googleSignIn(token);
      setUser(response.data.user, response.data.role);
      setToken(response.data.access_token);
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Google login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 shadow-lg bg-white dark:bg-black rounded-2xl border border-blue-300 hover:shadow-blue-400 dark:hover:shadow-blue-500 hover:border-blue-500 transition duration-300">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
          Owner Login
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="mt-6">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div className="mb-4 text-right">
            <Link
              href="/auth/forgot-password"
              className="text-blue-500 text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full h-10 font-medium rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p>
              Don't have an account?{" "}
              <Link
                href="/auth/OwnerSignup"
                className="text-blue-500 hover:underline"
              >
                Owner SignUp
              </Link>
            </p>
          </div>

          <div className="mt-6 flex flex-col space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center space-x-2 w-full h-10 font-medium rounded-md border border-gray-300 hover:bg-gray-100 dark:border-zinc-800 dark:hover:bg-zinc-900 transition duration-300"
            >
              <IconBrandGoogle className="h-5 w-5 text-neutral-800 dark:text-neutral-300" />
              <span>Continue with Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OwnerLoginPage;

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};