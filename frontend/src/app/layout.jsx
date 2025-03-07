import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/NavbarDemo";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PropX",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="relative w-full flex items-center justify-center">
          <NavbarDemo />
        </div>
        {children}
      </body>
    </html>
  );
}