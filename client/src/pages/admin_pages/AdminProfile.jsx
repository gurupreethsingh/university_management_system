// // updated mobile view  code.

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaUserCircle,
//   FaEnvelope,
//   FaFlagUsa,
//   FaHome,
//   FaCity,
//   FaMapMarkedAlt,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function AdminProfile() {
//   const [user, setUser] = useState(null);
//   const [avatar, setAvatar] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const userDetails = storedUser ? JSON.parse(storedUser) : null;
//     if (!userDetails || !userDetails.id) {
//       console.error("No user ID found in storage.");
//       return;
//     }
//     const userId = userDetails.id;

//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/admin-profile/${userId}`
//         );
//         setUser(response.data);
//         setAvatar(
//           response.data.adminAvatar ||
//             "https://via.placeholder.com/150.png?text=User+Image"
//         );
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleAvatarChange = (e) => {
//     console.log("Change avatar", e.target.files[0]);
//   };

//   const handleUpdateClick = () => {
//     navigate(`/admin-profile-update/${user._id}`);
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//       <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
//         <div className="w-full md:w-48 lg:w-60">
//           <div className="relative w-full md:w-48 lg:w-60 h-48 md:h-48 lg:h-60 rounded-lg overflow-hidden">
//             <img
//               src={avatar}
//               alt="User Avatar"
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>
//         <div className="flex-grow">
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
//             <p className="text-sm text-gray-500">
//               {user.bio || "No bio available"}
//             </p>
//             {createDataField(
//               "Full name",
//               user.name,
//               <FaUserCircle className="text-indigo-500" />
//             )}
//             {createDataField(
//               "Email address",
//               user.email,
//               <FaEnvelope className="text-red-500" />
//             )}
//             {createDataField(
//               "Role",
//               user.role,
//               <FaUserCircle className="text-green-500" />
//             )}
//             {createDataField(
//               "Phone",
//               user.phone || "Not specified",
//               <FaFlagUsa className="text-blue-500" />
//             )}
//             {createDataField(
//               "Country",
//               user.country || "Not specified",
//               <FaFlagUsa className="text-blue-500" />
//             )}
//             {createDataField(
//               "City",
//               user.city || "Not specified",
//               <FaCity className="text-yellow-500" />
//             )}
//             {createDataField(
//               "State / Province",
//               user.state || "No state/province available",
//               <FaMapMarkedAlt className="text-purple-500" />
//             )}
//             <button
//               onClick={handleUpdateClick}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
//             >
//               Edit Details
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function createDataField(label, value, icon) {
//   return (
//     <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-gray-200">
//       <dt className="text-sm font-medium text-gray-900 flex items-center">
//         {icon}
//         <span className="ml-2">{label}</span>
//       </dt>
//       <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
//         {value}
//       </dd>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaEnvelope,
  FaFlagUsa,
  FaHome,
  FaCity,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const userDetails = storedUser ? JSON.parse(storedUser) : null;
    if (!userDetails || !userDetails.id) {
      console.error("No user ID found in storage.");
      return;
    }
    const userId = userDetails.id;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/admin-profile/${userId}`
        );
        setUser(response.data);

        // Set the avatar based on the role and the fetched data
        let avatarPath = "";
        if (userData.role === "admin") {
          avatarPath = userData.adminAvatar
            ? `/uploads/admins/${userData.adminAvatar.replace(
                "/uploads/admins/",
                ""
              )}`
            : "";
        } else if (userData.role === "teacher") {
          avatarPath = userData.teacherAvatar
            ? `/uploads/teachers/${userData.teacherAvatar.replace(
                "/uploads/teachers/",
                ""
              )}`
            : "";
        } else if (userData.role === "student") {
          avatarPath = userData.studentAvatar
            ? `/uploads/students/${userData.studentAvatar.replace(
                "/uploads/students/",
                ""
              )}`
            : "";
        }

        setAvatar(
          avatarPath || "https://via.placeholder.com/150.png?text=User+Image"
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateClick = () => {
    navigate(`/admin-profile-update/${user._id}`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-48 lg:w-60">
          <div className="relative w-full md:w-48 lg:w-60 h-48 md:h-48 lg:h-60 rounded-lg overflow-hidden">
            <img
              src={avatar}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex-grow">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">
              {user.bio || "No bio available"}
            </p>
            {createDataField(
              "Full name",
              user.name,
              <FaUserCircle className="text-indigo-500" />
            )}
            {createDataField(
              "Email address",
              user.email,
              <FaEnvelope className="text-red-500" />
            )}
            {createDataField(
              "Role",
              user.role,
              <FaUserCircle className="text-green-500" />
            )}
            {createDataField(
              "Phone",
              user.phone || "Not specified",
              <FaFlagUsa className="text-blue-500" />
            )}
            {createDataField(
              "Country",
              user.country || "Not specified",
              <FaFlagUsa className="text-blue-500" />
            )}
            {createDataField(
              "City",
              user.city || "Not specified",
              <FaCity className="text-yellow-500" />
            )}
            {createDataField(
              "State / Province",
              user.state || "No state/province available",
              <FaMapMarkedAlt className="text-purple-500" />
            )}
            <button
              onClick={handleUpdateClick}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
            >
              Edit Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function createDataField(label, value, icon) {
  return (
    <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-gray-200">
      <dt className="text-sm font-medium text-gray-900 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </dt>
      <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
        {value}
      </dd>
    </div>
  );
}
