import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Adjust according to your token key

  if (!isAuthenticated) {
    // Optionally use react-toastify to notify the user
    toast.warn("You must log in first!");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
