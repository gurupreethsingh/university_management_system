import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated =
    localStorage.getItem("adminToken") ||
    localStorage.getItem("teacherToken") ||
    localStorage.getItem("studentToken");

  if (!isAuthenticated) {
    alert("You must be logged in to access this page.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
