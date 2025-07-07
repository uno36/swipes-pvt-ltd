import { useState } from "react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [generatedDescription, setGeneratedDescription] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [descError, setDescError] = useState<string | null>(null);

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    setDescError(null);
    setGeneratedDescription("");

    try {
      const chatHistory = [];
      const prompt = `Generate a concise and engaging product description for a product named '${product.name}' that costs '${product.price}'. Focus on its benefits and what it's used for. Keep it under 100 words.`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        setGeneratedDescription(text);
      } else {
        setDescError("Failed to generate description. Please try again.");
        console.error("Unexpected API response structure:", result);
      }
    } catch (err) {
      setDescError(
        "Error connecting to the API. Please check your network and try again."
      );
      console.error("Error calling Gemini API for product description:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <div className="w-full h-60 bg-white flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/300x200/F0F9FF/0C4A6E?text=Image+Not+Found";
          }}
        />
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-2 truncate">
          {product.name}
        </h4>
        <p className="text-blue-700 font-bold text-xl mb-3">{product.price}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out mb-2"
        >
          Add to Cart
        </button>
        <button
          onClick={handleGenerateDescription}
          disabled={isGenerating}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isGenerating ? "Generating..." : "Generate Description ✨"}
        </button>

        {descError && (
          <div className="mt-2 text-red-600 text-xs">{descError}</div>
        )}

        {generatedDescription && (
          <div className="mt-3 p-2 bg-gray-50 rounded-md text-sm text-gray-700 border border-gray-200">
            <p className="font-medium text-gray-900 mb-1">
              AI-Generated Description:
            </p>
            <p>{generatedDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
