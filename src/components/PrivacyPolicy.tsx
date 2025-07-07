const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8 md:px-8 lg:px-12 bg-white rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Privacy Policy
      </h2>
      <div className="prose max-w-none text-gray-700">
        <p className="text-sm text-gray-500 mb-6">Last updated: July 7, 2025</p>

        <p className="mb-4">
          At <strong>Swipes Pvt Ltd</strong>, we are committed to protecting
          your privacy. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website
          and use our services.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Information We Collect
        </h3>
        <p className="mb-4">
          We may collect personal information that you voluntarily provide to us
          when you register on the website, place an order, subscribe to our
          newsletter, respond to a survey, or fill out a form. This information
          may include:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Name, address, email address, phone number</li>
          <li>
            Payment information (e.g., credit card details, though we do not
            store full card numbers)
          </li>
          <li>Demographic information (e.g., age, gender)</li>
          <li>
            Health-related information you choose to provide (e.g., when using
            the AI Health Assistant)
          </li>
        </ul>
        <p className="mb-4">
          We also automatically collect certain information when you visit, use,
          or navigate the website, such as your IP address, browser type, device
          type, operating system, and browsing activity.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          How We Use Your Information
        </h3>
        <p className="mb-4">
          We use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>To process your orders and manage your account.</li>
          <li>To provide, operate, and maintain our website and services.</li>
          <li>To improve our products, services, and user experience.</li>
          <li>
            To send you promotional communications, newsletters, and special
            offers (with your consent).
          </li>
          <li>To respond to your inquiries and provide customer support.</li>
          <li>
            To monitor and analyze usage and trends to improve your experience.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Disclosure of Your Information
        </h3>
        <p className="mb-4">
          We may share your information with third parties in the following
          situations:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            <strong>Service Providers:</strong> With vendors, consultants, and
            other third-party service providers who perform services on our
            behalf.
          </li>
          <li>
            <strong>Business Transfers:</strong> In connection with, or during
            negotiations of, any merger, sale of company assets, financing, or
            acquisition of all or a portion of our business to another company.
          </li>
          <li>
            <strong>Legal Requirements:</strong> If required to do so by law or
            in response to valid requests by public authorities.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Your Data Protection Rights
        </h3>
        <p className="mb-4">
          Depending on your location, you may have the following rights
          regarding your personal data:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>The right to access your personal data.</li>
          <li>The right to request correction of inaccurate data.</li>
          <li>The right to request erasure of your personal data.</li>
          <li>The right to object to processing of your personal data.</li>
          <li>The right to data portability.</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the
          information provided in our Contact Us section.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
