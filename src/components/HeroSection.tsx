import type { PrimaryColor } from "../types";

interface HeroSectionProps {
  primaryColor: PrimaryColor;
}

const HeroSection: React.FC<HeroSectionProps> = ({ primaryColor }) => {
  const gradientFrom =
    primaryColor === "blue" ? "from-blue-700" : "from-olive-700";
  const gradientTo = primaryColor === "blue" ? "to-blue-500" : "to-olive-500";
  const buttonTextColor =
    primaryColor === "blue" ? "text-blue-700" : "text-olive-700";
  const buttonHoverBg =
    primaryColor === "blue" ? "hover:bg-blue-100" : "hover:bg-olive-100";

  return (
    <section
      className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-xl shadow-lg p-8 mt-14 mb-12 text-white text-center max-w-7xl mx-auto`}
    >
      <h2 className="text-4xl font-extrabold mb-4">
        Your Satisfaction, Our Priority
      </h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto">
        Your one stop shop for Wellness, Health, Beauty & Baby products <br />{" "}
        Get in touch: +263 773 040 201
      </p>
      <button
        className={`bg-white ${buttonTextColor} font-semibold py-3 px-8 rounded-full shadow-md ${buttonHoverBg} transition duration-300 ease-in-out transform hover:scale-105`}
      >
        Shop Now
      </button>
    </section>
  );
};

export default HeroSection;
