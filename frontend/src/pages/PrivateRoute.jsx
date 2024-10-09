import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Your auth context

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth(); // Get the auth status from context

  // If the user is not authenticated, redirect to SignIn
  return isAuthenticated ? <Outlet /> : <Navigate to="/SignIn" />;
};

export default PrivateRoute;
