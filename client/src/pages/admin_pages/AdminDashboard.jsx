import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaChalkboardTeacher,
  FaUsers,
  FaCalendarAlt,
  FaSearch,
  FaPlus,
  FaReply,
  FaRegListAlt,
  FaTh,
  FaThLarge,
  FaUserPlus,
  FaUserGraduate,
  FaUserTie,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [counts, setCounts] = useState({});
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === "object") {
          setUser(parsedUser);
        } else {
          setError("Invalid user data. Please log in again.");
        }
      } else {
        setError("No user data found. Please log in again.");
      }
    } catch (err) {
      console.error("Failed to parse user data:", err);
      setError("Failed to load user data. Please log in again.");
    }
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/admin-dashboard/counts"
        );
        console.log("Received Counts:", res.data);
        setCounts(res.data);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []); // This useEffect runs once after the component mounts

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/admin-dashboard/users"
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []); // This useEffect runs once after the component mounts

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the Admin Dashboard, {user.name}
      </h1>

      {/* Count Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded shadow">
          <FaUsers className="text-3xl mb-2" />
          <h2 className="text-lg">Total Users</h2>
          <p className="text-2xl">{counts.totalUsers || 0}</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded shadow">
          <FaUserTie className="text-3xl mb-2" />
          <h2 className="text-lg">Total Admins</h2>
          <p className="text-2xl">{counts.totalAdmins || 0}</p>
        </div>
        <div className="p-4 bg-purple-500 text-white rounded shadow">
          <FaChalkboardTeacher className="text-3xl mb-2" />
          <h2 className="text-lg">Total Teachers</h2>
          <p className="text-2xl">{counts.totalTeachers || 0}</p>
        </div>
        <div className="p-4 bg-yellow-500 text-white rounded shadow">
          <FaUserGraduate className="text-3xl mb-2" />
          <h2 className="text-lg">Total Students</h2>
          <p className="text-2xl">{counts.totalStudents || 0}</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded shadow">
          <FaCalendarAlt className="text-3xl mb-2" />
          <h2 className="text-lg">Total Events</h2>
          <p className="text-2xl">{counts.totalEvents || 0}</p>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        <Link
          to="/admin/add-admin"
          className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
        >
          <FaUserPlus className="text-3xl text-indigo-600 mb-2" />
          <h2 className="text-lg font-semibold">Add Admin</h2>
          <p className="text-sm">Manage and add new admin users.</p>
        </Link>
        <Link
          to="/admin/add-teacher"
          className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
        >
          <FaUserPlus className="text-3xl text-teal-600 mb-2" />
          <h2 className="text-lg font-semibold">Add Teacher</h2>
          <p className="text-sm">Manage and add new teachers.</p>
        </Link>
        <Link
          to="/admin/add-student"
          className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
        >
          <FaUserPlus className="text-3xl text-yellow-600 mb-2" />
          <h2 className="text-lg font-semibold">Add Student</h2>
          <p className="text-sm">Manage and add new students.</p>
        </Link>
        <Link
          to="/admin/add-exam"
          className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
        >
          <FaPlus className="text-3xl text-red-600 mb-2" />
          <h2 className="text-lg font-semibold">Add Exam</h2>
          <p className="text-sm">Create and manage exams.</p>
        </Link>
        <Link
          to="/admin/reply-messages"
          className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
        >
          <FaReply className="text-3xl text-blue-600 mb-2" />
          <h2 className="text-lg font-semibold">Reply to Messages</h2>
          <p className="text-sm">Respond to contact form messages.</p>
        </Link>
        <Link
          to="/admin/view-messages"
          className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
        >
          <FaEnvelopeOpenText className="text-3xl text-green-600 mb-2" />
          <h2 className="text-lg font-semibold">View Messages</h2>
          <p className="text-sm">View all contact form messages.</p>
        </Link>
        {/* Add more admin action cards as needed */}
      </div>

      {/* User List with Search and View Options */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">All Activities</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded ml-2"
          />
          <FaSearch className="text-gray-500" />
          <button
            className={`p-2 ${viewMode === "list" ? "bg-gray-300" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <FaRegListAlt />
          </button>
          <button
            className={`p-2 ${viewMode === "grid" ? "bg-gray-300" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <FaTh />
          </button>
          <button
            className={`p-2 ${viewMode === "cards" ? "bg-gray-300" : ""}`}
            onClick={() => setViewMode("cards")}
          >
            <FaThLarge />
          </button>
        </div>
      </div>

      {/* User Display */}
      <div
        className={`grid gap-4 ${
          viewMode === "list"
            ? "grid-cols-1"
            : viewMode === "grid"
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {currentUsers.map((user) => (
          <Link
            key={user.id}
            to={`/admin/users/${user.id}`}
            className="pb-4 bg-white rounded shadow hover:bg-gray-100 transition"
          >
            <div
              className={`flex ${
                viewMode === "list" ? "flex-row" : "flex-col"
              } items-center`}
            >
              <img
                src={user.avatar || "https://via.placeholder.com/150"}
                alt={user.name}
                className={`${
                  viewMode === "list" ? "w-16 h-16 mr-4" : "w-full h-auto mb-4"
                } rounded-lg object-cover`}
              />
              <div
                className={`${viewMode === "list" ? "flex-1" : "text-center"}`}
              >
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.role}</p>
                <p className="text-sm text-gray-500">Email: {user.email}</p>
                {/* Add more fields as necessary */}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ul className="inline-flex -space-x-px">
          {[
            ...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys(),
          ].map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => paginate(pageNumber + 1)}
                className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                  currentPage === pageNumber + 1 ? "bg-gray-200" : ""
                }`}
              >
                {pageNumber + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
