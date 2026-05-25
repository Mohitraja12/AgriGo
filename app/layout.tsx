// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import SiteFrame from "@/components/app/common/site-frame";
import { AuthProvider } from "@/context/AuthContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AGRIGO — Agriculture, Community & Social Impact",
  description:
    "AGRIGO is a purpose-driven organization focused on sustainable agriculture, community development, and measurable social impact across rural India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#1C1C1C] font-sans antialiased">
        <AuthProvider>
          <SiteFrame>{children}</SiteFrame>
        </AuthProvider>
      </body>
    </html>
  );
}