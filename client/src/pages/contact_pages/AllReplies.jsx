// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// // const AllReplies = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 6;

// //   useEffect(() => {
// //     const fetchMessages = async () => {
// //       try {
// //         const token = localStorage.getItem("adminToken"); // Ensure you're using the correct key to retrieve the token
// //         const response = await axios.get("http://localhost:5000/all-messages", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setMessages(response.data);
// //       } catch (error) {
// //         console.error("Failed to fetch messages:", error);
// //       }
// //     };

// //     fetchMessages();
// //   }, []);

// //   // Pagination Logic
// //   const totalPages = Math.ceil(messages.length / itemsPerPage);
// //   const currentMessages = messages.slice(
// //     (currentPage - 1) * itemsPerPage,
// //     currentPage * itemsPerPage
// //   );

// //   const goToNextPage = () => {
// //     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
// //   };

// //   const goToPreviousPage = () => {
// //     setCurrentPage((prev) => Math.max(prev - 1, 1));
// //   };

// //   return (
// //     <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
// //       {currentMessages.map((message, index) => (
// //         <div key={index} className="p-4 border rounded-lg mb-2">
// //           <p>
// //             <strong>Message: {message.message_text}</strong>
// //             <strong>Sender:</strong> {message.firstName} {message.lastName}
// //           </p>
// //           <p>
// //             <strong>Email:</strong> {message.email}
// //           </p>
// //           <p></p>
// //           <p>
// //             <strong>Submitted:</strong>{" "}
// //             {new Date(message.createdAt).toLocaleString()}
// //           </p>
// //           {message.replies.length > 0 && (
// //             <>
// //               <h4>Replies:</h4>
// //               {message.replies.map((reply, idx) => (
// //                 <div key={idx} className="ml-4">
// //                   <p>
// //                     <strong>Name:</strong> {reply.name}
// //                   </p>
// //                   <p>
// //                     <strong>Reply:</strong> {reply.message}
// //                   </p>
// //                   <p>
// //                     <strong>Time:</strong>{" "}
// //                     {new Date(reply.timestamp).toLocaleString()}
// //                   </p>
// //                 </div>
// //               ))}
// //             </>
// //           )}
// //         </div>
// //       ))}

// //       <div className="flex justify-between">
// //         <button
// //           onClick={goToPreviousPage}
// //           disabled={currentPage === 1}
// //           className="px-3 py-1 border rounded"
// //         >
// //           <FaArrowLeft /> Previous
// //         </button>
// //         <span>
// //           Page {currentPage} of {totalPages}
// //         </span>
// //         <button
// //           onClick={goToNextPage}
// //           disabled={currentPage === totalPages}
// //           className="px-3 py-1 border rounded"
// //         >
// //           Next <FaArrowRight />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AllReplies;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaSearch,
//   FaArrowLeft,
//   FaArrowRight,
//   FaThList,
//   FaThLarge,
//   FaTh,
// } from "react-icons/fa";

