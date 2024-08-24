// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");

//     if (!token) {
//       alert("You need to be logged in to see this page.");
//       navigate("/admin-login");
//     } else {
//       fetch("http://localhost:5000/verify-token", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Invalid token");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log("Token is valid. Admin data:", data.admin);
//           setLoading(false); // Stop loading when token is verified
//         })
//         .catch(() => {
//           alert("You need to be logged in to see this page.");
//           navigate("/admin-login");
//         });
//     }
//   }, [navigate]);

//   if (loading) {
//     return <div>Loading...</div>; // Display loading state
//   }

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       {/* Rest of your dashboard content */}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Retrieve the user data from localStorage
      const storedUser = localStorage.getItem("user");

      // Check if storedUser is not null or undefined and is a valid JSON string
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
      // Handle JSON parsing errors
      console.error("Failed to parse user data:", err);
      setError("Failed to load user data. Please log in again.");
    }
  }, []);

  useEffect(() => {
    // Check if the page has already been reloaded
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      // Set a flag in sessionStorage to indicate that the page has been reloaded
      sessionStorage.setItem("hasReloaded", "true");
      // Reload the page once
      window.location.reload();
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Admin Dashboard, {user.name}</h1>
      {/* Add your admin dashboard content here */}
    </div>
  );
};

export default AdminDashboard;
