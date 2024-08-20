import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaArrowLeft,
  FaArrowRight,
  FaEnvelope,
  FaUser,
  FaClock,
} from "react-icons/fa";

const initialMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Inquiry about services",
    message: "Can you tell me more about your services?",
    timestamp: "2024-08-25 10:00 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Feedback on website",
    message: "Your website is fantastic!",
    timestamp: "2024-08-24 09:30 AM",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    subject: "Job Opportunity",
    message: "I would like to apply for the job posted.",
    timestamp: "2024-08-23 08:45 AM",
  },
  // Add more messages as needed
];

const itemsPerPage = 5;

export default function MessagesList() {
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMessages, setFilteredMessages] = useState(
    initialMessages.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    )
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = initialMessages
      .filter(
        (message) =>
          message.name.toLowerCase().includes(value) ||
          message.email.toLowerCase().includes(value) ||
          message.subject.toLowerCase().includes(value) ||
          message.message.toLowerCase().includes(value)
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setFilteredMessages(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const paginatedMessages = filteredMessages.slice(
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
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-64 rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
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
        {paginatedMessages.map((message) => (
          <Link key={message.id} to={`/reply-message/${message.id}`}>
            <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
              <h3 className="text-lg font-bold text-gray-700 flex items-center">
                <FaEnvelope className="mr-2" /> {message.subject}
              </h3>
              <p className="mt-2 text-sm text-gray-600 flex items-center">
                <FaUser className="mr-2 text-blue-500" /> {message.name} (
                {message.email})
              </p>
              <p className="mt-2 text-sm text-gray-600">{message.message}</p>
              <p className="mt-2 text-sm text-gray-500 flex items-center">
                <FaClock className="mr-2 text-green-500" /> {message.timestamp}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No messages found.</p>
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
}
