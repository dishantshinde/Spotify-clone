import React from "react";
import { Navigate } from "react-router-dom"; // Import Navigate for redirection
import { useUserAuth } from "../context/UserAuthContext"; // Import custom hook for authentication context

const ProtectedRoute = ({ children }) => {
  let { user } = useUserAuth(); // Retrieve user from authentication context
  if (!user) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }
  return (
    // If user is authenticated, render the children components
    children
  );
};

export default ProtectedRoute;
