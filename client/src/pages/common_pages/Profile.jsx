import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaHome,
  FaCity,
  FaMapMarkedAlt,
  FaFlagUsa,
} from "react-icons/fa";

export default function Profile() {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div
        className="w-full h-60 lg:h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://via.placeholder.com/1200x400.png?text=Cover+Image')",
        }}
      >
        <div className="absolute bottom-4 right-4">
          <button
            type="button"
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Change Cover Photo
          </button>
        </div>
      </div>

      {/* Profile Image */}
      <div className="relative -mt-16 flex justify-center lg:justify-start lg:ml-8">
        <img
          src="https://via.placeholder.com/150.png?text=User+Image"
          alt="User Image"
          className="w-32 h-32 object-cover rounded-full border-4 border-white"
        />
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <div className="space-y-6">
          {/* Name and About Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Jane Smith</h2>
            <p className="text-sm leading-6 text-gray-600">
              Jane Smith is a passionate traveler and blogger, sharing her
              experiences and travel tips with the world.
            </p>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
            <div className="text-sm">
              <div className="flex items-center text-gray-900">
                <FaUserCircle className="text-purple-500 mr-2" />
                First Name
              </div>
              <div className="mt-1 text-gray-700">Jane</div>
            </div>

            <div className="text-sm">
              <div className="flex items-center text-gray-900">
                <FaUserCircle className="text-purple-500 mr-2" />
                Last Name
              </div>
              <div className="mt-1 text-gray-700">Smith</div>
            </div>

            <div className="text-sm">
              <div className="flex items-center text-gray-900">
                <FaEnvelope className="text-red-500 mr-2" />
                Email Address
              </div>
              <div className="mt-1 text-gray-700">jane.smith@example.com</div>
            </div>

            <div className="text-sm">
              <div className="flex items-center text-gray-900">
                <FaFlagUsa className="text-blue-500 mr-2" />
                Country
              </div>
              <div className="mt-1 text-gray-700">United States</div>
            </div>

            <div className="text-sm">
              <div className="flex items-center text-gray-900">
                <FaHome className="text-orange-500 mr-2" />
                Street Address
              </div>
              <div className="mt-1 text-gray-700">123 Main Street</div>
            </div>

            <div className="text-sm">
              <div className="flex items-center text-gray-900">
                <FaCity className="text-teal-500 mr-2" />
                City
              </div>
              <div className="mt-1 text-gray-700">Los Angeles</div>
            </div>

            <div className="text-sm">
              <div className="flex items-center text-gray-900">
                <FaMapMarkedAlt className="text-yellow-500 mr-2" />
                State / Province
              </div>
              <div className="mt-1 text-gray-700">California</div>
            </div>

            <div className="text-sm">
              <div className="flex items-center text-gray-900">
                <FaMapMarkedAlt className="text-yellow-500 mr-2" />
                ZIP / Postal Code
              </div>
              <div className="mt-1 text-gray-700">90001</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
