import React from "react";
import { Navigate } from "react-router-dom";

// This component checks if token exists. If not, redirects to login.
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Replace with your logic

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
