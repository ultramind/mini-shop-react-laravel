// components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import {useAppHook} from "../context/AppProvider"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, authToken} = useAppHook()

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky -top-1 z-50">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-rose-600">
            <span className="bg-white px-2">Mini</span> <span className="text-white">Market</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-rose-600 transition">Home</Link>
            <Link href="#products" className="text-white hover:text-rose-600 transition">Products</Link>
            <Link href="#contact" className="text-white hover:text-rose-600 transition">Contact</Link>
            
            {authToken ? (
              <>
                <Link href="/dashboard" className="text-white hover:text-rose-600 transition">Dashboard</Link>
            
                <button className="text-white  bg-rose-600 py-2 px-4 rounded hover:text-white transition " onClick={logout}>Logout</button>              
              </>
            ): (
              <Link href="/auth" className="text-white  bg-rose-600 py-2 px-4 rounded hover:text-white transition ">Login</Link> 
              ) }
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white text-3xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 pb-4">
            <Link href="/" className="text-white hover:text-rose-600">Home</Link>
            <Link href="#products" className="text-white hover:text-rose-600">Products</Link>
            <Link href="#contact" className="text-white hover:text-rose-600">Contact</Link>
            
            {authToken ? (
              <>
                <Link href="/dashboard" className="text-white hover:text-rose-600 transition">Dashboard</Link>
            
                <button className="text-white  bg-rose-600 py-2 px-4 rounded hover:text-white transition " onClick={logout}>Logout</button>              
              </>
            ): (
              <Link href="/auth" className="text-white  bg-rose-600 py-2 px-4 rounded hover:text-white transition ">Login</Link> 
              ) }
          </div>
        )}
      </div>
    </nav>
  );
}
