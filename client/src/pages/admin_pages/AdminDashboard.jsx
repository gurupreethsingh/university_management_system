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

import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      {/* Add your admin dashboard content here */}
    </div>
  );
};

export default AdminDashboard;
