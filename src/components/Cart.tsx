import type { CartItem } from "../types";
import { useNavigate } from "react-router-dom";

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onContinueShopping: () => void;
  onProceedToCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const navigate = useNavigate();

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
    <div className="container mx-auto px-6 py-8 md:px-8 lg:px-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 text-lg p-8 bg-white rounded-xl shadow-md">
          Your cart is empty.
          <button
            onClick={handleContinueShopping}
            className="mt-6 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-blue-700 font-bold">{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-x border-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 text-gray-700 hover:bg-gray-100"
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
            <p className="text-2xl font-bold text-gray-900">
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
