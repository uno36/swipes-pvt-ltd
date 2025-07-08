// ✅ MODIFIED: all Tailwind classes that depended on theme colors are now dynamic via variables
import React, { useState } from "react";
import type { CartItem } from "../types";
import { useNavigate } from "react-router-dom";
import type { Theme, PrimaryColor } from "../types";

interface CheckoutProps {
  cart: CartItem[];
  onPaymentSuccess: () => void;
  onPaymentFailure: () => void;
  onBackToCart: () => void;
  onGoToHome: () => void;
  theme: Theme;
  primaryColor: PrimaryColor;
}

const Checkout: React.FC<CheckoutProps> = ({
  cart,
  onPaymentSuccess,
  onPaymentFailure,
  // theme,
  primaryColor,
}) => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("credit_card");
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "failure"
  >("idle");
  const [message, setMessage] = useState<string>("");

  const primaryTotalColor =
    primaryColor === "blue" ? "text-blue-700" : "text-olive-700";
  const primaryRadioColor =
    primaryColor === "blue" ? "text-blue-600" : "text-olive-600";
  const primaryButtonBg =
    primaryColor === "blue" ? "bg-blue-600" : "bg-olive-600";
  const primaryButtonHoverBg =
    primaryColor === "blue" ? "hover:bg-blue-700" : "hover:bg-olive-700";

  const calculateTotal = () => {
    return cart
      .reduce(
        (sum, item) =>
          sum + parseFloat(item.price.replace("R", "")) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handlePayment = async () => {
    setPaymentStatus("processing");
    setMessage("Processing your payment...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        setPaymentStatus("success");
        setMessage("Payment successful! Thank you for your purchase.");
        onPaymentSuccess();
      } else {
        setPaymentStatus("failure");
        setMessage(
          "Payment failed. Please try again or choose another method."
        );
        onPaymentFailure();
      }
    } catch (error) {
      setPaymentStatus("failure");
      setMessage("An unexpected error occurred during payment.");
      console.error("Payment error:", error);
      onPaymentFailure();
    }
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  if (cart.length === 0 && paymentStatus !== "success") {
    return (
      <div className="container mx-auto px-6 py-8 md:px-8 lg:px-12 text-center">
        <h2 className="dark:text-white text-3xl font-bold text-gray-900 mb-4">
          Your cart is empty.
        </h2>
        <p className="dark:text-white text-gray-600 mb-8">
          Please add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={handleGoToHome}
          className={`${primaryButtonBg} ${primaryButtonHoverBg} text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out`}
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 md:px-8 lg:px-12">
      <h2 className="dark:text-white text-3xl font-bold text-gray-900 mb-8 text-center">
        Checkout
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="dark:bg-gray-700 lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h3 className="dark:text-white text-2xl font-bold text-gray-900 mb-6">
            Order Summary
          </h3>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-100 pb-2"
              >
                <p className="dark:text-white text-gray-700">
                  {item.name} x {item.quantity}
                </p>
                <p className="dark:text-white text-gray-900 font-medium">
                  R
                  {(
                    parseFloat(item.price.replace("R", "")) * item.quantity
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <p className="dark:text-white text-xl font-bold text-gray-900">
              Total:
            </p>
            <p
              className={`dark:text-white text-xl font-bold ${primaryTotalColor}`}
            >
              R{calculateTotal()}
            </p>
          </div>
        </div>

        <div className="dark:bg-gray-700 lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
          <h3 className="dark:text-white text-2xl font-bold text-gray-900 mb-6">
            Payment Method
          </h3>

          <div className="space-y-4">
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={selectedPaymentMethod === "credit_card"}
                onChange={() => setSelectedPaymentMethod("credit_card")}
                className={`dark:text-white form-radio h-5 w-5 ${primaryRadioColor}`}
              />
              <span className="dark:text-white ml-3 text-gray-800 font-medium">
                Credit Card
              </span>
            </label>
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={selectedPaymentMethod === "paypal"}
                onChange={() => setSelectedPaymentMethod("paypal")}
                className={`dark:text-white form-radio h-5 w-5 ${primaryRadioColor}`}
              />
              <span className="dark:text-white ml-3 text-gray-800 font-medium">
                PayPal
              </span>
            </label>
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150">
              <input
                type="radio"
                name="paymentMethod"
                value="eft"
                checked={selectedPaymentMethod === "eft"}
                onChange={() => setSelectedPaymentMethod("eft")}
                className={`dark:text-white form-radio h-5 w-5 ${primaryRadioColor}`}
              />
              <span className="dark:text-white ml-3 text-gray-800 font-medium">
                Instant EFT
              </span>
            </label>
          </div>

          <button
            onClick={handlePayment}
            disabled={paymentStatus === "processing"}
            className={`w-full ${primaryButtonBg} text-white font-semibold py-3 px-8 rounded-lg shadow-md ${primaryButtonHoverBg} transition duration-300 ease-in-out mt-8 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {paymentStatus === "processing"
              ? "Processing..."
              : `Pay R${calculateTotal()}`}
          </button>

          {message && (
            <div
              className={`mt-4 p-3 rounded-md text-sm text-center ${
                paymentStatus === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {paymentStatus === "success" && (
            <button
              onClick={handleGoToHome}
              className={`w-full ${primaryButtonBg} text-white font-semibold py-3 px-8 rounded-lg shadow-md ${primaryButtonHoverBg} transition duration-300 ease-in-out mt-4`}
            >
              Back to Shop
            </button>
          )}
          {paymentStatus === "failure" && (
            <button
              onClick={handleBackToCart}
              className="w-full bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 ease-in-out mt-4"
            >
              Back to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
