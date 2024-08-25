// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   FaUser,
// //   FaChalkboardTeacher,
// //   FaBook,
// //   FaCalendarAlt,
// //   FaSearch,
// //   FaPlus,
// //   FaReply,
// //   FaRegListAlt,
// //   FaTh,
// //   FaThLarge,
// //   FaClipboardList,
// //   FaFileAlt,
// //   FaUserGraduate,
// //   FaUsers,
// //   FaBell,
// //   FaEnvelopeOpenText,
// // } from "react-icons/fa";
// // import { Link } from "react-router-dom";

// // const TeacherDashboard = () => {
// //   const [user, setUser] = useState(null);
// //   const [counts, setCounts] = useState({});
// //   const [teachers, setTeachers] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [viewMode, setViewMode] = useState("grid");
// //   const [error, setError] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [teachersPerPage] = useState(10);

// //   useEffect(() => {
// //     try {
// //       const storedUser = localStorage.getItem("user");
// //       if (storedUser && storedUser !== "undefined") {
// //         const parsedUser = JSON.parse(storedUser);
// //         if (parsedUser && typeof parsedUser === "object") {
// //           setUser(parsedUser);
// //         } else {
// //           setError("Invalid user data. Please log in again.");
// //         }
// //       } else {
// //         setError("No user data found. Please log in again.");
// //       }
// //     } catch (err) {
// //       console.error("Failed to parse user data:", err);
// //       setError("Failed to load user data. Please log in again.");
// //     }
// //   }, []);


// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const res = await axios.get(
// //           "http://localhost:5000/admin-dashboard/users"
// //         );
// //         setUsers(res.data);
// //       } catch (err) {
// //         console.error("Error fetching users:", err);
// //       }
// //     };

// //     fetchUsers();
// //   }, []); // This useEffect runs once after the component mounts

// //   useEffect(() => {
// //     const fetchCounts = async () => {
// //       try {
// //         const res = await axios.get(
// //           "http://localhost:5000/admin-dashboard/counts"
// //         );
// //         console.log("Received Counts:", res.data);
// //         setCounts(res.data);
// //       } catch (err) {
// //         console.error("Error fetching counts:", err);
// //       }
// //     };

// //     fetchCounts();
// //   }, []); // This useEffect runs once after the component mounts

// //   useEffect(() => {
// //     const fetchTeachers = async () => {
// //       try {
// //         const res = await axios.get(
// //           "http://localhost:5000/teacher-dashboard/teachers"
// //         );
// //         setTeachers(res.data);
// //       } catch (err) {
// //         console.error("Error fetching teachers:", err);
// //       }
// //     };

// //     fetchTeachers();
// //   }, []); // This useEffect runs once after the component mounts

// //   const filteredTeachers = teachers.filter((teacher) =>
// //     Object.values(teacher).some((value) =>
// //       value.toLowerCase().includes(searchTerm.toLowerCase())
// //     )
// //   );

// //   const indexOfLastTeacher = currentPage * teachersPerPage;
// //   const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
// //   const currentTeachers = filteredTeachers.slice(
// //     indexOfFirstTeacher,
// //     indexOfLastTeacher
// //   );

// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   if (!user) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">
// //         Welcome to the Teacher Dashboard, {user.name}
// //       </h1>

// //       {/* Count Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
// //         <div className="p-4 bg-blue-500 text-white rounded shadow">
// //           <FaUsers className="text-3xl mb-2" />
// //           <h2 className="text-lg">Total Teachers</h2>
// //           <p className="text-2xl">{counts.totalTeachers || 0}</p>
// //         </div>
// //         <div className="p-4 bg-green-500 text-white rounded shadow">
// //           <FaBook className="text-3xl mb-2" />
// //           <h2 className="text-lg">Courses Assigned</h2>
// //           <p className="text-2xl">{counts.assignedCourses || 0}</p>
// //         </div>
// //         <div className="p-4 bg-purple-500 text-white rounded shadow">
// //           <FaClipboardList className="text-3xl mb-2" />
// //           <h2 className="text-lg">Exams Conducted</h2>
// //           <p className="text-2xl">{counts.conductedExams || 0}</p>
// //         </div>
// //         <div className="p-4 bg-yellow-500 text-white rounded shadow">
// //           <FaUserGraduate className="text-3xl mb-2" />
// //           <h2 className="text-lg">Students Supervised</h2>
// //           <p className="text-2xl">{counts.supervisedStudents || 0}</p>
// //         </div>
// //         <div className="p-4 bg-red-500 text-white rounded shadow">
// //           <FaCalendarAlt className="text-3xl mb-2" />
// //           <h2 className="text-lg">Events Organized</h2>
// //           <p className="text-2xl">{counts.eventsOrganized || 0}</p>
// //         </div>
// //       </div>

