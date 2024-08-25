import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserPlus,
  FaChalkboardTeacher,
  FaUsers,
  FaCalendarAlt,
  FaSearch,
  FaPlus,
  FaReply,
  FaRegListAlt,
  FaTh,
  FaThLarge,
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
        setUser(JSON.parse(storedUser));
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
        setCounts(res.data);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []);

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
  }, []);

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
    <div className="p-4 sm:p-6 md:px-8 lg:px-12 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the Admin Dashboard, {user.name}
      </h1>
      {/* Count Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
        {[
          {
            icon: FaUsers,
            title: "Total Users",
            count: counts.totalUsers || 0,
            iconColor: "text-blue-500",
          },
          {
            icon: FaUserTie,
            title: "Total Admins",
            count: counts.totalAdmins || 0,
            iconColor: "text-green-500",
          },
          {
            icon: FaChalkboardTeacher,
            title: "Total Teachers",
            count: counts.totalTeachers || 0,
            iconColor: "text-purple-500",
          },
          {
            icon: FaUserGraduate,
            title: "Total Students",
            count: counts.totalStudents || 0,
            iconColor: "text-yellow-500",
          },
          {
            icon: FaCalendarAlt,
            title: "Total Events",
            count: counts.totalEvents || 0,
            iconColor: "text-red-500",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="p-4 bg-white text-gray-900 rounded shadow flex items-center space-x-2"
          >
            <card.icon className={`text-3xl ${card.iconColor}`} />
            <div>
              <h2 className="text-lg">{card.title}</h2>
              <p className="text-2xl">{card.count}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        <Link
          to="/admin/add-user"
          className="flex flex-col items-center p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition"
        >
          <FaUserPlus className="text-3xl text-green-600 mb-2" />
          <h2 className="text-lg font-semibold">Add User</h2>
          <p className="text-sm">Add new admins, teachers, or students.</p>
        </Link>
        <Link
          to="/admin/manage-courses"
          className="flex flex-col items-center p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition"
        >
          <FaChalkboardTeacher className="text-3xl text-blue-600 mb-2" />
          <h2 className="text-lg font-semibold">Manage Courses</h2>
          <p className="text-sm">Assign and manage courses.</p>
        </Link>
        <Link
          to="/admin/reports"
          className="flex flex-col items-center p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition"
        >
          <FaEnvelopeOpenText className="text-3xl text-red-600 mb-2" />
          <h2 className="text-lg font-semibold">View Reports</h2>
          <p className="text-sm">Access system reports and analytics.</p>
        </Link>
        <Link
          to="/admin/settings"
          className="flex flex-col items-center p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition"
        >
          <FaThLarge className="text-3xl text-purple-600 mb-2" />
          <h2 className="text-lg font-semibold">Settings</h2>
          <p className="text-sm">Adjust system settings.</p>
        </Link>
      </div>
      {/* User List with Search and View Options */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">All Users</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded"
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
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6" // Adjusted for mobile compatibility
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
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ul className="inline-flex -space-x-px">
          {Array.from(
            { length: Math.ceil(filteredUsers.length / usersPerPage) },
            (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                    currentPage === index + 1 ? "bg-gray-200" : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
