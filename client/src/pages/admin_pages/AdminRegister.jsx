import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // Automatically set role to "admin"
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};

    // Name validation: cannot be only spaces
    if (!formData.name.trim()) {
      formErrors.name = "Name cannot be only spaces.";
    }

    // Email validation: cannot have spaces and must follow email format
    if (!formData.email || /\s/.test(formData.email)) {
      formErrors.email = "Email cannot contain spaces.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
    }

    // Password validation: min 6 characters, 1 lowercase, 1 uppercase, 1 number, 1 special character, no spaces
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!formData.password) {
      formErrors.password = "Password is required.";
    } else if (/\s/.test(formData.password)) {
      formErrors.password = "Password cannot contain spaces.";
    } else if (!passwordRegex.test(formData.password)) {
      formErrors.password =
        "Password must be at least 6 characters long and include 1 lowercase, 1 uppercase, 1 number, and 1 special character.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/admin-register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSuccessMessage("Registration successful!");
          setFormData({
            name: "",
            email: "",
            password: "",
            role: "admin",
          });
          setErrors({});
          alert("Registeration Successfull.");
          navigate("/admin-login");
        } else {
          const errorData = await response.json();
          setErrors({ submit: errorData.message || "Registration failed." });
        }
      } catch (error) {
        setErrors({ submit: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register as admin
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register as admin
              </button>
              {errors.submit && (
                <p className="mt-2 text-sm text-red-600">{errors.submit}</p>
              )}
              {successMessage && (
                <p className="mt-2 text-sm text-green-600">{successMessage}</p>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already an admin?{" "}
            <a
              href="/admin-login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in as admin
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
