/** @format */

import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/admin/side-navbar";

const inter = Inter({ subsets: ["latin"] });

const font = EB_Garamond({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Booktopia - Online book store",
  description: "Developed by LongVT and HopDP",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"min-h-screen w-full bg-white text-black flex"}>
      <SideNavbar />
      <div className="p-8 w-full">{children}</div>
    </div>
  );
}
