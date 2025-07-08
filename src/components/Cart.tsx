import type { CartItem, Theme, PrimaryColor } from "../types";
import { useNavigate } from "react-router-dom";
import React from "react";

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onContinueShopping: () => void;
  onProceedToCheckout: () => void;
  theme: Theme;
  primaryColor: PrimaryColor;
}

const Cart: React.FC<CartProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  theme,
  primaryColor,
}) => {
  const navigate = useNavigate();

  const primaryButtonBg =
    primaryColor === "blue" ? "bg-blue-600" : "bg-olive-600";
  const primaryButtonHoverBg =
    primaryColor === "blue" ? "hover:bg-blue-700" : "hover:bg-olive-700";
  const primaryPriceColor =
    primaryColor === "blue" ? "text-blue-700" : "text-olive-700";

  const calculateTotal = () => {
    return cart
      .reduce(
        (sum, item) =>
          sum + parseFloat(item.price.replace("R", "")) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className=" container mx-auto px-6 py-8 md:px-8 lg:px-12">
      <h2
        className={`dark:text-white text-3xl font-bold mb-8 text-center ${
          theme === "dark" ? "dark-mode-text" : "text-gray-900"
        }`}
      >
        Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div
          className={`dark:bg-gray-700 bg-gray-300 text-center text-lg p-8 rounded-xl shadow-md ${
            theme === "dark"
              ? "dark-mode-card dark-mode-text"
              : "bg-white text-gray-600"
          }`}
        >
          Your cart is empty.
          <button
            onClick={handleContinueShopping}
            className={`mt-6 ml-6 ${primaryButtonBg} text-white font-semibold py-3 px-8 rounded-lg shadow-md ${primaryButtonHoverBg} transition duration-300 ease-in-out`}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div
          className={`dark:bg-gray-700 rounded-xl shadow-lg p-6 ${
            theme === "dark" ? "dark-mode-card" : "bg-white"
          }`}
        >
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0 ${
                  theme === "dark" ? "dark-mode-border" : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h4
                      className={`dark:text-white font-semibold text-lg ${
                        theme === "dark" ? "dark-mode-text" : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </h4>
                    <p
                      className={`${primaryPriceColor} dark:text-white font-bold`}
                    >
                      {item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center border rounded-md ${
                      theme === "dark" ? "dark-mode-border" : "border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className={`dark:text-white px-3 py-1 ${
                        theme === "dark"
                          ? "dark-mode-text hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      } disabled:opacity-50`}
                    >
                      -
                    </button>
                    <span
                      className={`dark:text-white px-3 py-1 border-x ${
                        theme === "dark"
                          ? "dark-mode-border dark-mode-text"
                          : "border-gray-300"
                      }`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="dark:text-white px-3 py-1 text-gray-700 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center mt-8 pt-4 border-t border-gray-200">
            <p className="dark:text-white text-2xl font-bold text-gray-900">
              Total: R{calculateTotal()}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
            <button
              onClick={handleContinueShopping}
              className="bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 ease-in-out"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleProceedToCheckout}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
