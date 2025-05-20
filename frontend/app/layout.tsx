import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProvider from "@/context/AppProvider";
import { Toaster } from "react-hot-toast";
import ProductProvider from "@/context/ProductProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Tech Market",
  description: "A Mini Market Application for Tech Products, built with Next.js and TypeScript. and powered by the latest technologies. Laravel 12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <Toaster/>
          <ProductProvider>
          {children}
          </ProductProvider>
        </AppProvider>
      </body>
    </html>
  );
}
