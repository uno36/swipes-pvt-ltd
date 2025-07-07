// src/components/ContactUs.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactUs: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
    alert("Message sent successfully!");
    reset();
  };

  return (
    <div className="container mx-auto px-6 py-8 md:px-8 lg:px-12 bg-white rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Contact Us
      </h2>
      <div className="prose max-w-none text-gray-700">
        <p className="mb-4">
          We're here to help! Whether you have a question about our products,
          need assistance with an order, or simply want to provide feedback, our
          team is ready to assist you.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Get in Touch
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Customer Service
            </h4>
            <p className="mb-1">
              <strong>Cell:</strong> +263 773 040 201 (Mon-Fri, 8 AM - 5 PM
              SAST)
            </p>
            <p className="mb-1">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@swipes.co.za"
                className="text-blue-600 hover:underline"
              >
                support@swipes.co.za
              </a>
            </p>
            <p className="text-sm text-gray-500">
              For general inquiries, order status, or product information.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Head Office
            </h4>
            <p className="mb-1">Swipes (Pvt) Ltd.</p>
            <p className="mb-1">123 Health & Wellness Drive</p>
            <p className="mb-1">Durban, KwaZulu-Natal, 4001</p>
            <p className="mb-1">South Africa</p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Send Us a Message
        </h3>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              {...register("subject")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Inquiry about an order"
            />
            {errors.subject && (
              <p className="text-red-600 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Message
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="Type your message here..."
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