// //       {/* Teacher Actions */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
// //         <Link
// //           to="/teacher/manage-courses"
// //           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
// //         >
// //           <FaBook className="text-3xl text-indigo-600 mb-2" />
// //           <h2 className="text-lg font-semibold">Manage Courses</h2>
// //           <p className="text-sm">Assign, update, and manage courses.</p>
// //         </Link>
// //         <Link
// //           to="/teacher/conduct-exams"
// //           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
// //         >
// //           <FaClipboardList className="text-3xl text-teal-600 mb-2" />
// //           <h2 className="text-lg font-semibold">Conduct Exams</h2>
// //           <p className="text-sm">Create and manage exams.</p>
// //         </Link>
// //         <Link
// //           to="/teacher/supervise-students"
// //           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
// //         >
// //           <FaUserGraduate className="text-3xl text-yellow-600 mb-2" />
// //           <h2 className="text-lg font-semibold">Supervise Students</h2>
// //           <p className="text-sm">Mentor and supervise students.</p>
// //         </Link>
// //         <Link
// //           to="/teacher/organize-events"
// //           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
// //         >
// //           <FaCalendarAlt className="text-3xl text-red-600 mb-2" />
// //           <h2 className="text-lg font-semibold">Organize Events</h2>
// //           <p className="text-sm">Plan and organize events.</p>
// //         </Link>
// //         <Link
// //           to="/teacher/view-notifications"
// //           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
// //         >
// //           <FaBell className="text-3xl text-blue-600 mb-2" />
// //           <h2 className="text-lg font-semibold">View Notifications</h2>
// //           <p className="text-sm">Check your notifications.</p>
// //         </Link>
// //         <Link
// //           to="/teacher/view-messages"
// //           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
// //         >
// //           <FaEnvelopeOpenText className="text-3xl text-green-600 mb-2" />
// //           <h2 className="text-lg font-semibold">View Messages</h2>
// //           <p className="text-sm">View and respond to messages.</p>
// //         </Link>
// //         {/* Add more teacher action cards as needed */}
// //       </div>

// //       {/* Teacher List with Search and View Options */}
// //       <div className="flex items-center justify-between mb-4">
// //         <h2 className="text-lg font-bold">All Teachers</h2>
// //         <div className="flex items-center space-x-2">
// //           <input
// //             type="text"
// //             placeholder="Search teachers..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="p-2 border border-gray-300 rounded ml-2"
// //           />
// //           <FaSearch className="text-gray-500" />
// //           <button
// //             className={`p-2 ${viewMode === "list" ? "bg-gray-300" : ""}`}
// //             onClick={() => setViewMode("list")}
// //           >
// //             <FaRegListAlt />
// //           </button>
// //           <button
// //             className={`p-2 ${viewMode === "grid" ? "bg-gray-300" : ""}`}
// //             onClick={() => setViewMode("grid")}
// //           >
// //             <FaTh />
// //           </button>
// //           <button
// //             className={`p-2 ${viewMode === "cards" ? "bg-gray-300" : ""}`}
// //             onClick={() => setViewMode("cards")}
// //           >
// //             <FaThLarge />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Teacher Display */}
// //       <div
// //         className={`grid gap-4 ${
// //           viewMode === "list"
// //             ? "grid-cols-1"
// //             : viewMode === "grid"
// //             ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
// //             : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
// //         }`}
// //       >
// //         {currentTeachers.map((teacher) => (
// //           <Link
// //             key={teacher.id}
// //             to={`/teacher/profile/${teacher.id}`}
// //             className="pb-4 bg-white rounded shadow hover:bg-gray-100 transition"
// //           >
// //             <div
// //               className={`flex ${
// //                 viewMode === "list" ? "flex-row" : "flex-col"
// //               } items-center`}
// //             >
// //               <img
// //                 src={teacher.avatar || "https://via.placeholder.com/150"}
// //                 alt={teacher.name}
// //                 className={`${
// //                   viewMode === "list" ? "w-16 h-16 mr-4" : "w-full h-auto mb-4"
// //                 } rounded-lg object-cover`}
// //               />
// //               <div
// //                 className={`${viewMode === "list" ? "flex-1" : "text-center"}`}
// //               >
// //                 <h2 className="text-lg font-semibold">{teacher.name}</h2>
// //                 <p className="text-sm text-gray-500">{teacher.role}</p>
// //                 <p className="text-sm text-gray-500">Email: {teacher.email}</p>
// //                 {/* Add more fields as necessary */}
// //               </div>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>

