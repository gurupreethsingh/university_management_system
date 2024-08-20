import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaEnvelope,
  FaUser,
  FaClock,
  FaReply,
  FaCommentDots,
  FaUserCircle,
} from "react-icons/fa";

const initialMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Inquiry about services",
    message: "Can you tell me more about your services?",
    timestamp: "2024-08-25 10:00 AM",
    replies: [],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Feedback on website",
    message: "Your website is fantastic!",
    timestamp: "2024-08-24 09:30 AM",
    replies: [],
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    subject: "Job Opportunity",
    message: "I would like to apply for the job posted.",
    timestamp: "2024-08-23 08:45 AM",
    replies: [],
  },
  // Add more messages as needed
];

export default function ReplyMessage() {
  const { id } = useParams();
  const messageId = parseInt(id, 10);
  const message = initialMessages.find((msg) => msg.id === messageId);

  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState(message.replies);

  const handleReply = () => {
    if (reply.trim() !== "") {
      const newReply = {
        name: "Your Name", // Replace with your actual name
        timestamp: new Date().toLocaleString(),
        message: reply,
      };
      setReplies([...replies, newReply]);
      setReply("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="border-b pb-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <FaEnvelope className="mr-2 text-indigo-600" />
          {message.subject}
        </h2>
        <div className="flex items-center mb-2">
          <FaUser className="mr-2 text-blue-500" />
          <span className="text-sm text-gray-700">
            {message.name} ({message.email})
          </span>
        </div>
        <div className="flex items-center mb-4">
          <FaClock className="mr-2 text-green-500" />
          <span className="text-sm text-gray-500">{message.timestamp}</span>
        </div>
        <p className="text-gray-800 mb-6">
          <FaCommentDots className="mr-2 text-teal-500" />
          {message.message}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          <FaReply className="mr-2 text-indigo-600" />
          Replies
        </h3>
        {replies.length === 0 ? (
          <p className="text-gray-600">No replies yet.</p>
        ) : (
          replies.map((reply, index) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <div className="flex items-center mb-2">
                <FaUserCircle className="mr-2 text-indigo-600" />
                <span className="font-semibold text-gray-700">
                  {reply.name}
                </span>
                <span className="ml-4 text-sm text-gray-500">
                  <FaClock className="mr-1 text-green-500" />
                  {reply.timestamp}
                </span>
              </div>
              <p className="text-gray-700 ml-6 pl-1 border-l-2 border-indigo-600">
                {reply.message}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          <FaCommentDots className="mr-2 text-indigo-600" />
          Your Reply
        </h3>
        <textarea
          className="w-full h-24 p-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your reply here..."
        />
        <button
          onClick={handleReply}
          className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <FaReply className="mr-2" />
          Send Reply
        </button>
      </div>
    </div>
  );
}
