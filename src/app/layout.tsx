import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const font = EB_Garamond({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Booktopia - Online book store",
  description: "Developed by LongVT and HopDP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className + " px-2 bg-orange-100 bg-opacity-60"}>
        {children}
      </body>
    </html>
  );
}
