"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios for HTTP requests
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaComment,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Switch } from "@headlessui/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message_text: '',
    agreeToLicense: false,
  });

  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/add-contact-message', formData);
      if (response.status === 201) {
        setSubmitted(true);
        alert('Message successfully sent! You will be notified, within 24 hours.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message_text: '',
          agreeToLicense: false,
        });
         navigate("/all-messages");
      }
    } catch (error) {
      console.error('Error submitting contact message:', error);
      alert('There was an issue submitting your message. Please try again.');
    }
  };

  return (
    <div className="isolate bg-white px-6 py-12 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Google Map */}
        <div className="order-1 lg:order-none">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7083202851363!2d77.50447077507788!3d13.054228987268758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae23460634f221%3A0x2a27c0c9577a1841!2sEcoders!5e0!3m2!1sen!2sin!4v1724232609612!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-64 sm:h-80 md:h-96"
            title="Google Map"
          ></iframe>

          {/* Company Address */}
          <div className="mt-8 text-center lg:text-left">
            <h3 className="text-lg font-bold text-gray-900">Our Address</h3>
            <p className="mt-4 text-gray-600 flex flex-col lg:flex-row items-center justify-center lg:justify-start">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              Ecoders, 123 Main Street, Bangalore. Karnataka, 560073
            </p>
            <p className="mt-1 text-gray-600 flex flex-col lg:flex-row items-center justify-center lg:justify-start">
              <FaPhone className="mr-2 text-yellow-500" /> +91 9538596766
            </p>
            <p className="mt-1 text-gray-600 flex flex-col lg:flex-row items-center justify-center lg:justify-start">
              <FaEnvelope className="mr-2 text-red-500" /> igurupreeth@gmail.com
            </p>
          </div>
        </div>


        {/* Contact Form */}
        <div className="order-2 lg:order-none space-y-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center lg:text-left">
              Contact Us
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="relative">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2.5 relative flex items-center">
                  <FaUser className="absolute left-3 text-blue-500" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 pl-10 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2.5 relative flex items-center">
                  <FaUser className="absolute left-3 text-green-500" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 pl-10 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="relative sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2.5 relative flex items-center">
                  <FaEnvelope className="absolute left-3 text-red-500" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 pl-10 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div className="relative sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2.5 relative flex items-center">
                  <FaPhone className="absolute left-3 text-yellow-500" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 pl-10 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div className="relative sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2.5 relative flex items-center">
                  <FaComment className="absolute left-3 text-teal-500" />
                  <textarea
                    id="message_text"
                    name="message_text"
                    rows={4}
                    value={formData.message_text}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 pl-10 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={formData.agreeToLicense}
                    onChange={(checked) =>
                      setFormData({ ...formData, agreeToLicense: checked })
                    }
                    className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
                  >
                    <span className="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                    />
                  </Switch>
                </div>
                <label className="text-sm leading-6 text-gray-600">
                  By selecting this, you agree to our{" "}
                  <a
                    href="/privacy-policy"
                    className="font-semibold text-indigo-600"
                  >
                    privacy policy
                  </a>
                  .
                </label>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Let's talk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
