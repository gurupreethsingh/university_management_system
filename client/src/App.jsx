import React, { useEffect } from "react";
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

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />

      {/* admin routes */}
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-forgot-password" element={<AdminForgotPassword />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* student routes */}
      <Route path="/student-register" element={<StudentRegister />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route
        path="/student-forgot-password"
        element={<StudentForgotPassword />}
      />
      <Route path="/student-dashboard" element={<StudentDashboard />} />

      {/* teacher routes */}
      <Route path="/teacher-register" element={<TeacherRegister />} />
      <Route path="/teacher-login" element={<TeacherLogin />} />
      <Route
        path="/teacher-forgot-password"
        element={<TeacherForgotPassword />}
      />

      {/* contact and messages routes */}
      <Route path="/all-messages" element={<AllMessages />} />
      <Route path="/reply-message/:id" element={<ReplyMessage />} />
      <Route path="/all-replies/" element={<AllReplies />} />

      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/page-not-found" element={<PageNotFound />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  </Router>
);

export default App;
