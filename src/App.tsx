// src/App.tsx
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import HeaderWithSearchWrapper from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import type { CartItem, Product, Theme, PrimaryColor } from "./types";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Theme and color state
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("swipes-theme");
    return savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : "light";
  });

  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>(() => {
    const savedColor = localStorage.getItem("swipes-primary-color");
    return savedColor === "blue" || savedColor === "olive"
      ? savedColor
      : "blue";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("swipes-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("swipes-primary-color", primaryColor);
  }, [primaryColor]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      return existing
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      quantity <= 0
        ? prevCart.filter((item) => item.id !== productId)
        : prevCart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
    );
  };

  const removeItem = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handlePaymentSuccess = () => setCart([]);

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
      <ScrollToTop />
      {/* Header and Footer are outside Routes to be persistent */}
      <HeaderWithSearchWrapper
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onGoToCart={() => navigate("/cart")}
        theme={theme}
        toggleTheme={toggleTheme}
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cart={cart}
              setCart={setCart}
              addToCart={addToCart}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              theme={theme}
              toggleTheme={toggleTheme}
              primaryColor={primaryColor}
              setPrimaryColor={setPrimaryColor}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onContinueShopping={() => navigate("/")}
              onProceedToCheckout={() => navigate("/checkout")}
              theme={theme}
              primaryColor={primaryColor}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentFailure={() => {}}
              onBackToCart={() => navigate("/cart")}
              onGoToHome={() => navigate("/")}
              theme={theme}
              primaryColor={primaryColor}
            />
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>

      <Footer theme={theme} primaryColor={primaryColor} />
    </div>
  );
}

export default App;
