import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

// ErrorMessage component to display error messages
export default function ErrorMessage({ message }) {
  return (
    <div className="w-48 h-20 z-50 fixed top-20 right-10 bg-[#ffffff2b] border-4 border-red-600 flex items-center">
      {/* Icon indicating an error */}
      <FaExclamationTriangle size="35px" className="ml-3 text-red-600" />
      {/* Display the error message */}
      <p className="ml-5 text-white">{message}</p>
    </div>
  );
}
