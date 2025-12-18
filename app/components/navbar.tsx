"use client";

import { useState } from "react";
import Link from "next/link";
import { FaShoppingBag, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const products = useCartStore((state) => state.products);
  const totalQty = products.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed font-mono top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-3xl font-semibold text-gray-900 tracking-tight"
        >
          <FaShoppingBag className="text-indigo-600 text-3xl" />
          <span className=" text-gray-800 hover:text-indigo-600 transition">
            Shoplex
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/cart"
            className="relative text-gray-700 hover:text-indigo-600 transition"
          >
            <FaShoppingBag className="text-2xl" />

            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {totalQty}
            </span>
          </Link>

          <Link
            href="/account"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            <FaUserCircle className="text-3xl" />
          </Link>
        </div>

        {/* Mobile - Hamburger Button */}
        <button
          className="md:hidden text-gray-700 text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-inner px-6 py-4 space-y-4">
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 text-gray-700 text-lg hover:text-indigo-600 transition"
          >
            <FaShoppingBag className="text-2xl" />
            <span>Cart</span>

            <span className="ml-auto bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
              {totalQty}
            </span>
          </Link>

          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 text-gray-700 text-lg hover:text-indigo-600 transition"
          >
            <FaUserCircle className="text-3xl" />
            <span>Account</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
