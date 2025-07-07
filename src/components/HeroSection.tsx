const HeroSection: React.FC = () => {
  return (
    <section className=" bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl shadow-lg p-8 mb-12 text-white text-center">
      <h2 className="text-4xl font-extrabold mb-4">
        Your Satisfaction, Our Priority
      </h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto">
        Your one stop shop for Wellness, Health, Beauty & Baby products{" "}
        <br></br> Get in touch: +263 773 040 201
      </p>
      <button className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105">
        Shop Now
      </button>
    </section>
  );
};

export default HeroSection;
