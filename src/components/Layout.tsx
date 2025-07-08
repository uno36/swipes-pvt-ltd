// src/components/Layout.tsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import type { Theme, PrimaryColor } from "../types";

interface LayoutProps {
  children: React.ReactNode;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  cartItemCount: number;
  onGoToCart: () => void;
  theme: Theme;
  toggleTheme: () => void;
  primaryColor: PrimaryColor;
  setPrimaryColor: (color: PrimaryColor) => void;
}

const Layout: React.FC<LayoutProps> = ({
  // children,
  searchTerm,
  onSearchChange,
  cartItemCount,
  onGoToCart,
  theme,
  toggleTheme,
  primaryColor,
}) => {
  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        cartItemCount={cartItemCount}
        onGoToCart={onGoToCart}
        theme={theme}
        toggleTheme={toggleTheme}
        primaryColor={primaryColor}
        setPrimaryColor={() => {}}
      />

      <Footer />
    </>
  );
};

export default Layout;
