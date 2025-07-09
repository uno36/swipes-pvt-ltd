// src/components/Footer.tsx
import { Link } from "react-router-dom";
import type { PrimaryColor, Theme } from "../types";

interface FooterProps {
  theme: Theme;
  primaryColor: PrimaryColor; // Add primaryColor prop
}

const Footer: React.FC<FooterProps> = ({ theme, primaryColor }) => {
  const footerBgClass =
    theme === "dark"
      ? "dark-mode-footer"
      : primaryColor === "blue"
      ? "bg-gray-900"
      : "bg-olive-900";
  const textColorClass = theme === "dark" ? "text-gray-300" : "text-gray-400";
  const copyrightTextColorClass =
    theme === "dark" ? "text-gray-400" : "text-gray-500";

  return (
    <footer
      className={`py-8 px-6 md:px-8 lg:px-12 mt-12 ${footerBgClass} ${
        theme === "dark" ? "text-gray-100" : "text-white"
      }`}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-bold text-lg mb-4">Swipes Pvt Ltd</h4>
          <p className="text-gray-400 text-sm">
            Your trusted partner in health, wellness and beauty. Providing
            quality products and services.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/about"
                className={`hover:text-blue-400 transition duration-200 ease-in-out ${textColorClass}`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`hover:text-blue-400 transition duration-200 ease-in-out ${textColorClass}`}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className={`hover:text-blue-400 transition duration-200 ease-in-out ${textColorClass}`}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className={`hover:text-blue-400 transition duration-200 ease-in-out ${textColorClass}`}
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a
              href="#"
              className={`hover:text-blue-400 transition duration-200 ease-in-out ${textColorClass}`}
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.779 1.63 4.938 4.938.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.148 3.252-1.63 4.779-4.938 4.938-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.779-1.63-4.938-4.938-.058-1.265-.07-1.645-.07-4.85s.012-3.584.07-4.85c.148-3.252 1.63-4.779 4.938-4.938 1.265-.058 1.645-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073 3.259 0 3.668-.014 4.947-.072 4.358-.2 6.78-2.618 6.98-6.98.058-1.281.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.444.647-1.444 1.444s.647 1.444 1.444 1.444 1.444-.647 1.444-1.444-.647-1.444-1.444-1.444z" />
              </svg>
            </a>
            <a
              href="#"
              className={`hover:text-blue-400 transition duration-200 ease-in-out ${textColorClass}`}
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M22.46 6c-.85.38-1.78.64-2.75.76.98-.58 1.74-1.5 2.1-2.6-.92.55-1.94.95-3.02 1.17C17.77 3.9 16.51 3.25 15.1 3.25c-2.6 0-4.7 2.1-4.7 4.7 0 .37.04.73.11 1.08C7.5 9.17 4.5 7.5 2.45 4.75c-.4.68-.63 1.47-.63 2.3 0 1.63.83 3.06 2.09 3.9-.77-.02-1.49-.23-2.12-.58v.06c0 2.28 1.62 4.17 3.77 4.6-.39.1-.8.15-1.22.15-.3 0-.58-.03-.86-.08.6 1.87 2.34 3.23 4.4 3.27-1.6 1.25-3.6 2-5.78 2-.38 0-.75-.02-1.12-.06C2.9 20.3 5.3 21 7.9 21c7.7 0 11.9-6.4 11.9-11.9 0-.18-.01-.37-.01-.55.82-.59 1.53-1.32 2.09-2.16z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition duration-200 ease-in-out"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-3V8h3v8zm-1.5-9.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm7.5 9.5h-3v-5c0-1.38-1.12-2.5-2.5-2.5S8 9.62 8 11v5H5V8h3v1.5c.46-.744 1.42-1.5 3.5-1.5 2.76 0 5 2.24 5 5v5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div
        className={`text-center text-sm mt-8 border-t pt-4 ${copyrightTextColorClass} ${
          theme === "dark" ? "border-gray-700" : "border-gray-700"
        }`}
      >
        &copy; {new Date().getFullYear()} Swipes Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
