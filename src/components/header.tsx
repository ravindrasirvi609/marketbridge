"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Menu, X, User, Package, PlusCircle, LogOut } from "lucide-react";

const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-[#1C658C] text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              MarketBridge
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4 items-center">
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="hover:text-[#D8D2CB] transition-colors flex items-center"
                >
                  <User className="mr-1" size={18} /> Profile
                </Link>
                <Link
                  href="/ProductList"
                  className="hover:text-[#D8D2CB] transition-colors flex items-center"
                >
                  <Package className="mr-1" size={18} /> Products
                </Link>
                <Link
                  href="/addNewProduct"
                  className="hover:text-[#D8D2CB] transition-colors flex items-center"
                >
                  <PlusCircle className="mr-1" size={18} /> Add Product
                </Link>
                <button className="hover:text-[#D8D2CB] transition-colors flex items-center">
                  <LogOut className="mr-1" size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:text-[#D8D2CB] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#D8D2CB] text-[#1C658C] px-4 py-2 rounded-md hover:bg-[#398AB9] hover:text-white transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-2">
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#398AB9] transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href="/ProductList"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#398AB9] transition-colors"
                >
                  Products
                </Link>
                <Link
                  href="/addNewProduct"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#398AB9] transition-colors"
                >
                  Add Product
                </Link>
                <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-[#398AB9] transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#398AB9] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-[#D8D2CB] text-[#1C658C] hover:bg-[#398AB9] hover:text-white transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
