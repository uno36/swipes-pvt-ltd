const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8 md:px-8 lg:px-12 bg-white rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        About Swipes Pvt Ltd
      </h2>
      <div className="prose max-w-none text-gray-700">
        <p className="mb-4">
          Welcome to <strong>Swipes Pvt Ltd</strong>, your dedicated partner in
          health, wellness, and beauty. Inspired by the trusted legacy of
          <strong>Swipes Pvt Ltd</strong>, we strive to offer a comprehensive
          range of products and services designed to meet your everyday needs
          with convenience and care.
        </p>
        <p className="mb-4">
          Our journey began with a vision to replicate the exceptional customer
          experience and diverse product offering that defines leading
          pharmaceutical retailers. We are committed to providing high-quality
          health, beauty, and household essentials, ensuring that you have
          access to everything you need for a healthier and happier life.
        </p>
        <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Our Mission
        </h3>
        <p className="mb-4">
          To empower individuals to take control of their health and well-being
          by offering accessible, affordable, and high-quality products, coupled
          with reliable information and excellent service.
        </p>
        <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Our Values
        </h3>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            <strong>Integrity:</strong> Upholding the highest ethical standards
            in all our interactions.
          </li>
          <li>
            <strong>Customer Focus:</strong> Prioritizing your needs and
            striving to exceed your expectations.
          </li>
          <li>
            <strong>Excellence:</strong> Continuously improving our offerings
            and services.
          </li>
          <li>
            <strong>Community:</strong> Contributing positively to the
            well-being of the communities we serve.
          </li>
          <li>
            <strong>Innovation:</strong> Embracing new technologies and ideas to
            enhance your experience.
          </li>
        </ul>
        <p>
          Thank you for choosing <strong>Swipes Pvt Ltd</strong>. We look
          forward to serving you and becoming a valuable part of your health and
          wellness journey.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
