// src/components/Header.tsx
import React, { useState } from "react";
import logo from "../assets/swipes-logo.png";
import type { Product } from "../types";

export interface CartItem extends Product {
  quantity: number;
}

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  cartItemCount: number;
  onGoToCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  cartItemCount,
  onGoToCart,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-sm py-4 px-4 md:px-8 lg:px-12 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {/* Mobile: Hamburger (top-left) */}
        <div className="absolute left-0 top-0 md:hidden p-2">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Logo and Name */}
        <div className="flex items-center gap-2 mx-auto md:mx-0">
          <img
            src={logo}
            alt="Swipes Logo"
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-2xl font-bold text-blue-800">Swipes Pvt Ltd</h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Cart Icon & Desktop Nav */}
        <div className="flex items-center gap-4 md:static absolute top-0 right-0 p-2">
          <button
            onClick={onGoToCart}
            className="relative text-gray-700 hover:text-blue-600 transition duration-200 ease-in-out p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          <nav className="hidden md:flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm font-medium">
            {[
              "Shop",
              "Pharmacy",
              "Clinic",
              "Rewards",
              "Specials",
              "Login / Register",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center py-8 px-6 overflow-y-auto">
          <div className="w-full flex justify-end">
            <button
              onClick={closeMenu}
              className="text-gray-700 hover:text-red-500 p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col items-center gap-6 text-lg font-medium w-full mt-4">
            {[
              "Shop",
              "Pharmacy",
              "Clinic",
              "Rewards",
              "Specials",
              "Login / Register",
            ].map((item) => (
              <a
                key={item}
                href="#"
                onClick={closeMenu}
                className="text-gray-800 hover:text-blue-600 py-2 w-full text-center border-b border-gray-200"
              >
                {item}
              </a>
            ))}

            <div className="w-full mt-6 pt-4 border-t border-gray-300">
              <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Shop by Category
              </h4>
              <ul className="space-y-3 text-base">
                {[
                  "Baby",
                  "Health",
                  "Creams & Lotions",
                  "Sanitizers & Wipes",
                  "Perfumes & Fragrances",
                  "Vitamins & Supplements",
                  "Hair Care",
                ].map((category) => (
                  <li key={category}>
                    <a
                      href="#"
                      onClick={closeMenu}
                      className="block text-gray-700 hover:text-blue-600 py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

// Forward props
interface HeaderWithSearchWrapperProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  cartItemCount: number;
  onGoToCart: () => void;
}

const HeaderWithSearchWrapper: React.FC<HeaderWithSearchWrapperProps> = ({
  searchTerm,
  onSearchChange,
  cartItemCount,
  onGoToCart,
}) => {
  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        cartItemCount={cartItemCount}
        onGoToCart={onGoToCart}
      />
      <main className="p-4">
        <h2 className="text-xl">
          Search Results for: <strong>{searchTerm}</strong>
        </h2>
      </main>
    </>
  );
};

export default HeaderWithSearchWrapper;
