import React, { useState, useEffect } from "react";
import {
  FaBookReader,
  FaUserGraduate,
  FaFileAlt,
  FaCalendarCheck,
  FaEnvelopeOpenText,
  FaRegCommentDots,
  FaChalkboard,
  FaClipboardList,
  FaCalendarAlt,
  FaChartBar,
  FaSearch,
  FaRegListAlt,
  FaTh,
  FaThLarge,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [counts, setCounts] = useState({
    totalExams: 12,
    totalEvents: 5,
    timetable: "Updated",
    classes: 8,
  });
  const [exams, setExams] = useState({
    latest: "Math Final",
    previous: "History Midterm",
    upcoming: "Science Preliminary",
  });
  const [allExams, setAllExams] = useState([
    { id: 1, name: "Math Final", date: "2024-09-10" },
    { id: 2, name: "History Midterm", date: "2024-08-15" },
    { id: 3, name: "Science Preliminary", date: "2024-10-05" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [error, setError] = useState(null);
  const [newExam, setNewExam] = useState(true); // State to indicate new exam
  const [unreadNotifications, setUnreadNotifications] = useState(true); // State to indicate unread notifications

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const filteredExams = allExams.filter((exam) =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative p-4 sm:p-6 md:px-8 lg:px-12 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the Student Dashboard, {user.name}
      </h1>

      {/* Exam Notifications at the top */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Link
          to="/exams/latest"
          className={`bg-green-400 text-white p-4 rounded shadow hover:bg-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1 relative ${
            newExam
              ? "before:absolute before:bg-red-900 before:rounded-full before:w-3 before:h-3 before:top-0 before:right-0"
              : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <FaClipboardList className="text-3xl" />
            <div>
              <h2 className="text-lg ">Latest Exam</h2>
              <p className="text-xl">{exams.latest}</p>
            </div>
          </div>
        </Link>
        <Link
          to="/exams/previous"
          className="bg-indigo-500 text-white p-4 rounded shadow flex items-center justify-between"
        >
          <FaClipboardList className="text-3xl" />
          <div>
            <h2 className="text-lg">Previous Exam</h2>
            <p className="text-xl">{exams.previous}</p>
          </div>
        </Link>
        <Link
          to="/exams/upcoming"
          className="bg-red-400 text-white p-4 rounded shadow flex items-center justify-between"
        >
          <FaClipboardList className="text-3xl" />
          <div>
            <h2 className="text-lg">Upcoming Exam</h2>
            <p className="text-xl">{exams.upcoming}</p>
          </div>
        </Link>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Link
          to="/student/exams"
          className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition flex items-center space-x-2"
        >
          <FaClipboardList className="text-3xl text-orange-600" />
          <div>
            <h2 className="text-lg font-semibold">Total Exams</h2>
            <p className="text-xl">{counts.totalExams}</p>
          </div>
        </Link>
        <Link
          to="/student/events"
          className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition flex items-center space-x-2"
        >
          <FaCalendarAlt className="text-3xl text-red-600" />
          <div>
            <h2 className="text-lg font-semibold">Total Events</h2>
            <p className="text-xl">{counts.totalEvents}</p>
          </div>
        </Link>
        <Link
          to="/student/timetable"
          className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition flex items-center space-x-2"
        >
          <FaCalendarCheck className="text-3xl text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold">Timetable</h2>
            <p className="text-xl">{counts.timetable}</p>
          </div>
        </Link>
        <Link
          to="/student/classes"
          className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition flex items-center space-x-2"
        >
          <FaChalkboard className="text-3xl text-green-600" />
          <div>
            <h2 className="text-lg font-semibold">Classes</h2>
            <p className="text-xl">{counts.classes}</p>
          </div>
        </Link>
      </div>

      {/* Reports and Marks Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <Link
          to="/student/reports"
          className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition flex items-center space-x-2"
        >
          <FaChartBar className="text-3xl text-purple-600" />
          <div>
            <h2 className="text-lg font-semibold">View Reports</h2>
          </div>
        </Link>
        <Link
          to="/student/marks"
          className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition flex items-center space-x-2"
        >
          <FaRegCommentDots className="text-3xl text-yellow-600" />
          <div>
            <h2 className="text-lg font-semibold">Generate Marks Card</h2>
          </div>
        </Link>

        <Link
          to="/student/marks"
          className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition flex items-center space-x-2"
        >
          <FaRegCommentDots className="text-3xl text-yellow-600" />
          <div>
            <h2 className="text-lg font-semibold">View All Notifications</h2>
          </div>
        </Link>
      </div>

      {/* Search Field and Exam Cards */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Search and View Exams</h2>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Search exams..."
            className="p-2 border border-gray-300 rounded flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-gray-500" />
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 ${viewMode === "list" ? "bg-gray-300" : ""}`}
          >
            <FaRegListAlt />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 ${viewMode === "grid" ? "bg-gray-300" : ""}`}
          >
            <FaTh />
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`p-2 ${viewMode === "cards" ? "bg-gray-300" : ""}`}
          >
            <FaThLarge />
          </button>
        </div>

        <div
          className={`grid gap-4 ${
            viewMode === "list"
              ? "grid-cols-1"
              : viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {filteredExams.map((exam) => (
            <Link
              key={exam.id}
              to={`/exams/${exam.id}`}
              className="p-4 bg-white rounded shadow hover:bg-gray-100 transition"
            >
              <div
                className={`${
                  viewMode === "list" ? "flex-row" : "flex-col"
                } flex items-center`}
              >
                <div
                  className={`${
                    viewMode === "list" ? "flex-1" : "text-center"
                  }`}
                >
                  <h3 className="text-lg font-semibold">{exam.name}</h3>
                  <p className="text-sm text-gray-500">{exam.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
