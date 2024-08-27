// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   FaUserCircle,
//   FaEnvelope,
//   FaFlagUsa,
//   FaHome,
//   FaCity,
//   FaMapMarkedAlt,
//   FaPhone,
//   FaBuilding,
// } from "react-icons/fa";

// export default function AdminProfileUpdate() {
//   const [formData, setFormData] = useState({});
//   const [avatar, setAvatar] = useState("");
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/admin-profile/${id}`
//         );
//         setFormData(response.data);
//         setAvatar(
//           response.data.adminAvatar ||
//             "https://via.placeholder.com/150.png?text=User+Image"
//         );
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (id) {
//       fetchUserData();
//     }
//   }, [id]);

//   const handleChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setAvatar(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const updatedData = {
//         ...formData,
//         adminAvatar: avatar,
//       };
//       await axios.put(
//         `http://localhost:5000/admin-profile-update/${id}`,
//         updatedData
//       );
//       alert("Admin details updated successfully.");
//       navigate(`/admin-profile/${id}`);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
//           <div className="flex-none w-full md:w-48 lg:w-60">
//             <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 rounded-lg overflow-hidden">
//               <img
//                 src={avatar}
//                 alt="User Avatar"
//                 className="object-cover w-full h-full"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//                 id="avatarImage"
//               />
//               <label
//                 htmlFor="avatarImage"
//                 className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-white p-2 shadow-md"
//               >
//                 <FaUserCircle className="text-gray-700" size={24} />
//               </label>
//             </div>
//           </div>
//           <div className="flex-grow">
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Update Profile
//               </h2>
//               {createInputField(
//                 "Full Name",
//                 "name",
//                 formData.name,
//                 handleChange,
//                 <FaUserCircle className="text-indigo-500" />
//               )}
//               {createInputField(
//                 "Email Address",
//                 "email",
//                 formData.email,
//                 handleChange,
//                 <FaEnvelope className="text-red-500" />
//               )}
//               {createInputField(
//                 "Role",
//                 "role",
//                 formData.role,
//                 handleChange,
//                 <FaBuilding className="text-green-500" />
//               )}
//               {createInputField(
//                 "Country",
//                 "country",
//                 formData.country,
//                 handleChange,
//                 <FaFlagUsa className="text-blue-500" />
//               )}
//               {createInputField(
//                 "City",
//                 "city",
//                 formData.city,
//                 handleChange,
//                 <FaCity className="text-yellow-500" />
//               )}
//               {createInputField(
//                 "State / Province",
//                 "state",
//                 formData.state,
//                 handleChange,
//                 <FaMapMarkedAlt className="text-purple-500" />
//               )}
//               {createInputField(
//                 "Phone",
//                 "phone",
//                 formData.phone,
//                 handleChange,
//                 <FaPhone className="text-orange-500" />
//               )}
//               <button
//                 type="submit"
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// function createInputField(label, field, value, onChange, icon) {
//   return (
//     <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
//       <dt className="text-sm font-medium text-gray-900 flex items-center">
//         {icon}
//         <span className="ml-2">{label}</span>
//       </dt>
//       <dd className="mt-1 sm:mt-0 sm:col-span-2">
//         <input
//           type="text"
//           value={value || ""}
//           onChange={(e) => onChange(field, e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </dd>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaFlagUsa,
  FaHome,
  FaCity,
  FaMapMarkedAlt,
  FaPhone,
  FaBuilding,
} from "react-icons/fa";

export default function AdminProfileUpdate() {
  const [formData, setFormData] = useState({});
  const [avatar, setAvatar] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/admin-profile/${id}`
        );
        setFormData(response.data);
        setAvatar(
          response.data.adminAvatar ||
            "https://via.placeholder.com/150.png?text=User+Image"
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updateData = new FormData();
    Object.keys(formData).forEach((key) => {
      updateData.append(key, formData[key]);
    });
    const fileInput = document.getElementById("avatarImage");
    if (fileInput.files[0]) {
      updateData.append("adminAvatar", fileInput.files[0]);
    }

    try {
      await axios.put(
        `http://localhost:5000/admin-profile-update/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Admin details updated successfully.");
      navigate(`/admin-profile/${id}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex-none w-full md:w-48 lg:w-60">
            <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 rounded-lg overflow-hidden">
              <img
                src={
                  avatar ||
                  "https://via.placeholder.com/150.png?text=User+Image"
                }
                alt="User Avatar"
                className="object-cover w-full h-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="avatarImage"
              />
              <label
                htmlFor="avatarImage"
                className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-white p-2 shadow-md"
              >
                <FaUserCircle className="text-gray-700" size={24} />
              </label>
            </div>
          </div>
          <div className="flex-grow">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Update Profile
              </h2>
              {createInputField(
                "Full Name",
                "name",
                formData.name,
                handleChange,
                <FaUserCircle className="text-indigo-500" />
              )}
              {createInputField(
                "Email Address",
                "email",
                formData.email,
                handleChange,
                <FaEnvelope className="text-red-500" />
              )}
              {createInputField(
                "Role",
                "role",
                formData.role,
                handleChange,
                <FaBuilding className="text-green-500" />
              )}
              {createInputField(
                "Country",
                "country",
                formData.country,
                handleChange,
                <FaFlagUsa className="text-blue-500" />
              )}
              {createInputField(
                "City",
                "city",
                formData.city,
                handleChange,
                <FaCity className="text-yellow-500" />
              )}
              {createInputField(
                "State / Province",
                "state",
                formData.state,
                handleChange,
                <FaMapMarkedAlt className="text-purple-500" />
              )}
              {createInputField(
                "Phone",
                "phone",
                formData.phone,
                handleChange,
                <FaPhone className="text-orange-500" />
              )}
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function createInputField(label, field, value, onChange, icon) {
  return (
    <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-900 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </dt>
      <dd className="mt-1 sm:mt-0 sm:col-span-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(field, e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </dd>
    </div>
  );
}
