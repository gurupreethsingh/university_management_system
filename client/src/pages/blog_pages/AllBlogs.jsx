import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaArrowLeft,
  FaArrowRight,
  FaCalendar,
  FaTags,
  FaUser,
} from "react-icons/fa";

const initialBlogs = [
  {
    id: 1,
    title: "Understanding React Components",
    author: "Jane Doe",
    coverImage: "https://via.placeholder.com/150",
    category: "React",
    tags: ["JavaScript", "React", "Frontend"],
    timestamp: "2024-08-25 10:00 AM",
    excerpt: "Learn how to create reusable components in React...",
  },
  {
    id: 2,
    title: "Advanced CSS Techniques",
    author: "John Smith",
    coverImage: "https://via.placeholder.com/150",
    category: "CSS",
    tags: ["CSS", "Design", "Frontend"],
    timestamp: "2024-08-24 09:30 AM",
    excerpt: "Explore advanced CSS methods to create stunning layouts...",
  },

  {
    id: 3,
    title: "Advanced JAVA Techniques",
    author: "John Smith",
    coverImage: "https://via.placeholder.com/150",
    category: "CSS",
    tags: ["CSS", "Design", "Frontend"],
    timestamp: "2024-08-24 09:30 AM",
    excerpt: "Explore advanced CSS methods to create stunning layouts...",
  },

  {
    id: 4,
    title: "Advanced MERN STACK Techniques",
    author: "John Smith",
    coverImage: "https://via.placeholder.com/150",
    category: "REACT",
    tags: ["CSS", "Design", "Frontend"],
    timestamp: "2024-08-24 09:30 AM",
    excerpt: "Explore advanced CSS methods to create stunning layouts...",
  },
  // Add more blogs as needed
];

const itemsPerPage = 6;

export default function AllBlogs() {
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(
    initialBlogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = initialBlogs
      .filter(
        (blog) =>
          blog.title.toLowerCase().includes(value) ||
          blog.author.toLowerCase().includes(value) ||
          blog.category.toLowerCase().includes(value) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(value))
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
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
        <h2 className="text-2xl font-bold text-gray-900">Blogs</h2>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search blogs..."
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
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {paginatedBlogs.map((blog) => (
          <Link key={blog.id} to={`/blog/${blog.id}`}>
            <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-48 object-cover mb-4"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <FaCalendar className="mr-1" />
                  {blog.timestamp}
                </p>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <FaUser className="mr-1" />
                  {blog.author}
                </p>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <FaTags className="mr-1" />
                  {blog.tags.join(", ")}
                </p>
                <p className="text-gray-700">{blog.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No blogs found.</p>
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
