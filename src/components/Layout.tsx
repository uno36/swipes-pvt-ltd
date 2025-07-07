// src/components/Layout.tsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
// import type { Product } from "../types";

interface LayoutProps {
  children: React.ReactNode;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  cartItemCount: number;
  onGoToCart: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
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
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
