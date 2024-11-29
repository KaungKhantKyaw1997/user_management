import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center bg-white rounded-xl shadow-lg p-10 max-w-lg w-full">
        <h1 className="text-6xl font-extrabold text-indigo-600 mb-6">404</h1>
        <h2 className="text-3xl font-medium text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
