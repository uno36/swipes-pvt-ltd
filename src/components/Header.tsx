// src/components/Header.tsx
import React, { useState } from "react";
import logo from "../assets/swipes-logo.png";
import { Link } from "react-router-dom";
import type { Product, PrimaryColor, Theme } from "../types";

export interface CartItem extends Product {
  quantity: number;
}

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  cartItemCount: number;
  onGoToCart: () => void;
  theme: Theme;
  toggleTheme: () => void;
  primaryColor: PrimaryColor;
  setPrimaryColor: (color: PrimaryColor) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  cartItemCount,
  onGoToCart,
  theme,
  toggleTheme,
  primaryColor,
  setPrimaryColor,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const primaryColorClass =
    primaryColor === "blue" ? "text-blue-800" : "text-olive-800";
  const primaryHoverClass =
    primaryColor === "blue" ? "hover:text-blue-600" : "hover:text-olive-600";
  const primaryFocusRingClass =
    primaryColor === "blue" ? "focus:ring-blue-500" : "focus:ring-olive-500";

  const desktopNavLinks = [
    "Shop",
    "Pharmacy",
    "Clinic",
    "Rewards",
    "Specials",
    "Login / Register",
  ];

  return (
    <header
      className={`bg-white text-black dark:bg-gray-600 dark:text-white ${primaryColorClass} shadow-sm py-4 px-4 md:px-8 lg:px-12 sticky top-0 z-50 ${
        theme === "dark" ? "dark-mode-header" : ""
      }`}
    >
      <div className="container mx-auto flex flex-col gap-4 md:flex-row items-center justify-between relative">
        {/* Mobile Layout */}
        <div className="w-full md:hidden">
          <div className="flex items-center justify-between w-full">
            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className={`text-gray-700 ${primaryHoverClass} focus:outline-none focus:ring-2 ${primaryFocusRingClass} rounded-md`}
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

            {/* Logo and Name */}
            <div className="flex items-center gap-2 overflow-hidden">
              <img
                src={logo}
                alt="Swipes Logo"
                className="w-10 h-10 rounded-full"
              />
              <Link to="/" className="truncate overflow-hidden">
                <h1
                  className={`text-xl dark:text-white font-bold ${primaryColorClass} whitespace-nowrap truncate`}
                >
                  Swipes Pvt Ltd
                </h1>
              </Link>
            </div>

            {/* Cart + Theme */}
            <div className="flex items-center gap-2">
              <button
                onClick={onGoToCart}
                className={`relative text-gray-700 ${primaryHoverClass} p-1 rounded-md focus:outline-none focus:ring-2 ${primaryFocusRingClass}`}
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
              <button
                onClick={toggleTheme}
                className={`p-1 rounded-md ${
                  theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                title="Toggle Theme"
              >
                {theme === "dark" ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.459 4.591A1 1 0 0115 15a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 01.459.091zm-6.57-1.99a1 1 0 010 2H4a1 1 0 110-2h1.97l-.459-.091zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-4.591-3.459a1 1 0 01-.091-.459V13a1 1 0 112 0v1.97l-.091.459zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>
              <button
                onClick={() =>
                  setPrimaryColor(primaryColor === "blue" ? "olive" : "blue")
                }
                className={`p-2 rounded-md ${
                  primaryColor === "olive"
                    ? "bg-olive-600 text-white"
                    : "bg-blue-600 text-white"
                } transition duration-300 ease-in-out`}
                title="Change Primary Color"
              >
                {primaryColor === "olive" ? "Olive" : "Blue"}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search for products..."
              className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none ${primaryFocusRingClass} 
                bg-white text-black placeholder-gray-500 
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-300`}
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchChange(e.target.value)
              }
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
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between w-full gap-6">
          {/* Logo and Name */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Swipes Logo"
              className="w-12 h-12 rounded-full"
            />
            <Link to="/">
              <h1
                className={`dark:text-white text-2xl font-bold ${primaryColorClass}`}
              >
                Swipes Pvt Ltd
              </h1>
            </Link>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search for products..."
              className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none ${primaryFocusRingClass} 
                bg-white text-black placeholder-gray-500 
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-300`}
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchChange(e.target.value)
              }
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

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm font-medium">
            {desktopNavLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="dark:text-white text-gray-700 hover:text-blue-600 transition"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Cart + Theme - Desktop */}
          <div className="flex items-center gap-4">
            <button
              onClick={onGoToCart}
              className={`dark:text-white relative text-gray-700 ${primaryHoverClass} p-2 rounded-md focus:outline-none focus:ring-2 ${primaryFocusRingClass}`}
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
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.459 4.591A1 1 0 0115 15a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 01.459.091zm-6.57-1.99a1 1 0 010 2H4a1 1 0 110-2h1.97l-.459-.091zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-4.591-3.459a1 1 0 01-.091-.459V13a1 1 0 112 0v1.97l-.091.459zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
            <button
              onClick={() =>
                setPrimaryColor(primaryColor === "olive" ? "blue" : "olive")
              }
              className={`p-2 rounded-md ${
                primaryColor === "olive"
                  ? "bg-olive-600 text-white"
                  : "bg-blue-600 text-white"
              } transition duration-300 ease-in-out`}
              title="Change Primary Color"
            >
              {primaryColor === "olive" ? "Olive" : "Blue"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center py-8 px-6 overflow-y-auto">
          <div className="w-full flex justify-end">
            <button
              onClick={closeMenu}
              className="text-gray-700 hover:text-red-500 p-2"
              aria-label="Close menu"
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
            {desktopNavLinks.map((item) => (
              <a
                key={item}
                href="#"
                onClick={closeMenu}
                className={`text-gray-800 ${primaryHoverClass} py-2 w-full text-center border-b border-gray-200`}
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

export default Header;