// //       {/* Pagination */}
// //       <div className="flex justify-center mt-6">
// //         <ul className="inline-flex -space-x-px">
// //           {[
// //             ...Array(
// //               Math.ceil(filteredTeachers.length / teachersPerPage)
// //             ).keys(),
// //           ].map((pageNumber) => (
// //             <li key={pageNumber}>
// //               <button
// //                 onClick={() => paginate(pageNumber + 1)}
// //                 className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
// //                   currentPage === pageNumber + 1 ? "bg-gray-200" : ""
// //                 }`}
// //               >
// //                 {pageNumber + 1}
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TeacherDashboard;


// // new code for teacher dashboard. 

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   FaUser,
// //   FaChalkboardTeacher,
// //   FaBook,
// //   FaCalendarAlt,
// //   FaSearch,
// //   FaPlus,
// //   FaReply,
// //   FaRegListAlt,
// //   FaTh,
// //   FaThLarge,
// //   FaClipboardList,
// //   FaFileAlt,
// //   FaUserGraduate,
// //   FaUsers,
// //   FaBell,
// //   FaEnvelopeOpenText,
// // } from "react-icons/fa";
// // import { Link } from "react-router-dom";

// // const TeacherDashboard = () => {
// //   const [user, setUser] = useState(null);
// //   const [counts, setCounts] = useState({});
// //   const [teachers, setTeachers] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [viewMode, setViewMode] = useState("grid");
// //   const [error, setError] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [teachersPerPage] = useState(10);

