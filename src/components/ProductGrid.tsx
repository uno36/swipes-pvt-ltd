import ProductCard from "./ProductCard";
import type { Product } from "../types";

export interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  error,
  searchTerm,
  onAddToCart,
}) => {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-12">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Featured Products
      </h3>

      {loading && (
        <div className="text-center text-blue-600 text-lg">
          Loading products...
        </div>
      )}

      {error && <div className="text-center text-red-600 text-lg">{error}</div>}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center text-gray-600 text-lg">
          No products found matching your search.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
