"use client";
import { useAuthStore } from "@/store/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children, allowedRole = null }) => {
  const { user, token, role } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();  
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (!token) {
      if (pathname.includes("owner") || pathname.includes("Owner")) {
        router.push("/auth/OwnerLogin");
      } else if (pathname.includes("tenant") || pathname.includes("Tenant")) {
        router.push("/auth/TenantLogin");
      } else {
        router.push("/auth/OwnerLogin");  
      }
    } else if (allowedRole && role !== allowedRole) {
      if (role === "owner") {
        router.push("/OwnerDashboard");
      } else if (role === "tenant") {
        router.push("/TenantDashboard");
      } else {
        router.push("/auth/OwnerLogin");  
      }
    }
    setIsLoading(false); 
  }, [token, role, pathname, router, allowedRole]);

  if (isLoading || !token) {
    return null;
  }

  return children; 
};

export default ProtectedRoute;