// //   useEffect(() => {
// //     try {
// //       const storedUser = localStorage.getItem("user");
// //       if (storedUser && storedUser !== "undefined") {
// //         const parsedUser = JSON.parse(storedUser);
// //         if (parsedUser && typeof parsedUser === "object") {
// //           setUser(parsedUser);
// //         } else {
// //           setError("Invalid user data. Please log in again.");
// //         }
// //       } else {
// //         setError("No user data found. Please log in again.");
// //       }
// //     } catch (err) {
// //       console.error("Failed to parse user data:", err);
// //       setError("Failed to load user data. Please log in again.");
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const fetchCounts = async () => {
// //       try {
// //         const res = await axios.get(
// //           "http://localhost:5000/admin-dashboard/counts"
// //         );
// //         console.log("Received Counts:", res.data);
// //         setCounts(res.data);
// //       } catch (err) {
// //         console.error("Error fetching counts:", err);
// //       }
// //     };

// //     fetchCounts();
// //   }, []); // This useEffect runs once after the component mounts

// //   useEffect(() => {
// //     const fetchTeachers = async () => {
// //       try {
// //         const res = await axios.get(
// //           "http://localhost:5000/teacher-dashboard/teachers"
// //         );
// //         setTeachers(res.data);
// //       } catch (err) {
// //         console.error("Error fetching teachers:", err);
// //       }
// //     };

// //     fetchTeachers();
// //   }, []); // This useEffect runs once after the component mounts

// //   const filteredTeachers = teachers.filter((teacher) =>
// //     Object.values(teacher).some((value) =>
// //       value.toLowerCase().includes(searchTerm.toLowerCase())
// //     )
// //   );

// //   const indexOfLastTeacher = currentPage * teachersPerPage;
// //   const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
// //   const currentTeachers = filteredTeachers.slice(
// //     indexOfFirstTeacher,
// //     indexOfLastTeacher
// //   );

// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   if (!user) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">
// //         Welcome to the Teacher Dashboard, {user.name}
// //       </h1>

// //       {/* Count Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
// //         <div className="p-4 bg-blue-500 text-white rounded shadow">
// //           <FaUsers className="text-3xl mb-2" />
// //           <h2 className="text-lg">Total Teachers</h2>
// //           <p className="text-2xl">{counts.totalTeachers || 0}</p>
// //         </div>
// //         <div className="p-4 bg-green-500 text-white rounded shadow">
// //           <FaBook className="text-3xl mb-2" />
// //           <h2 className="text-lg">Courses Assigned</h2>
// //           <p className="text-2xl">{counts.assignedCourses || 0}</p>
// //         </div>
// //         <div className="p-4 bg-purple-500 text-white rounded shadow">
// //           <FaClipboardList className="text-3xl mb-2" />
// //           <h2 className="text-lg">Exams Conducted</h2>
// //           <p className="text-2xl">{counts.conductedExams || 0}</p>
// //         </div>
// //         <div className="p-4 bg-yellow-500 text-white rounded shadow">
// //           <FaUserGraduate className="text-3xl mb-2" />
// //           <h2 className="text-lg">Students Supervised</h2>
// //           <p className="text-2xl">{counts.supervisedStudents || 0}</p>
// //         </div>
// //         <div className="p-4 bg-red-500 text-white rounded shadow">
// //           <FaCalendarAlt className="text-3xl mb-2" />
// //           <h2 className="text-lg">Events Organized</h2>
// //           <p className="text-2xl">{counts.eventsOrganized || 0}</p>
// //         </div>
// //       </div>

// //       {/* Teacher Actions */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
// //         <Link
// //           to="/teacher/manage-courses"
// //           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
// //         >
// //           <FaBook className="text-3xl text-indigo-600 mb-2" />
// //           <h2 className="text-lg font-semibold">Manage Courses</h2>
// //           <p className="text-sm">Assign, update, and manage courses.</p>
// //         </Link>
// //         <Link
// //           to="/teacher/conduct-exams"
// //           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
// //         >
// //           <FaClipboardList className="text-3xl text-teal-600 mb-2" />
// //           <h2 className="text-lg font-semibold">Conduct Exams</h2>
// //           <p className="text-sm">Create and manage exams.</p>
// //         </Link>
// //         <Link
// //           to="/teacher/supervise-students"
// //           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
// //         >
// //           <FaUserGraduate className="text-3xl text-yellow-600 mb-2" />
// //           <h2 className="text-lg font-semibold">Supervise Students</h2>
// //           <p className="text-sm">Mentor and supervise students.</p>
// //         </Link>
// //         <Link
// //           to="/teacher/organize-events"
// //           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
// //         >
// //           <FaCalendarAlt className="text-3xl text-red-600 mb-2" />
// //           <h2 className="text-lg font-semibold">Organize Events</h2>
// //           <p className="text-sm">Plan and organize events.</p>
// //         </Link>
// //         <Link
// //           to="/teacher/view-notifications"
// //           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
// //         >
// //           <FaBell className="text-3xl text-blue-600 mb-2" />
// //           <h2 className="text-lg font-semibold">View Notifications</h2>
// //           <p className="text-sm">Check your notifications.</p>
// //         </Link>
// //         <Link
// //           to="/teacher/view-messages"
// //           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
// //         >
// //           <FaEnvelopeOpenText className="text-3xl text-green-600 mb-2" />
// //           <h2 className="text-lg font-semibold">View Messages</h2>
// //           <p className="text-sm">View and respond to messages.</p>
// //         </Link>
// //         {/* Add more teacher action cards as needed */}
// //       </div>

// //       {/* Teacher List with Search and View Options */}
// //       <div className="flex items-center justify-between mb-4">
// //         <h2 className="text-lg font-bold">All Teachers</h2>
// //         <div className="flex items-center space-x-2">
// //           <input
// //             type="text"
// //             placeholder="Search teachers..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="p-2 border border-gray-300 rounded ml-2"
// //           />
// //           <FaSearch className="text-gray-500" />
// //           <button
// //             className={`p-2 ${viewMode === "list" ? "bg-gray-300" : ""}`}
// //             onClick={() => setViewMode("list")}
// //           >
// //             <FaRegListAlt />
// //           </button>
// //           <button
// //             className={`p-2 ${viewMode === "grid" ? "bg-gray-300" : ""}`}
// //             onClick={() => setViewMode("grid")}
// //           >
// //             <FaTh />
// //           </button>
// //           <button
// //             className={`p-2 ${viewMode === "cards" ? "bg-gray-300" : ""}`}
// //             onClick={() => setViewMode("cards")}
// //           >
// //             <FaThLarge />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Teacher Display */}
// //       <div
// //         className={`grid gap-4 ${
// //           viewMode === "list"
// //             ? "grid-cols-1"
// //             : viewMode === "grid"
// //             ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
// //             : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
// //         }`}
// //       >
// //         {currentTeachers.map((teacher) => (
// //           <Link
// //             key={teacher.id}
// //             to={`/teacher/profile/${teacher.id}`}
// //             className="pb-4 bg-white rounded shadow hover:bg-gray-100 transition"
// //           >
// //             <div
// //               className={`flex ${
// //                 viewMode === "list" ? "flex-row" : "flex-col"
// //               } items-center`}
// //             >
// //               <img
// //                 src={teacher.avatar || "https://via.placeholder.com/150"}
// //                 alt={teacher.name}
// //                 className={`${
// //                   viewMode === "list" ? "w-16 h-16 mr-4" : "w-full h-auto mb-4"
// //                 } rounded-lg object-cover`}
// //               />
// //               <div
// //                 className={`${viewMode === "list" ? "flex-1" : "text-center"}`}
// //               >
// //                 <h2 className="text-lg font-semibold">{teacher.name}</h2>
// //                 <p className="text-sm text-gray-500">{teacher.role}</p>
// //                 <p className="text-sm text-gray-500">Email: {teacher.email}</p>
// //                 {/* Add more fields as necessary */}
// //               </div>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>

// //       {/* Pagination */}
// //       <div className="flex justify-center mt-6">
// //         <ul className="inline-flex -space-x-px">
// //           {[
// //             ...Array(
// //               Math.ceil(filteredTeachers.length / teachersPerPage)
// //             ).keys(),
// //           ].map((pageNumber) => (
// //             <li key={pageNumber}>
// //               <button
// //                 onClick={() => paginate(pageNumber + 1)}
// //                 className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
// //                   currentPage === pageNumber + 1 ? "bg-gray-200" : ""
// //                 }`}
// //               >
// //                 {pageNumber + 1}
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TeacherDashboard;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaUser,
//   FaChalkboardTeacher,
//   FaBook,
//   FaCalendarAlt,
//   FaSearch,
//   FaPlus,
//   FaReply,
//   FaRegListAlt,
//   FaTh,
//   FaThLarge,
//   FaClipboardList,
//   FaFileAlt,
//   FaUserGraduate,
//   FaUsers,
//   FaBell,
//   FaEnvelopeOpenText,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const TeacherDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [counts, setCounts] = useState({});
//   const [teachers, setTeachers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState("grid");
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [teachersPerPage] = useState(10);

//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser && storedUser !== "undefined") {
//         const parsedUser = JSON.parse(storedUser);
//         if (parsedUser && typeof parsedUser === "object") {
//           setUser(parsedUser);
//         } else {
//           setError("Invalid user data. Please log in again.");
//         }
//       } else {
//         setError("No user data found. Please log in again.");
//       }
//     } catch (err) {
//       console.error("Failed to parse user data:", err);
//       setError("Failed to load user data. Please log in again.");
//     }
//   }, []);

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/admin-dashboard/counts");
//         console.log("Received Counts:", res.data);
//         setCounts(res.data);
//       } catch (err) {
//         console.error("Error fetching counts:", err);
//       }
//     };

//     fetchCounts();
//   }, []); // This useEffect runs once after the component mounts

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/teacher-dashboard/teachers");
//         setTeachers(res.data);
//       } catch (err) {
//         console.error("Error fetching teachers:", err);
//       }
//     };

//     fetchTeachers();
//   }, []); // This useEffect runs once after the component mounts

//   const filteredTeachers = teachers.filter((teacher) =>
//     Object.values(teacher).some((value) =>
//       value.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const indexOfLastTeacher = currentPage * teachersPerPage;
//   const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
//   const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-6 mx-auto max-w-7xl">
//       <h1 className="text-2xl font-bold mb-4">
//         Welcome to the Teacher Dashboard, {user.name}
//       </h1>

//       {/* Count Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
//         <div className="p-4 bg-blue-500 text-white rounded shadow">
//           <FaUsers className="text-3xl mb-2" />
//           <h2 className="text-lg">Total Teachers</h2>
//           <p className="text-2xl">{counts.totalTeachers || 0}</p>
//         </div>
//         <div className="p-4 bg-green-500 text-white rounded shadow">
//           <FaBook className="text-3xl mb-2" />
//           <h2 className="text-lg">Courses Assigned</h2>
//           <p className="text-2xl">{counts.assignedCourses || 0}</p>
//         </div>
//         <div className="p-4 bg-purple-500 text-white rounded shadow">
//           <FaClipboardList className="text-3xl mb-2" />
//           <h2 className="text-lg">Exams Conducted</h2>
//           <p className="text-2xl">{counts.conductedExams || 0}</p>
//         </div>
//         <div className="p-4 bg-yellow-500 text-white rounded shadow">
//           <FaUserGraduate className="text-3xl mb-2" />
//           <h2 className="text-lg">Students Supervised</h2>
//           <p className="text-2xl">{counts.supervisedStudents || 0}</p>
//         </div>
//         <div className="p-4 bg-red-500 text-white rounded shadow">
//           <FaCalendarAlt className="text-3xl mb-2" />
//           <h2 className="text-lg">Events Organized</h2>
//           <p className="text-2xl">{counts.eventsOrganized || 0}</p>
//         </div>
//       </div>

//       {/* Teacher Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
//         <Link
//           to="/teacher/manage-courses"
//           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
//         >
//           <FaBook className="text-3xl text-indigo-600 mb-2" />
//           <h2 className="text-lg font-semibold">Manage Courses</h2>
//           <p className="text-sm">Assign, update, and manage courses.</p>
//         </Link>
//         <Link
//           to="/teacher/conduct-exams"
//           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
//         >
//           <FaClipboardList className="text-3xl text-teal-600 mb-2" />
//           <h2 className="text-lg font-semibold">Conduct Exams</h2>
//           <p className="text-sm">Create and manage exams.</p>
//         </Link>
//         <Link
//           to="/teacher/supervise-students"
//           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
//         >
//           <FaUserGraduate className="text-3xl text-yellow-600 mb-2" />
//           <h2 className="text-lg font-semibold">Supervise Students</h2>
//           <p className="text-sm">Mentor and supervise students.</p>
//         </Link>
//         <Link
//           to="/teacher/organize-events"
//           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
//         >
//           <FaCalendarAlt className="text-3xl text-red-600 mb-2" />
//           <h2 className="text-lg font-semibold">Organize Events</h2>
//           <p className="text-sm">Plan and organize events.</p>
//         </Link>
//         <Link
//           to="/teacher/view-notifications"
//           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
//         >
//           <FaBell className="text-3xl text-blue-600 mb-2" />
//           <h2 className="text-lg font-semibold">View Notifications</h2>
//           <p className="text-sm">Check your notifications.</p>
//         </Link>
//         <Link
//           to="/teacher/view-messages"
//           className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
//         >
//           <FaEnvelopeOpenText className="text-3xl text-green-600 mb-2" />
//           <h2 className="text-lg font-semibold">View Messages</h2>
//           <p className="text-sm">View and respond to messages.</p>
//         </Link>
//       </div>

//       {/* Teacher List with Search and View Options */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-bold">All Teachers</h2>
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder="Search teachers..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="p-2 border border-gray-300 rounded ml-2"
//           />
//           <FaSearch className="text-gray-500" />
//           <button
//             className={`p-2 ${viewMode === "list" ? "bg-gray-300" : ""}`}
//             onClick={() => setViewMode("list")}
//           >
//             <FaRegListAlt />
//           </button>
//           <button
//             className={`p-2 ${viewMode === "grid" ? "bg-gray-300" : ""}`}
//             onClick={() => setViewMode("grid")}
//           >
//             <FaTh />
//           </button>
//           <button
//             className={`p-2 ${viewMode === "cards" ? "bg-gray-300" : ""}`}
//             onClick={() => setViewMode("cards")}
//           >
//             <FaThLarge />
//           </button>
//         </div>
//       </div>

//       {/* Teacher Display */}
//       <div
//         className={`grid gap-4 ${
//           viewMode === "list"
//             ? "grid-cols-1"
//             : viewMode === "grid"
//             ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
//             : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
//         }`}
//       >
//         {currentTeachers.map((teacher) => (
//           <Link
//             key={teacher.id}
//             to={`/teacher/profile/${teacher.id}`}
//             className="pb-4 bg-white rounded shadow hover:bg-gray-100 transition"
//           >
//             <div
//               className={`flex ${
//                 viewMode === "list" ? "flex-row" : "flex-col"
//               } items-center`}
//             >
//               <img
//                 src={teacher.avatar || "https://via.placeholder.com/150"}
//                 alt={teacher.name}
//                 className={`${
//                   viewMode === "list" ? "w-16 h-16 mr-4" : "w-full h-auto mb-4"
//                 } rounded-lg object-cover`}
//               />
//               <div
//                 className={`${viewMode === "list" ? "flex-1" : "text-center"}`}
//               >
//                 <h2 className="text-lg font-semibold">{teacher.name}</h2>
//                 <p className="text-sm text-gray-500">{teacher.role}</p>
//                 <p className="text-sm text-gray-500">Email: {teacher.email}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6">
//         <ul className="inline-flex -space-x-px">
//           {[
//             ...Array(Math.ceil(filteredTeachers.length / teachersPerPage)).keys(),
//           ].map((pageNumber) => (
//             <li key={pageNumber}>
//               <button
//                 onClick={() => paginate(pageNumber + 1)}
//                 className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
//                   currentPage === pageNumber + 1 ? "bg-gray-200" : ""
//                 }`}
//               >
//                 {pageNumber + 1}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarAlt,
  FaSearch,
  FaPlus,
  FaReply,
  FaRegListAlt,
  FaTh,
  FaThLarge,
  FaClipboardList,
  FaFileAlt,
  FaUserGraduate,
  FaUsers,
  FaBell,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const [user, setUser] = useState(null);
  const [counts, setCounts] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(10);

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
        const res = await axios.get("http://localhost:5000/admin-dashboard/counts");
        console.log("Received Counts:", res.data);
        setCounts(res.data);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/teacher-dashboard/teachers");
        setTeachers(res.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter((teacher) =>
    Object.values(teacher).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

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
        Welcome to the Teacher Dashboard, {user.name}
      </h1>

      {/* Count Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded shadow">
          <FaUsers className="text-3xl mb-2" />
          <h2 className="text-lg">Total Teachers</h2>
          <p className="text-2xl">{counts.totalTeachers || 0}</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded shadow">
          <FaBook className="text-3xl mb-2" />
          <h2 className="text-lg">Courses Assigned</h2>
          <p className="text-2xl">{counts.assignedCourses || 0}</p>
        </div>
        <div className="p-4 bg-purple-500 text-white rounded shadow">
          <FaClipboardList className="text-3xl mb-2" />
          <h2 className="text-lg">Exams Conducted</h2>
          <p className="text-2xl">{counts.conductedExams || 0}</p>
        </div>
        <div className="p-4 bg-yellow-500 text-white rounded shadow">
          <FaUserGraduate className="text-3xl mb-2" />
          <h2 className="text-lg">Students Supervised</h2>
          <p className="text-2xl">{counts.supervisedStudents || 0}</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded shadow">
          <FaCalendarAlt className="text-3xl mb-2" />
          <h2 className="text-lg">Events Organized</h2>
          <p className="text-2xl">{counts.eventsOrganized || 0}</p>
        </div>
      </div>

      {/* Teacher Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        <Link
          to="/teacher/manage-courses"
          className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
        >
          <FaBook className="text-3xl text-indigo-600 mb-2" />
          <h2 className="text-lg font-semibold">Manage Courses</h2>
          <p className="text-sm">Assign, update, and manage courses.</p>
        </Link>
        <Link
          to="/teacher/conduct-exams"
          className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
        >
          <FaClipboardList className="text-3xl text-teal-600 mb-2" />
          <h2 className="text-lg font-semibold">Conduct Exams</h2>
          <p className="text-sm">Create and manage exams.</p>
        </Link>
        <Link
          to="/teacher/supervise-students"
          className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
        >
          <FaUserGraduate className="text-3xl text-yellow-600 mb-2" />
          <h2 className="text-lg font-semibold">Supervise Students</h2>
          <p className="text-sm">Mentor and supervise students.</p>
        </Link>
        <Link
          to="/teacher/organize-events"
          className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
        >
          <FaCalendarAlt className="text-3xl text-red-600 mb-2" />
          <h2 className="text-lg font-semibold">Organize Events</h2>
          <p className="text-sm">Plan and organize events.</p>
        </Link>
        <Link
          to="/teacher/view-notifications"
          className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
        >
          <FaBell className="text-3xl text-blue-600 mb-2" />
          <h2 className="text-lg font-semibold">View Notifications</h2>
          <p className="text-sm">Check your notifications.</p>
        </Link>
        <Link
          to="/teacher/view-messages"
          className="p-4 bg-gray-100 text-gray-900 rounded shadow hover:bg-gray-200 transition"
        >
          <FaEnvelopeOpenText className="text-3xl text-green-600 mb-2" />
          <h2 className="text-lg font-semibold">View Messages</h2>
          <p className="text-sm">View and respond to messages.</p>
        </Link>
      </div>

      {/* Teacher List with Search and View Options */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">All Teachers</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search teachers..."
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

      {/* Teacher Display */}
      <div
        className={`grid gap-4 ${
          viewMode === "list"
            ? "grid-cols-1"
            : viewMode === "grid"
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {currentTeachers.map((teacher) => (
          <Link
            key={teacher.id}
            to={`/teacher/profile/${teacher.id}`}
            className="pb-4 bg-white rounded shadow hover:bg-gray-100 transition"
          >
            <div
              className={`flex ${
                viewMode === "list" ? "flex-row" : "flex-col"
              } items-center`}
            >
              <img
                src={teacher.avatar || "https://via.placeholder.com/150"}
                alt={teacher.name}
                className={`${
                  viewMode === "list" ? "w-16 h-16 mr-4" : "w-full h-auto mb-4"
                } rounded-lg object-cover`}
              />
              <div
                className={`${viewMode === "list" ? "flex-1" : "text-center"}`}
              >
                <h2 className="text-lg font-semibold">{teacher.name}</h2>
                <p className="text-sm text-gray-500">{teacher.role}</p>
                <p className="text-sm text-gray-500">Email: {teacher.email}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ul className="inline-flex -space-x-px">
          {Array.from(
            { length: Math.ceil(filteredTeachers.length / teachersPerPage) },
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

export default TeacherDashboard;