// const AllReplies = () => {
//   const [messages, setMessages] = useState([]);
//   const [view, setView] = useState("list"); // 'list', 'grid', 'card'
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       const response = await axios.get("http://localhost:5000/all-messages", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessages(
//         response.data.map((msg) => ({
//           ...msg,
//           replies: msg.replies.sort(
//             (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//           ),
//         }))
//       );
//     } catch (error) {
//       console.error("Failed to fetch messages:", error);
//     }
//   };

//   const handleSearch = (event) => {
//     const value = event.target.value.toLowerCase();
//     setSearchTerm(value);
//     if (!value.trim()) {
//       fetchMessages();
//       return;
//     }
//     setMessages(
//       messages.filter(
//         (message) =>
//           message.message_text.toLowerCase().includes(value) ||
//           message.firstName.toLowerCase().includes(value) ||
//           message.lastName.toLowerCase().includes(value) ||
//           message.replies.some((reply) =>
//             reply.message.toLowerCase().includes(value)
//           )
//       )
//     );
//   };

//   const totalPages = Math.ceil(messages.length / itemsPerPage);
//   const currentMessages = messages.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const goToNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   const goToPreviousPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const renderMessages = () => {
//     return currentMessages.map((message, index) => (
//       <div
//         key={index}
//         className={`p-4 border rounded-lg mb-2 ${
//           view === "card" ? "shadow-md" : ""
//         }`}
//       >
//         <div className="flex justify-between items-center">
//           <h3 className="font-bold">Message: {message.message_text}</h3>
//           <span>
//             <strong>From : </strong>
//             {message.firstName} {message.lastName} ({message.email})
//           </span>
//         </div>
//         <p>Submitted: {new Date(message.createdAt).toLocaleString()}</p>
//         {message.replies.length > 0 && (
//           <>
//             <h4>Replies:</h4>
//             {message.replies.map((reply, idx) => (
//               <div key={idx} className="ml-4">
//                 <p>
//                   <strong>Name :</strong> {reply.name}
//                 </p>
//                 <p>
//                   <strong>Reply :</strong> {reply.message}
//                 </p>
//                 <p>
//                   <strong>Time :</strong>{" "}
//                   {new Date(reply.timestamp).toLocaleString()}
//                 </p>
//               </div>
//             ))}
//           </>
//         )}
//       </div>
//     ));
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//       <div className="flex justify-between items-center mb-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearch}
//           className="flex-grow rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//         />
//         <div className="flex ml-4 space-x-2">
//           <FaThList
//             className="cursor-pointer text-xl"
//             onClick={() => setView("list")}
//           />
//           <FaThLarge
//             className="cursor-pointer text-xl"
//             onClick={() => setView("grid")}
//           />
//           <FaTh
//             className="cursor-pointer text-xl"
//             onClick={() => setView("card")}
//           />
//         </div>
//       </div>

//       {view === "list" && <div>{renderMessages()}</div>}
//       {view === "grid" && (
//         <div className="grid grid-cols-2 gap-4">{renderMessages()}</div>
//       )}
//       {view === "card" && (
//         <div className="grid grid-cols-3 gap-4">{renderMessages()}</div>
//       )}

//       <div className="flex justify-between items-center mt-8">
//         <button
//           onClick={goToPreviousPage}
//           disabled={currentPage === 1}
//           className="px-3 py-1 border rounded"
//         >
//           <FaArrowLeft /> Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={goToNextPage}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 border rounded"
//         >
//           Next <FaArrowRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllReplies;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaThList,
  FaThLarge,
  FaTh,
} from "react-icons/fa";

const AllReplies = () => {
  const [messages, setMessages] = useState([]);
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:5000/all-messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(
        response.data.map((msg) => ({
          ...msg,
          replies: msg.replies.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          ),
        }))
      );
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value.trim()) {
      fetchMessages();
      return;
    }
    setMessages(
      messages.filter(
        (message) =>
          message.message_text.toLowerCase().includes(value) ||
          message.firstName.toLowerCase().includes(value) ||
          message.lastName.toLowerCase().includes(value) ||
          message.replies.some((reply) =>
            reply.message.toLowerCase().includes(value)
          )
      )
    );
  };

  const totalPages = Math.ceil(messages.length / itemsPerPage);
  const currentMessages = messages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const renderMessages = () => {
    return currentMessages.map((message, index) => (
      <div
        key={index}
        className={`p-4 border rounded-lg mb-2 ${
          view === "card" ? "shadow-md" : ""
        }`}
      >
        <div className="bg-blue-100 p-3 rounded">
          <h3 className="font-bold text-blue-900">
            Message: {message.message_text}
          </h3>
          <p>
            <strong>Sender:</strong> {message.firstName} {message.lastName} (
            {message.email})
          </p>
          <p>
            <strong>Submitted:</strong>{" "}
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </div>
        {message.replies.length > 0 && (
          <>
            <h4 className="mt-3">Replies:</h4>
            {message.replies.map((reply, idx) => (
              <div key={idx} className="ml-4 bg-green-100 p-2 rounded">
                <p className="text-green-900">
                  <strong>Name:</strong> {reply.name}
                </p>
                <p className="text-green-900">
                  <strong>Reply:</strong> {reply.message}
                </p>
                <p className="text-green-900">
                  <strong>Time:</strong>{" "}
                  {new Date(reply.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <div className="flex ml-4 space-x-2">
          <FaThList
            className="cursor-pointer text-xl"
            onClick={() => setView("list")}
          />
          <FaThLarge
            className="cursor-pointer text-xl"
            onClick={() => setView("grid")}
          />
          <FaTh
            className="cursor-pointer text-xl"
            onClick={() => setView("card")}
          />
        </div>
      </div>

      {view === "list" && <div>{renderMessages()}</div>}
      {view === "grid" && (
        <div className="grid grid-cols-2 gap-4">{renderMessages()}</div>
      )}
      {view === "card" && (
        <div className="grid grid-cols-3 gap-4">{renderMessages()}</div>
      )}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded"
        >
          <FaArrowLeft /> Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded"
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AllReplies;
