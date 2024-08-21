import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaSearch,
  FaQuestion,
  FaReply,
  FaArrowLeft,
  FaArrowRight,
  FaEnvelope,
  FaUser,
  FaRegClock,
} from "react-icons/fa";

const initialReplies = [
  {
    id: 1,
    question: "Can you tell me more about your services?",
    answer:
      "Yes, we offer a variety of services including web development and design.",
    timestamp: "2024-08-25 10:15 AM",
  },
  {
    id: 2,
    question: "Your website is fantastic!",
    answer: "Thank you for your feedback! We're glad you like it.",
    timestamp: "2024-08-24 11:00 AM",
  },
  {
    id: 3,
    question: "I would like to apply for the job posted.",
    answer: "Please send your resume to hr@example.com.",
    timestamp: "2024-08-23 09:00 AM",
  },
  // Add more replies as needed

  {
    id: 4,
    question: "Can you tell me more about your services?",
    answer:
      "Yes, we offer a variety of services including web development and design.",
    timestamp: "2024-08-25 10:15 AM",
  },
  {
    id: 5,
    question: "Your website is fantastic!",
    answer: "Thank you for your feedback! We're glad you like it.",
    timestamp: "2024-08-24 11:00 AM",
  },
  {
    id: 6,
    question: "I would like to apply for the job posted.",
    answer: "Please send your resume to hr@example.com.",
    timestamp: "2024-08-23 09:00 AM",
  },
  {
  id: 7,
  question: "I would like to apply for the job posted.",
  answer: "Please send your resume to hr@example.com.",
  timestamp: "2024-08-23 09:00 AM",
},
];

const itemsPerPage = 6;

const AllReplies = () => {
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReplies, setFilteredReplies] = useState(
    initialReplies.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = initialReplies
      .filter(
        (reply) =>
          reply.question.toLowerCase().includes(value) ||
          reply.answer.toLowerCase().includes(value)
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setFilteredReplies(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const totalPages = Math.ceil(filteredReplies.length / itemsPerPage);
  const paginatedReplies = filteredReplies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Replies</h2>
        <div className="flex space-x-4 items-center">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search replies..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <FaThList
            className={`cursor-pointer ${
              view === "list" ? "text-indigo-600" : "text-gray-500"
            }`}
            onClick={() => setView("list")}
          />
          <FaThLarge
            className={`cursor-pointer ${
              view === "grid" ? "text-indigo-600" : "text-gray-500"
            }`}
            onClick={() => setView("grid")}
          />
          <FaTh
            className={`cursor-pointer ${
              view === "card" ? "text-indigo-600" : "text-gray-500"
            }`}
            onClick={() => setView("card")}
          />
        </div>
      </div>

      <div
        className={`grid gap-6 ${
          view === "list"
            ? "grid-cols-1"
            : view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {paginatedReplies.map((reply) => (
          <div
            key={reply.id}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <h3 className="text-lg font-bold text-black flex items-center">
              <FaQuestion className="mr-2 text-blue-500" /> {reply.question}
            </h3>
            <p className="mt-2 text-sm text-gray-600 flex items-center">
              <FaReply className="mr-2 text-green-500" /> {reply.answer}
            </p>
            {/* <p className="mt-2 text-sm text-gray-500 flex items-center">
              <FaRegClock className="mr-2 text-red-500" /> {reply.timestamp}
            </p> */}
          </div>
        ))}
      </div>

      {filteredReplies.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No replies found.</p>
      )}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white ${
            currentPage === 1
              ? "bg-gray-300"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          <FaArrowLeft />
          <span>Previous</span>
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          <span>Next</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AllReplies;
