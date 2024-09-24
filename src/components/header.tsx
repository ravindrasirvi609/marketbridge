"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, User, Package, PlusCircle, LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await signOut({ redirect: false });
        router.push("/");
        router.refresh();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
                <button
                  className="hover:text-[#D8D2CB] transition-colors flex items-center"
                  onClick={() => setIsLogoutDialogOpen(true)}
                >
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
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-[#398AB9] transition-colors"
                  onClick={() => setIsLogoutDialogOpen(true)}
                >
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
      {/* Logout confirmation dialog */}
      <AlertDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will end your current session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Header;
