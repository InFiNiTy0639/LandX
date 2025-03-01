"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function NavbarDemo() {
  return (
    <div className="relative w-full">
      <Navbar className="top-0" />
    </div>
  );
}

function Navbar({ className }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("fixed inset-x-0 top-0 z-50 bg-gray-900", className)}>
      <div className="px-4 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center shrink-0">
            <Link href="/" legacyBehavior>
              <a className="flex items-center space-x-2">
                <Image src="/images/a.png" alt="Logo" width={45} height={45} className="rounded-full" />
                <span className="text-white text-xl font-bold">PropX</span>
              </a>
            </Link>
          </div>
          <nav className="hidden md:flex items-center mx-auto space-x-6">
            {[
              { href: "/Home", label: "Home" },
              { href: "/About", label: "About" },
              { href: "/Listing", label: "Listing" },
              { href: "/Owner", label: "Owner" },
              { href: "/Tenant", label: "Tenant" },
              { href: "/Contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white text-lg font-medium transition-colors duration-200 hover:text-cyan-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative inline-flex items-center justify-center group">
              <div className="absolute transition-all duration-200 rounded-lg -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
              <Link
                href="/auth/OwnerLogin"
                className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-lg hover:bg-opacity-80"
              >
                Owner Login
              </Link>
            </div>
            <div className="relative inline-flex items-center justify-center group">
              <div className="absolute transition-all duration-200 rounded-lg -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
              <Link
                href="/auth/TenantLogin"
                className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-lg hover:bg-opacity-80"
              >
                Tenant Login
              </Link>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {expanded ? (
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {expanded && (
          <nav className="flex flex-col pt-4 pb-4 space-y-4 md:hidden bg-gray-900">
            {[
              { href: "/Home", label: "Home" },
              { href: "/About", label: "About" },
              { href: "/Listing", label: "Listing" },
              { href: "/Owner", label: "Owner" },
              { href: "/Tenant", label: "Tenant" },
              { href: "/Contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-white text-sm font-medium transition-colors duration-200 hover:text-cyan-400"
              >
                {item.label}
              </Link>
            ))}
            <div className="space-y-4 px-4">
              <div className="relative inline-flex items-center justify-center group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <Link
                  href="/auth/OwnerLogin"
                  className="relative inline-flex items-center justify-center w-full px-6 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-lg"
                >
                  Owner Login
                </Link>
              </div>
              <div className="relative inline-flex items-center justify-center group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <Link
                  href="/auth/TenantLogin"
                  className="relative inline-flex items-center justify-center w-full px-6 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-lg"
                >
                  Tenant Login
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}