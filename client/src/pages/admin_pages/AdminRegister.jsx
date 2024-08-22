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
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 flex items-center"
              >
                <FaLock className="text-red-500 mr-2" /> Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already an admin?{' '}
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
