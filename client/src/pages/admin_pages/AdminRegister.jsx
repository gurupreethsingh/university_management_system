<<<<<<< HEAD
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
=======
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

export default function AdminRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Name validation
  const validateName = (name) => {
    return name.trim() !== '' && !/^\s+$/.test(name);
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && !/\s/.test(email);
  };

  // Password validation with your provided regex
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,}$/;
    return passwordRegex.test(password) && !/\s/.test(password); // No spaces allowed
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(name)) {
      setError('Name cannot be empty or only spaces.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address without spaces.');
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long, with one lowercase, one uppercase, one number, and one special character. No spaces are allowed.'
      );
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/admin-register', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccess('Admin registered successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setError('');
        alert("Admin created successfully.");
        navigate("/admin-login");
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      setSuccess('');
>>>>>>> dc2ace9315d4efe8d2f8004668d9141ff9e736b9
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <MdOutlineAdminPanelSettings className="text-indigo-600 mx-auto mb-2" size={48} /> 
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register as Admin
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 flex items-center"
              >
                <FaUser className="text-green-500 mr-2" /> Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                className="block text-sm font-medium leading-6 text-gray-900 flex items-center"
              >
                <FaEnvelope className="text-blue-500 mr-2" /> Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
<<<<<<< HEAD
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
=======
                className="block text-sm font-medium leading-6 text-gray-900 flex items-center"
              >
                <FaLock className="text-red-500 mr-2" /> Password
>>>>>>> dc2ace9315d4efe8d2f8004668d9141ff9e736b9
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {error && <div className="text-red-600">{error}</div>}
            {success && <div className="text-green-600">{success}</div>}

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
<<<<<<< HEAD
            Already an admin?{" "}
=======
            Already an admin?{' '}
>>>>>>> dc2ace9315d4efe8d2f8004668d9141ff9e736b9
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
