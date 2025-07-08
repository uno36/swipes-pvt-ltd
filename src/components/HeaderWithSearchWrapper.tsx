// src/components/HeaderWithSearchWrapper.tsx
import React, { useState } from "react";
import Header from "./Header";
import type { PrimaryColor, Theme } from "../types";

interface HeaderWithSearchWrapperProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  cartItemCount: number;
  onGoToCart: () => void;
  toggleTheme: () => void;
  theme: Theme;
}

const HeaderWithSearchWrapper: React.FC<HeaderWithSearchWrapperProps> = ({
  searchTerm,
  onSearchChange,
  cartItemCount,
  onGoToCart,
  toggleTheme,
  theme,
}) => {
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>(() => {
    const savedColor = localStorage.getItem("dischem-primary-color");
    return savedColor === "blue" || savedColor === "olive"
      ? savedColor
      : "blue";
  });

  const handleSetPrimaryColor = (color: PrimaryColor) => {
    setPrimaryColor(color);
    localStorage.setItem("dischem-primary-color", color);
  };

  return (
    <Header
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      cartItemCount={cartItemCount}
      onGoToCart={onGoToCart}
      theme={theme}
      toggleTheme={toggleTheme}
      primaryColor={primaryColor}
      setPrimaryColor={handleSetPrimaryColor}
    />
  );
};

export default HeaderWithSearchWrapper;
