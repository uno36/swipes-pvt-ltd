// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";
import HealthAssistant from "../components/HealthAssistant";
import type { Product, CartItem } from "../types";

interface DummyJSONProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductApiResponse {
  products: DummyJSONProduct[];
  total: number;
  skip: number;
  limit: number;
}

interface HomePageProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => void; // Add addToCart prop
  searchTerm: string; // Add searchTerm prop
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>; // Add setSearchTerm prop
}

const HomePage: React.FC<HomePageProps> = ({
  cart,
  setCart,
  addToCart, // Destructure addToCart
  searchTerm, // Destructure searchTerm
  setSearchTerm, // Destructure setSearchTerm
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const categories = ["beauty", "fragrances", "skin-care"];
        const fetches = categories.map(async (category) => {
          const res = await fetch(
            `https://dummyjson.com/products/category/${category}`
          );
          const data: ProductApiResponse = await res.json();
          return data.products.map((p) => ({
            id: p.id,
            name: p.title,
            price: `R${p.price.toFixed(2)}`,
            imageUrl: p.thumbnail,
          }));
        });

        const results = await Promise.all(fetches);
        setProducts(results.flat());
      } catch (e) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on searchTerm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <HeroSection />
      <ProductGrid
        products={filteredProducts} // Use filteredProducts
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        onAddToCart={addToCart} // Pass addToCart
      />
      <HealthAssistant />
    </>
  );
};

export default HomePage;
