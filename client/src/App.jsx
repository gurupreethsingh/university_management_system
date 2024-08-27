import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/common_pages/Homepage";
import PageNotFound from "./pages/common_pages/PageNotFound";
import Header from "./components/Header";
import Contact from "./pages/contact_pages/Contact";
import About from "./pages/common_pages/About";
import PrivacyPolicy from "./pages/common_pages/PrivacyPolicy";
import AdminRegister from "./pages/admin_pages/AdminRegister";
import AdminLogin from "./pages/admin_pages/AdminLogin";
import AdminForgotPassword from "./pages/admin_pages/AdminForgotPassword";
import AdminDashboard from "./pages/admin_pages/AdminDashboard";
import StudentLogin from "./pages/student_pages/StudentLogin";
import StudentForgotPassword from "./pages/student_pages/StudentForgotPassword";
import StudentDashboard from "./pages/student_pages/StudentDashboard";
import StudentRegister from "./pages/student_pages/StudentRegister";
import TeacherRegister from "./pages/teacher_pages/TeacherRegister";
import TeacherLogin from "./pages/teacher_pages/TeacherLogin";
import TeacherDashboard from "./pages/teacher_pages/TeacherDashboard";
import TeacherForgotPassword from "./pages/teacher_pages/TeacherForgotPassword";
import Profile from "./pages/common_pages/Profile";
import AllMessages from "./pages/contact_pages/AllMessages";
import ReplyMessage from "./pages/contact_pages/ReplyMessage";
import AllReplies from "./pages/contact_pages/AllReplies";
import WorkWithUs from "./components/WorkWithUs";
import NewsLetter from "./components/NewsLetter";
import Footer from "./components/Footer";
import AllBlogs from "./pages/blog_pages/AllBlogs";
import AdminResetPassword from "./pages/admin_pages/AdminResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProfile from "./pages/admin_pages/AdminProfile";
import AdminProfileUpdate from "./pages/admin_pages/AdminProfileUpdate";

const App = () => (
  <Router>
    <Header />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/blogs" element={<AllBlogs />} />

      {/* Public Routes: Admin, Teacher, and Student Login/Register */}
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-forgot-password" element={<AdminForgotPassword />} />
      <Route
        path="/admin-reset-password/:token"
        element={<AdminResetPassword />}
      />
      <Route path="/student-register" element={<StudentRegister />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route
        path="/student-forgot-password"
        element={<StudentForgotPassword />}
      />
      <Route path="/teacher-register" element={<TeacherRegister />} />
      <Route path="/teacher-login" element={<TeacherLogin />} />
      <Route
        path="/teacher-forgot-password"
        element={<TeacherForgotPassword />}
      />

      {/* Protected Routes */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-profile/:id"
        element={
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-profile-update/:id"
        element={
          <ProtectedRoute>
            <AdminProfileUpdate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher-dashboard"
        element={
          <ProtectedRoute>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/all-messages"
        element={
          <ProtectedRoute>
            <AllMessages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reply-message/:id"
        element={
          <ProtectedRoute>
            <ReplyMessage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/all-replies"
        element={
          <ProtectedRoute>
            <AllReplies />
          </ProtectedRoute>
        }
      />

      {/* Page Not Found */}
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
    <WorkWithUs />
    <NewsLetter />
    <Footer />
  </Router>
);

export default App;
