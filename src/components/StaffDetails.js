import React from "react";
import closeIcon from "../assets/icons/close.svg";

const StaffDetails = ({ isOpen, staff, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-8 relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <img src={closeIcon} alt="Close" className="w-6 h-6" />
          </button>
        </div>
        {staff ? (
          <div>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                {staff.name[0]}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {staff.name}
                </h3>
                <p className="text-sm text-indigo-600">{staff.position}</p>
              </div>
            </div>
            <hr className="my-6 border-gray-200" />
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Age:</strong>
                <span>{staff.age}</span>
              </li>
              <li className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Gender:</strong>
                <span>{staff.gender}</span>
              </li>
              <li className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Status:</strong>
                <span>{staff.status}</span>
              </li>
              <li className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Joined:</strong>
                <span>
                  {new Date(staff.joinedDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </li>
            </ul>
            <div className="mt-6 space-y-2">
              <p className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Email:</strong>
                <span>{staff.email}</span>
              </p>
              <p className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Mobile:</strong>{" "}
                <span>{staff.mobile}</span>
              </p>
            </div>
            <hr className="my-6 border-gray-200" />
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Role:</strong>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  {staff.role}
                </span>
              </div>
              <div>
                <strong className="text-gray-500">Permissions:</strong>
                <div className="mt-2 flex flex-wrap gap-2">
                  {staff.permissions.length > 0 ? (
                    staff.permissions.map((perm, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700 shadow-sm hover:shadow-lg transition-shadow duration-300"
                      >
                        {perm}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No permissions assigned.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading staff details...</p>
        )}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
